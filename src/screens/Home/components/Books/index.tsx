import {Flex, MoreButton} from '@src/components';
import {Fonts} from '@src/constants/config';
import {useCaches} from '@src/constants/store';
import x from '@src/constants/x';
import moment from 'moment';
import React, {memo} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface MyProps {}

const Books: React.FC<MyProps> = memo(props => {
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
          账本
        </Text>
        <MoreButton label={'查看全部'} onPress={() => {}} />
      </Flex>
      <View style={{height: 10}} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{}}>
        <Flex horizontal style={{gap: 12}}>
          {Array.from({length: 10}, (_, i) => (
            <TouchableOpacity
              key={i}
              style={styles.item}
              activeOpacity={x.Touchable.OPACITY}
              onPress={() => {}}>
              <Flex horizontal justify={'space-between'}>
                <Text
                  style={{
                    color: '#333',
                    fontSize: x.scale(14),
                    fontWeight: '500',
                    flex: 1,
                  }}
                  numberOfLines={1}>
                  我是真的栓Q了家人们
                </Text>
                <TouchableOpacity
                  activeOpacity={x.Touchable.OPACITY}
                  onPress={() => {}}>
                  <Image
                    source={require('@src/assets/images/common/more_3_dots.png')}
                    style={{
                      height: x.scale(16),
                      width: x.scale(16),
                      tintColor: theme,
                    }}
                  />
                </TouchableOpacity>
              </Flex>
              <View style={{height: 10}} />
              <Flex horizontal align={'baseline'} justify={'flex-start'}>
                <Text
                  style={{
                    color: theme,
                    fontSize: x.scale(32),
                    fontFamily: Fonts.digital,
                  }}>
                  {(Math.random() * 1000).toFixed(2)}
                </Text>
                <Text style={{color: theme, fontSize: x.scale(14)}}>K</Text>
                <Text style={{color: '#999'}}> | </Text>
                <Text
                  style={{
                    color: '#666',
                  }}>
                  {Math.ceil(Math.random() * 1000)}
                </Text>
                <Text style={{color: '#666', fontSize: x.scale(14)}}>笔</Text>
              </Flex>
              <View style={{height: 10}} />
              <Text style={{color: '#666', fontSize: x.scale(12)}}>
                {moment().fromNow().replace(' ', '')}更新
              </Text>
            </TouchableOpacity>
          ))}
        </Flex>
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  view: {
    // backgroundColor: 'white',
    borderRadius: 8,
  },
  item: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: (x.WIDTH - 32) * 0.49,
  },
});

export default Books;
