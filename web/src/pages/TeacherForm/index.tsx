import React, { useState, ChangeEvent, FormEvent } from 'react';

import './styles.css';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';
import TextArea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

interface ScheduleItem {
  weekDay: string;
  from: string;
  to: string;
}

export default function TeacherForm() {
  const history = useHistory();
  const [name, setName] = useState<string>();
  const [bio, setBio] = useState<string>();
  const [avatar, setAvatar] = useState<string>();
  const [whatsapp, setWhatsapp] = useState<string>();

  const [subject, setSubject] = useState<string>();
  const [cost, setCost] = useState<string>();

  const initialValues = {
    weekDay: '1',
    from: '',
    to: '',
  };
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    initialValues,
  ]);

  const addNewScheduleItem = () => {
    const preScheduleItems = [...scheduleItems];
    preScheduleItems.push(initialValues);
    setScheduleItems(preScheduleItems);
  };

  const handleCreateClass = async (event: FormEvent) => {
    event.preventDefault();
    console.log([name, avatar, bio, whatsapp, subject, cost]);
    console.log(scheduleItems);

    try {
      await api.post('classes', {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems,
      });
      alert('Cadastro realizado');
      history.push('/');
    } catch (err) {
      alert('Erro no cadastro');
    }
  };

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que bom que você quer dar aulas!"
        description="O primeiro passo é preencher o formulário de inscrição"
      />
      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              label="Nome completo"
              name="name"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setName(event.target.value);
              }}
            />
            <Input
              label="Avatar"
              name="avatar"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setAvatar(event.target.value);
              }}
            />
            <Input
              label="Whatsapp"
              name="whatsapp"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setWhatsapp(event.target.value);
              }}
            />
            <TextArea
              label="Bio"
              name="bio"
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                setBio(event.target.value);
              }}
            />
          </fieldset>
          <fieldset>
            <legend>Sobre a aula</legend>
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
            <Input
              label="Custo da aula"
              name="cost"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setCost(event.target.value);
              }}
            />
          </fieldset>
          <fieldset>
            <legend>
              Horários disponíveis{' '}
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>
            {scheduleItems.map((item, index) => {
              return (
                <div className="schedule-item" key={index}>
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
                      const copyScheduleItems = [...scheduleItems];
                      copyScheduleItems[index] = {
                        ...copyScheduleItems[index],
                        weekDay: event.target.value,
                      };
                      setScheduleItems(copyScheduleItems);
                    }}
                  />
                  <Input
                    name="from"
                    label="Das"
                    type="time"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      const copyScheduleItems = [...scheduleItems];
                      copyScheduleItems[index] = {
                        ...copyScheduleItems[index],
                        from: event.target.value,
                      };
                      setScheduleItems(copyScheduleItems);
                    }}
                  />
                  <Input
                    name="to"
                    label="Às"
                    type="time"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      const copyScheduleItems = [...scheduleItems];
                      copyScheduleItems[index] = {
                        ...copyScheduleItems[index],
                        to: event.target.value,
                      };
                      setScheduleItems(copyScheduleItems);
                    }}
                  />
                </div>
              );
            })}
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante <br />
              Preencha todos os dados!
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}
