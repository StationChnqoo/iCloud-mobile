import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import {Flex} from '@src/components';
import {useCaches} from '@src/constants/store';
import {RootStacksProp} from '../Screens';
import Passwords from './components/Passwords';
import Tabs from './components/Tabs';
import Webs from './components/Webs';
import Works from './components/Works';

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

  return (
    <View style={{flex: 1, backgroundColor: '#f0f0f0', position: 'relative'}}>
      <Tabs onTabPress={setTab} tabIndex={tab} />
      <View style={{flex: 1}}>{[<Works />, <Passwords />][tab]}</View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Home;
