import * as React from 'react';
import { Image, Flex, Group, Headline, Cell, Avatar} from '@vkontakte/vkui';

type ProjectCardProps = {
  name: string | null;
  description: string | null;
  logo: string | null;
};

const MiniProjectCard: React.FC<ProjectCardProps> = ({ name, description, logo }) => {
  console.log("TRIGGERED MINI PROJECT CARD {}", name)
  return (
    <Group style={{ width: 200 , height: 120 }}>
      <Flex margin="auto" direction="column" gap="m">
        <Cell before={<Avatar src={logo ?? undefined}  size={48} />} subtitle="Описание">
          <p style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'wrap', height: 32}}>{name}</p>
        </Cell>
      </Flex>
    </Group>
  )
};

export default MiniProjectCard;