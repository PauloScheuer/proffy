import { Request, Response } from 'express';
import db from '../database/connections';

export default class ConnectionsController {
  async index(req: Request, res: Response) {
    const totalConnections = await db('connections').count('* as total');

    const { total } = totalConnections[0];
    res.json(total);

    res.status(200).json({});
  }
  async create(req: Request, res: Response) {
    const { idUser } = req.body;

    try {
      await db('connections').insert({
        idUser,
      });

      res.status(201).send();
    } catch (err) {
      res.status(400).send({ message: err });
    }
  }
}
