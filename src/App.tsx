import { useState, useEffect, ReactNode } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner, ModalRoot, ModalCard } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
import { Icon56ServicesOutline } from '@vkontakte/icons';


import { DEFAULT_VIEW_PANELS } from './routes';
import Home from './panels/Home';
import { apiUrls } from '@/api';

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
  const [fetchedUser, setUser] = useState<UserInfo | undefined>();
  const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner size="large" />);

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      bridge.send('VKWebAppResizeWindow', { width: 1200, height: 700 });
      
      setUser(user);
      console.log(user);

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

      console.log(resp);

      setPopout(null);
    }
    fetchData();
  }, []);

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalHistory, setModalHistory] = useState([]);

  const handleModalChange = (newModal) => {
    setActiveModal(newModal);
  };


  const modal = (
    <ModalRoot activeModal={activeModal}>
      <ModalCard
        id="warning"
        onClose={() => handleModalChange(null)}
        header="Эта функция временно недоступна"
        subheader="Мы всё ещё работаем над приложением, пожалуйста, заходите позже"
        icon={<Icon56ServicesOutline />}
      />
    </ModalRoot>
  );

  return (
    <SplitLayout modal={modal} popout={popout}>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home" fetchedUser={fetchedUser} onModalChange={handleModalChange}/>
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
