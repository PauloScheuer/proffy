import { Request, Response } from 'express';
import db from '../database/connections';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
  weekDay: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async index(req: Request, res: Response) {
    const filters = req.query;

    if (!filters.weekDay || !filters.subject || !filters.time) {
      res.status(400).send();
    }
    const weekDay = String(filters.weekDay);
    const subject = String(filters.subject);
    const time = String(filters.time);

    const timeInMinutes = convertHourToMinutes(time);

    const classes = await db('classes')
      .whereExists(function () {
        this.select('*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`idClass` = `classes`.`idClass`')
          .whereRaw('`class_schedule`.`weekDayClassSchedule` = ??', [
            Number(weekDay),
          ])
          .whereRaw('`class_schedule`.`fromClassSchedule` <= ??', [
            Number(timeInMinutes),
          ])
          .whereRaw('`class_schedule`.`toClassSchedule` > ??', [
            Number(timeInMinutes),
          ]);
      })
      .where('classes.subjectClass', '=', subject)
      .join('users', 'classes.idUser', '=', 'users.idUser')
      .select('*');

    res.status(200).json(classes);
  }
  async create(req: Request, res: Response) {
    const { name, avatar, bio, whatsapp, subject, cost, schedule } = req.body;

    const trx = await db.transaction();
    try {
      const idUser = await trx('users').insert({
        nameUser: name,
        avatarUser: avatar,
        zapUser: whatsapp,
        bioUser: bio,
      });

      const idClass = await trx('classes').insert({
        subjectClass: subject,
        costClass: cost,
        idUser: idUser[0],
      });

      const classSchedule = schedule.map((item: ScheduleItem) => {
        return {
          idClass: idClass[0],
          weekDayClassSchedule: item.weekDay,
          fromClassSchedule: convertHourToMinutes(item.from),
          toClassSchedule: convertHourToMinutes(item.to),
        };
      });

      await trx('class_schedule').insert(classSchedule);
      await trx.commit();
      res.status(201).send();
    } catch (err) {
      await trx.rollback();
      res.status(400).send({ message: err });
    }
  }
}
