import Navigate from './source/navigations/navigate';
import { Screens } from '@navigations/Screens';
import 'react-native-gesture-handler';


export default function App() {  
  return Navigate(Screens.Start);
}
