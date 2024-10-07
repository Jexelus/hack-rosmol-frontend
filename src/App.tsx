import { useState, useEffect, ReactNode } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import {
  View,
  SplitLayout,
  SplitCol,
  ScreenSpinner,
  ModalRoot,
  ModalCard,
  ModalPage,
  ModalPageHeader,
  useAdaptivityConditionalRender,
  useAdaptivityWithJSMediaQueries,
  usePlatform,
  PanelHeaderClose,
  PanelHeaderButton, Div, Button,
} from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
import { Icon24Dismiss, Icon56ServicesOutline } from '@vkontakte/icons';
import s from './App.module.scss';

import { DEFAULT_VIEW_PANELS } from './routes';
import Home from './panels/Home';
import { apiUrls } from '@/api';

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
  const [fetchedUser, setUser] = useState<UserInfo | undefined>();
  const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner size="large" />);
  const [projectId, setProjectId] = useState<number | null>(null);
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      bridge.send('VKWebAppResizeWindow', { width: 1200, height: 700 });
      
      setUser(user);
      // console.log(user);

      const buildPocket = async () => {
        const email = (await bridge.send('VKWebAppGetEmail')).email;
        const vk_id = user.id;
        const fio = user.first_name + " " + user.last_name;
        const competencies = [];

        return JSON.stringify({
          vk_id:  vk_id,
          email: email,
          fio: fio,
          competencies: competencies
        })
      }
      const pocket = await buildPocket();
      const resp = await fetch(apiUrls.userCreate, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: pocket,
      }).then((res) => res.json());

      // console.log(resp);

      setPopout(null);
    }
    fetchData();
  }, []);

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleModalChange = (newModal) => {
    setActiveModal(newModal);
  };

  const handleSelectProject = (project_id) => {
    setProjectId(project_id);
  };

  useEffect(() => {
    if (!projectId) {
      setLoading(false);
      return;
    }

    fetch(apiUrls.proj + projectId + "/")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // console.log(data[0])
        setProjectData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [projectId]);
  const { sizeX } = useAdaptivityConditionalRender();
  const { isDesktop } = useAdaptivityWithJSMediaQueries();
  const platform = usePlatform();

  const modal = () => {
    console.log("TRIGGER MODAL data->", projectData, projectId);
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };
    return (
      <ModalRoot activeModal={activeModal}>
        <ModalCard
          id="warning"
          onClose={() => handleModalChange(null)}
          header="Эта функция временно недоступна"
          subheader="Мы всё ещё работаем над приложением, пожалуйста, заходите позже"
          icon={<Icon56ServicesOutline />}
        />
        <ModalPage
          id="project"
          dynamicContentHeight
          onClose={() => handleModalChange(null)}
          // settlingHeight={100}
          header={
          <ModalPageHeader
            before={
              sizeX.compact &&
              platform === 'android' && (
                <PanelHeaderClose className={sizeX.compact.className} onClick={() => handleModalChange(null)} />
              )
            }
            after={
              platform === 'ios' && (
                <PanelHeaderButton onClick={() => handleModalChange(null)}>
                  <Icon24Dismiss />
                </PanelHeaderButton>
              )
            }
          >
            <Div className={s.headerTitle}>
              Проект: {projectData?.id}
            </Div>
          </ModalPageHeader>
        }>
          <Div className={s.projectModalContainer}>
            <Div className={s.projectModalImage}>
              <img src={projectData?.logo} width={300} height={300}/>
            </Div>
            <Div className={s.projectModalHeader}>
              <p>{projectData?.name}</p>
            </Div>
            <Div className={s.projectModalAuthor}>
              <Button mode="primary" size="l" onClick={() => window.open("https://vk.com/id" + projectData?.author_id, "_blank")}>Автор проекта</Button>
            </Div>
            <Div className={s.projectModalBody}>
              <Div className={s.projectModalField}>
                <p>Регион: {projectData?.region}</p>
              </Div>
              <Div className={s.projectModalField}>
                <p>Размер проекта: {projectData?.project_scale}</p>
              </Div>
              <Div className={s.projectModalField}>
                <p>Целевая аудитория: {projectData?.project_people_group_target}</p>
              </Div>
              <Div className={s.projectModalField}>
                <p>Статус проекта: {projectData?.project_state}</p>
              </Div>
              <p style={{fontWeight: 'bold', textAlign: 'center'}} className={s.projectModalLargeTextBlockTitle}>Описание</p>
              <Div className={s.projectModalLargeTextBlock}>
                <Div className={`text-container ${isExpanded ? 'expanded' : ''}`}
                     onClick={toggleExpand}
                     style={{
                       overflow: 'hidden',
                       transition: 'max-height 0.6s ease',
                       height: isExpanded ? 'auto' : '100px',
                       WebKitLineClamp: isExpanded ? 'none' : 8, // for Safari
                       lineClamp: isExpanded ? 'none' : 8,
                       WebkitBoxOrient: 'vertical',
                       boxOrient: 'vertical',
                       display: '-webkit-box',
                       textOverflow: 'ellipsis',
                       color: isExpanded ? '#fff' : '#7c7c7c',
                       margin: 0,
                       padding: 0,
                     }}>
                  <p style={{margin: 0}} className={s.projectModalLargeTextBlockText}>{projectData?.description}</p>
                </Div>
                {!isExpanded && (
                  <p style={{ fontWeight: 'bold', textAlign: 'center', color: '#ff3030' }}>Чтобы прочитать полное описание
                    проекта просто нажмите на него</p>
                )}
              </Div>
            </Div>
            <Div className={s.projectModalFooter}>
              <p>Манипуляции с проектами пока недоступны, приносим свои извинения</p>
            </Div>
          </Div>
        </ModalPage>
      </ModalRoot>
    )
  };

  return (
    <SplitLayout modal={modal()} popout={popout}>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home" fetchedUser={fetchedUser} onModalChange={handleModalChange} onProjectSelect={handleSelectProject}/>
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
