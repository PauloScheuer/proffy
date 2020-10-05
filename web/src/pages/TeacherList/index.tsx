import React, { useState, ChangeEvent, FormEvent } from 'react';

import './styles.css';
import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';
interface TeacherItem {
  avatarUser: string;
  bioUser: string;
  idUser: number;
  nameUser: string;
  subjectClass: string;
  costClass: string;
  zapUser: string;
}
export default function TeacherList() {
  const [subject, setSubject] = useState<string>('');
  const [weekDay, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const [allClasses, setAllClasses] = useState<TeacherItem[]>([]);

  const searchTeachers = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const res = await api.get(
        `classes?weekDay=${weekDay}&subject=${subject}&time=${time}`
      );
      console.log(res.data);
      setAllClasses(res.data);
    } catch (err) {
      alert('Erro na busca');
    }
  };
  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Esses são os proffys disponíveis">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            label="Matéria"
            name="subject"
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Ciências', label: 'Ciências' },
              { value: 'Educação Física', label: 'Educação Física' },
              { value: 'Português', label: 'Português' },
            ]}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              setSubject(event.target.value);
            }}
          />
          <Select
            label="Dia da semana"
            name="weekDay"
            options={[
              { value: '1', label: 'Domingo' },
              { value: '2', label: 'Segunda' },
              { value: '3', label: 'Terça' },
              { value: '4', label: 'Quarta' },
              { value: '5', label: 'Quinta' },
              { value: '6', label: 'Sexta' },
              { value: '7', label: 'Sábado' },
            ]}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              setWeekDay(event.target.value);
            }}
          />
          <Input
            type="time"
            label="Hora"
            name="time"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setTime(event.target.value);
            }}
          />
          <button type="submit">Buscar</button>
        </form>
      </PageHeader>
      <main>
        {allClasses.map((classe, index) => {
          const {
            zapUser,
            costClass,
            bioUser,
            idUser,
            nameUser,
            avatarUser,
            subjectClass,
          } = classe;
          return (
            <TeacherItem
              name={nameUser}
              id={idUser}
              avatar={avatarUser}
              subject={subjectClass}
              bio={bioUser}
              cost={costClass}
              whatsapp={zapUser}
              key={index}
            />
          );
        })}
      </main>
    </div>
  );
}
