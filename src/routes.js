import {createStackNavigator} from 'react-navigation';

import Main from './pages/main';

export default createStackNavigator(
  {
    Main,
  },
  // routes configurations
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#A62241',
      },
      headerTintColor: '#FFF',
    },
  },
);
