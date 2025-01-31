import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import * as React from 'react';
import HelloWorld from './HelloWorld';
// 这个地方用Path alias，@/App会报错
import App from '../../App';
import Welcome from './Welcome';
import BottomTabs from './BottomTabs';
import ChooseStock from './ChooseStock';
import Webviewer from './Webviewer';
import Login from './Login';
import ChooseGlobal from './ChooseGlobal';
import EditJira from './EditJira';

export type RootStacksParams = {
  App: undefined;
  HelloWorld: {id: string};
  Welcome: undefined;
  BottomTabs: undefined;
  ChooseStock: {id?: string};
  Webviewer: {title: string; url: string};
  Login: undefined;
  ChooseGlobal: undefined;
  EditJira: {id?: string};
};

const RootStack = createNativeStackNavigator<RootStacksParams>();

export type RootStacksProp = NativeStackNavigationProp<RootStacksParams>;

export default function Stacks() {
  const navigator = useNavigationContainerRef();
  // useFlipper(navigator);
  return (
    <NavigationContainer ref={navigator}>
      <RootStack.Navigator
        screenOptions={{
          animation: 'slide_from_right',
          headerShown: false,
          animationDuration: 618,
        }}>
        <RootStack.Screen name="Welcome" component={Welcome} />
        <RootStack.Screen name="BottomTabs" component={BottomTabs} />
        <RootStack.Screen name="App" component={App} />
        <RootStack.Screen name="HelloWorld" component={HelloWorld} />
        <RootStack.Screen name="ChooseStock" component={ChooseStock} />
        <RootStack.Screen name="Webviewer" component={Webviewer} />
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="ChooseGlobal" component={ChooseGlobal} />
        <RootStack.Screen name="EditJira" component={EditJira} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
