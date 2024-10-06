import * as React from 'react';
import { Image, Flex, Group, Headline } from '@vkontakte/vkui';

type ProjectCardProps = {
  name: string | null;
  description: string | null;
  logo: string | null;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ name, description, logo }) => {
  console.log("LOGO!" ,logo)
  return (
    <Group style={{ width: 'fit-content', maxWidth: 240, minWidth: 240 }}>
      <Flex margin="auto" direction="column" gap="m">
        <div style={{ width: 220, height: 220 }}>
          <Image keepAspectRatio src={logo ?? undefined} widthSize="100%" />
        </div>
        <Flex.Item flex="shrink">
          <Headline>{name}</Headline>
        </Flex.Item>
        <Flex.Item flex="shrink">
          <Headline style={{ maxHeight: 40, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'wrap',}}>{description}</Headline>
        </Flex.Item>
      </Flex>
    </Group>
  );
};

export default ProjectCard;
