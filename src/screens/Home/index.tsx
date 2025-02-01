import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import {useCaches} from '@src/constants/store';
import {RootStacksProp} from '../Screens';
import Passwords from './components/Passwords';
import Tabs from './components/Tabs';
import Works from './components/Works';
import Magics from './components/Magics';

interface MyProps {
  navigation?: RootStacksProp;
}

const Home: React.FC<MyProps> = props => {
  const {navigation} = props;
  const {cared, global} = useCaches();
  const [focused, setFocused] = useState(false);
  const [views, setViews] = useState([]);
  const [tab, setTab] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setFocused(true);
      // console.log(`SHA256: ${SHA256('666666')}`);
      return function () {
        setFocused(false);
      };
    }, []),
  );

  const tabComponents = useMemo(
    () => [
      <Works
        key="works"
        onJiraPress={id => {
          navigation.navigate('EditJira', {id});
        }}
      />,
      <Passwords
        key="passwords"
        onItemPress={id => {
          navigation.navigate('EditPassword', {id});
        }}
      />,
    ],
    [],
  );

  return (
    <View style={{flex: 1, backgroundColor: '#f0f0f0', position: 'relative'}}>
      <Tabs onTabPress={setTab} tabIndex={tab} />
      <View style={{flex: 1}}>
        {tabComponents.map((it, i) => (
          <View key={i} style={{display: i == tab ? 'flex' : 'none', flex: 1}}>
            {tabComponents[i]}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Home;
