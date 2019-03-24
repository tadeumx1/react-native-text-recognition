import { createStackNavigator, createAppContainer } from 'react-navigation';

import Welcome from './pages/Welcome';
import Main from './pages/Main';
import AuthLoadingScreen from './pages/AuthLoadingScreen';

const createNavigator = createStackNavigator (
    
    {

      AuthLoadingScreen: { screen: AuthLoadingScreen },

      Welcome: { screen: Welcome },

      Main: { screen: Main },

    },

);

const MainNavigator = createAppContainer(createNavigator);

export default MainNavigator;