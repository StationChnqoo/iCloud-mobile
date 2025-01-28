import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { AppRegistry, View } from 'react-native';
import { name as appName } from './app.json';
import { ToastProvider } from './src/components';
import Screens from './src/screens/Screens';
import moment from 'moment';
import 'react-native-reanimated';
import 'moment/locale/zh-cn';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const queryClient = new QueryClient();

const Bookkeeping = () => {
  useEffect(() => {
    moment.locale('zh-cn');
    return function () { };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <ToastProvider>
          <View style={{ flex: 1 }}>
            <Screens />
          </View>
        </ToastProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

AppRegistry.registerComponent(appName, () => Bookkeeping);
