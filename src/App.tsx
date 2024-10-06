import { useState, useEffect, ReactNode } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';



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

  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home" fetchedUser={fetchedUser} />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
