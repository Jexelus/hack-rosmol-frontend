import * as React from 'react';
import { Image, Flex, Group, Headline, Cell, Avatar, Div } from '@vkontakte/vkui';

type ProjectCardProps = {
  name: string | null;
  description: string | null;
  logo: string | null;
};

import s from './MiniProjectCard.module.scss';

const MiniProjectCard: React.FC<ProjectCardProps> = ({ name, description, logo }) => {
  // console.log("TRIGGERED MINI PROJECT CARD {}", name)
  return (
    <Div className={s.miniProjectCard}>
      <Group className={s.groupMiniProj}>
        <Cell className={s.groupMiniProjCell} before={<Avatar src={logo ?? undefined}  size={48} />} subtitle={description}>
          <p style={{padding: 0}}>{name}</p>
        </Cell>
      </Group>
    </Div>
  )
};

export default MiniProjectCard;