import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { NativeBaseProvider } from "native-base";
import React, { useEffect } from 'react';
import { AppRegistry, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { name as appName } from './app.json';
import Screens from './src/screens/Screens';
const queryClient = new QueryClient();

const Bookkeeping = () => {
  useEffect(() => {
    moment.locale('zh-cn');
    return function () { };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <NativeBaseProvider>
          <View style={{ flex: 1 }}>
            <Screens />
          </View>
        </NativeBaseProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

AppRegistry.registerComponent(appName, () => Bookkeeping);
