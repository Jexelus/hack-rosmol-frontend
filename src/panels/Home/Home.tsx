import * as React from 'react';
import { Panel, Group, Cell, Avatar, NavIdProps, Div, Flex, Headline, Button, Image, Input } from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';


import { useRootStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import ProjectCard from '@/components/ProjectCard';
import MiniProjectCard from '@/components/MiniProjectCard';

import s from './Home.module.scss';
import { useEffect, useState } from 'react';
import { apiUrls } from '@/api';

export interface HomeProps extends NavIdProps {
  fetchedUser?: UserInfo;
  onModalChange: (newModal: string | null) => void;
  onProjectSelect: (projectId: number | null) => void;
}

const Home: React.FC<HomeProps> = observer(({ id, fetchedUser , onModalChange, onProjectSelect }) => {
  const { projectsStore } = useRootStore();
  const { photo_200, city, first_name, last_name } = { ...fetchedUser };

  React.useEffect(() => {
    projectsStore.fetchProjects();
  }, [projectsStore]);
  const [categories, setCategories] = useState(null);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleButtonClick = () => {
    onModalChange('warning');
  };

  const handleProjectClick = (id: number) => onProjectSelect(id); // TODO: get project info

  useEffect(() => {
    fetch(apiUrls.categories)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // console.log(data[0])
        setCategories(data);
        setCategoriesLoading(false);
      })
      .catch(error => {
        setError(error);
        setCategoriesLoading(false);
      });
  }, []);

  if (categoriesLoading) {
    return <p>Loading...</p>;
  }

  if (categoriesError) {
    return <p>Error: {categoriesError.message}</p>;
  }

  const filteredCategories = categories ? categories.filter(category =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  // console.log(categories)
  return (
  <Panel id={id}>
    <Div className={s.root}>
      <Div className={s.splitlayout}>
        <Div className={s.maincontainer}>
          <Div className={s.bannercontainer}>
            <img src={"/images/ban.png"} width={600} height={130}/>
          </Div>
        <Div className={s.projectsContainer}>
          <Flex gap="l" direction="row" className={s.rootrow}>
            {projectsStore.projects.map((project) => (
              <ProjectCard key={project.id}
                           name={project.name}
                           description={project.description}
                           logo={project.logo}
                           author_id={project.authorId}
                           onModalChange={onModalChange}
                           onProjectSelect={handleProjectClick}
                           pr_id={project.id}
              />
              ))}
          </Flex>
        </Div>
        </Div>
        <Div className={s.menucontainer}>
          <Div className={s.profile}>
            {fetchedUser && (
            <Group style={{ maxWidth: 280 }}>
              <Cell before={photo_200 && <Avatar src={photo_200} />} subtitle={city?.title}>
                {`${first_name} ${last_name}`}
              </Cell>
            </Group>
          )}
          </Div>
          <Group className={s.MenuProjectsGroup}>
            <p>Мои проекты</p>
              <Div className={s.menuProjectList}>
                {projectsStore.projects
                  .filter((project) => project.authorId == fetchedUser?.id) // Фильтруем проекты по author_id
                  .map((project) => (
                    <MiniProjectCard
                      key={project.id}
                      name={project.name}
                      description={project.description}
                      logo={project.logo}
                    />
                  ))}
              </Div>
              <Div className={s.newProjectButton}>
                <Button mode="secondary" size="l" style={{backgroundColor: '#0077FF'}}
                onClick={handleButtonClick}
                >Новый проект</Button>
              </Div>
          </Group>
          <Group className={s.categoriesMenu}>
            <Div className={s.searchContainer}>
              <Input
                type="text"
                placeholder="Поиск"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Div>
            <Div className={s.categoriesList}>
              {filteredCategories.map((category, index) => (
                <Div className={s.categoriesListItem} key={index} onClick={handleButtonClick}>
                  {category}
                </Div>
              ))}
            </Div>
          </Group>
        </Div>
      </Div>
    </Div>
  </Panel>
  );
});

export default Home;
