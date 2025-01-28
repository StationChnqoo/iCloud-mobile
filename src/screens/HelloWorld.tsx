import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {RouteProp} from '@react-navigation/native';
import {
  Colors,
  Header,
  LearnMoreLinks,
} from 'react-native/Libraries/NewAppScreen';
import {useCaches} from '../constants/store';
import {RootStacksParams, RootStacksProp} from './Screens';
import {LineChart} from 'react-native-charts-wrapper';

interface MyProps {
  navigation?: RootStacksProp;
  route?: RouteProp<RootStacksParams, 'HelloWorld'>;
}

const HelloWorld = (props: MyProps) => {
  const {navigation} = props;
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const {bears, increase} = useCaches();
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <View style={{alignItems: 'center'}}>
            <View style={{height: 12}} />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation?.goBack();
              }}>
              <Text>Bye bye!</Text>
            </TouchableOpacity>
            <View style={{height: 12}} />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                increase(1);
              }}>
              <Text>Press me ++ {bears}</Text>
            </TouchableOpacity>
            <View style={{height: 12}} />
            <View style={styles.container}>
              <LineChart
                style={styles.chart}
                data={{
                  dataSets: [{label: 'demo', values: [{y: 1}, {y: 2}, {y: 1}]}],
                }}
              />
            </View>
            <LineChart
              style={{width: 200, height: 150}}
              data={{
                dataSets: [{label: 'demo', values: [{y: 1}, {y: 2}, {y: 1}]}],
              }}
            />
          </View>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  chart: {
    flex: 1,
  },
});

export default HelloWorld;
