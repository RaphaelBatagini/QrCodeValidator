import {createStackNavigator} from 'react-navigation';

import Main from './pages/main';
import ScanScreen from './pages/scan-screen';

export default createStackNavigator(
  {
    Main,
    ScanScreen,
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
