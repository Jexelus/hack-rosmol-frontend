import * as React from 'react';
import { Image, Flex, Group, Headline, Button, Div} from '@vkontakte/vkui';
import { apiUrls } from '@/api';
import { useEffect, useState } from 'react';

import s from './ProjectCard.module.scss';

type ProjectCardProps = {
  name: string | null;
  description: string | null;
  logo: string | null;
  author_id: number | null;
  onModalChange: (newModal: string | null) => void;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ name, description, logo, author_id , onModalChange}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleButtonClick = () => {
    onModalChange('warning');
  };

  useEffect(() => {
    if (!author_id) {
      setLoading(false);
      return;
    }

    fetch(apiUrls.user + author_id + "/")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // console.log(data[0])
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [author_id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  console.log(data)
  return (
    <Group className={s.card}>
      <Div className={s.body}>
        <img src={logo ?? undefined} width={160} height={160}/>
      </Div>
      <Div className={s.title}>
        <p>{name ?? 'Нет названия'}</p>
      </Div>
      <Div className={s.description}>
        <p>{description ?? 'Нет описания'}</p>
      </Div>
      <Div className={s.ButtonRow}>
        <Button mode="secondary" size="l" onClick={handleButtonClick}>
          Подробнее
        </Button>
      </Div>
    </Group>
  );
};

export default ProjectCard;