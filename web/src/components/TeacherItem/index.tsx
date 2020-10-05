import React from 'react';
import './styles.css';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

interface TeacherItem {
  avatar: string;
  bio: string;
  name: string;
  id: number;
  subject: string;
  cost: string;
  whatsapp: string;
}

export default function TeacherItem({
  avatar,
  name,
  bio,
  subject,
  cost,
  whatsapp,
  id,
}: TeacherItem) {
  const createConnection = () => {
    api.post('connections', { idUser: id });
  };
  return (
    <article className="teacher-item">
      <header>
        <img src={avatar} alt="Foto" />
        <div>
          <strong>{name}</strong>
          <span>{subject}</span>
        </div>
      </header>
      <p>{bio}</p>
      <footer>
        <p>
          Preço/hora
          <strong>{cost}</strong>
        </p>
        <a
          target="_blank"
          href={'https://wa.me/' + whatsapp}
          onClick={createConnection}
        >
          <button>
            <img src={whatsappIcon} alt="Entrar em contato" />
            Entrar em contato
          </button>
        </a>
      </footer>
    </article>
  );
}
