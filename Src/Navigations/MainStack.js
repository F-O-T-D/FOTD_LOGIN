import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WHITE } from '../Colors';
import { MainRoutes } from './Routes';
import ProfileScreen from '../Screens/ProfileScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ contentStyle: { backgroundColor: WHITE } }}
    >
      <Stack.Screen name={MainRoutes.PROFILE} component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
