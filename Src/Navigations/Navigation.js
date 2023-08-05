import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import * as SplashScreen from 'expo-splash-screen';
import { useUserState } from '../Contexts/UserContext';
import MainStack from './MainStack';
import { useEffect, useState } from 'react';
import { Asset } from 'expo-asset';
import ContentTab from './ContentTap';

const Navigation = () => {
  const [user] = useUserState();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Asset.fromModule(
          require('../../assets/cover.png')
        ).downloadAsync();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      } finally {
        setIsReady(true);
      }
    })();
  }, []);

  const onReady = async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  };

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer onReady={onReady}>
      {user && user.user_id ? <ContentTab /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
