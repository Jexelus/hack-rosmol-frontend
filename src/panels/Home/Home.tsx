import * as React from 'react';
import { Panel, Group, Cell, Avatar, NavIdProps, Div, Flex, Headline, Button } from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';

import { useRootStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import ProjectCard from '@/components/ProjectCard';
import MiniProjectCard from '@/components/MiniProjectCard';

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
      {/*<Div className="container">*/}
      {/*  <Flex direction="row">*/}
      {/*    <Flex direction="column" >*/}
      {/*      {fetchedUser && (*/}
      {/*        <Group style={{ maxWidth: 300 }}>*/}
      {/*          <Cell before={photo_200 && <Avatar src={photo_200} />} subtitle={city?.title}>*/}
      {/*            {`${first_name} ${last_name}`}*/}
      {/*          </Cell>*/}
      {/*        </Group>*/}
      {/*      )}*/}
      {/*    </Flex>*/}
      {/*    <Flex gap="l"  className={s.projects}>*/}
      {/*      {projectsStore.projects.map((project) => (*/}
      {/*        <ProjectCard key={project.id} name={project.name} description={project.description} logo={project.logo} />*/}
      {/*      ))}*/}
      {/*    </Flex>*/}
      {/*  </Flex>*/}
      {/*</Div>*/}
      <Div className="root">
        <Flex direction="row" className={s.rootrow}>
          <Div className={s.gfp}>
            <Flex gap="l"  className={s.projects}>
                {projectsStore.projects.map((project) => (
                  <ProjectCard key={project.id} name={project.name} description={project.description} logo={project.logo} />
                ))}
            </Flex>
          </Div>

          <Div className="Grid-for-menu">
            <Flex gap="l" direction="column">
              <Div className={s.user_profile}>
                {fetchedUser && (
                  <Group style={{ maxWidth: 350 }}>
                    <Cell before={photo_200 && <Avatar src={photo_200} />} subtitle={city?.title}>
                      {`${first_name} ${last_name}`}
                    </Cell>
                  </Group>
                )}
              </Div>
              <Div className={s.menu}>
                <Group>
                  <Flex margin="auto" direction="column" gap="m">
                    <Flex.Item flex="shrink">
                      <Headline>Мои проекты</Headline>
                    </Flex.Item>
                    {projectsStore.projects.map((project) => (
                      <MiniProjectCard key={project.id} name={project.name} description={project.description} logo={project.logo} />
                    ))}
                    <Flex.Item flex="shrink" style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                      <Button mode="primary" size="l">Новый проект</Button>
                    </Flex.Item>
                  </Flex>
                </Group>
              </Div>
            </Flex>
          </Div>
        </Flex>

      </Div>
    </Panel>
  );
});

export default Home;
