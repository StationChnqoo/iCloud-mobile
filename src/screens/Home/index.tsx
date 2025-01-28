import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import {useCaches} from '@src/constants/store';
import * as Animatable from 'react-native-animatable';
import {RootStacksProp} from '../Screens';
import Books from './components/Books';
import ProfileBar from './components/ProfileBar';
import PropertyCount from './components/PropertyCount';
import UsedCounts from './components/UsedCounts';

interface MyProps {
  navigation?: RootStacksProp;
}

const Home: React.FC<MyProps> = props => {
  const {navigation} = props;
  const {cared, global} = useCaches();
  const [focused, setFocused] = useState(false);
  const [views, setViews] = useState([]);

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
      <ProfileBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic" bounces={false}>
        <View style={{}}>
          <View style={{height: 1}} />
          {[
            <PropertyCount />,
            <Books />,
            // <Counts diff={countsQuery.data?.data?.diff || []} />,
            <UsedCounts />,
          ].map((it, i) => (
            <View key={i} style={{marginVertical: 1}}>
              <Animatable.View
                useNativeDriver
                delay={i * 100}
                animation={['slideInLeft', 'slideInRight'][i % 2]}>
                {it}
              </Animatable.View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Home;
