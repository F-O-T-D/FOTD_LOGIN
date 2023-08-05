import { StatusBar } from 'expo-status-bar';
import Navigation from './Navigations/Navigation';
import { UserProvider } from './Contexts/UserContext';

const App = () => {
  return (
    <UserProvider>
      <StatusBar style="dark" />
      <Navigation />
    </UserProvider>
  );
};

export default App;
