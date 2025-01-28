import {Flex} from '@src/components';
import {CIncomes} from '@src/constants/config';
import {useCaches} from '@src/constants/store';
import x from '@src/constants/x';
import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import TabBar from './components/TabBar';

interface MyProps {}

const UsedCounts: React.FC<MyProps> = memo(props => {
  const {} = props;
  const {theme, user} = useCaches();

  const sideSize = {height: x.scale(48), width: x.scale(48)};
  // const money = [
  //   '643.30',
  //   '642.70',
  //   '645.60',
  //   '655.50',
  //   '661.00',
  //   '659.90',
  // ].map(it => parseFloat(it));
  const money = Array.from({length: 52}, (_, i) => Math.random() * i);
  const rateBasedLastMonth =
    Math.random() * 100 * (Math.random() < 0.5 ? -1 : 1);
  return (
    <View
      style={{
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}>
      <Flex align={'flex-end'} justify={'space-between'} horizontal>
        <Text style={{color: '#333', fontSize: x.scale(16), fontWeight: '500'}}>
          统计
        </Text>
        <TabBar onPress={() => {}} />
      </Flex>
      <View style={{height: 10}} />

      {Array.from(
        CIncomes.sort(() => Math.random()),
        (_, i) => (
          <TouchableOpacity
            key={i}
            style={{marginVertical: 5}}
            activeOpacity={x.Touchable.OPACITY}
            onPress={() => {}}>
            <Animatable.View
              useNativeDriver
              delay={1000 + i * 100}
              animation={['slideInUp', 'slideInDown'][i % 2]}>
              <Flex justify={'space-between'} horizontal>
                <Flex horizontal justify={'flex-start'}>
                  <Flex style={styles.emojiContainer}>
                    <Text style={{fontSize: 24}}>{_.emoji}</Text>
                  </Flex>
                  <View style={{width: 6}} />
                  <Text style={{fontSize: x.scale(14), color: '#333'}}>
                    {_.label}
                  </Text>
                </Flex>
                <View style={{width: 12}} />
                <Flex
                  style={{
                    flex: 1,
                    ...styles.progressBar,
                    backgroundColor: theme,
                  }}
                  justify={'flex-end'}
                  horizontal>
                  <Text style={{color: '#333', fontSize: x.scale(14)}}>
                    ¥{(Math.random() * 1024).toFixed(2)}
                  </Text>
                </Flex>
              </Flex>
            </Animatable.View>
          </TouchableOpacity>
        ),
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  view: {
    // backgroundColor: 'white',
    borderRadius: 8,
  },
  itemContainer: {
    width: (x.WIDTH - 32) / 4,
    padding: 2,
  },
  item: {
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
  },
  progressBar: {
    height: x.scale(28),
    borderRadius: 16,
    paddingHorizontal: 8,
    position: 'relative',
  },
  emojiContainer: {
    height: x.scale(32),
    width: x.scale(32),
    backgroundColor: '#eee',
    borderRadius: x.scale(16),
  },
});

export default UsedCounts;
