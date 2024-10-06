import * as React from 'react';
import { Panel, Group, Cell, Avatar, NavIdProps, Div, Flex } from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';

import { useRootStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import ProjectCard from '@/components/ProjectCard';

import s from './Home.module.scss';

export interface HomeProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

const Home: React.FC<HomeProps> = observer(({ id, fetchedUser }) => {
  const { projectsStore } = useRootStore();

  const { photo_200, city, first_name, last_name } = { ...fetchedUser };

  React.useEffect(() => {
    projectsStore.fetchProjects();
  }, [projectsStore]);

  return (
    <Panel id={id}>
      <Div>
        <Flex gap="l" className={s.projects}>
          {projectsStore.projects.map((project) => (
            <ProjectCard key={project.id} name={project.name} description={project.description} logo={project.logo} />
          ))}
        </Flex>

        <Flex direction="column">
          {fetchedUser && (
            <Group style={{ maxWidth: 350 }}>
              <Cell before={photo_200 && <Avatar src={photo_200} />} subtitle={city?.title}>
                {`${first_name} ${last_name}`}
              </Cell>
            </Group>
          )}
        </Flex>
      </Div>
    </Panel>
  );
});

export default Home;
