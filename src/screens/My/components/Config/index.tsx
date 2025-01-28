import React, {useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Card from '../Card';
import {RootStacksProp} from '@src/screens/Screens';
import {useCaches} from '@src/constants/store';
import x from '@src/constants/x';
import {Button, Flex} from '@src/components';
import {produce} from 'immer';

interface MyProps {
  navigation?: RootStacksProp;
}

const Config: React.FC<MyProps> = props => {
  const {isDidiao, setIsDidiao, theme, clear, setTheme} = useCaches();
  const [colors, setColors] = useState([]);

  const shuffle = (array: any[]) => {
    return produce(array, draft => {
      for (let i = 0; i < draft.length; i++) {
        let j = Math.floor(draft.length * Math.random());
        let t = draft[i];
        draft[i] = draft[j];
        draft[j] = t;
      }
    });
  };

  const onClearPress = () => {
    Alert.alert('提示', '确认要清除数据缓存吗？', [
      {text: '取消', onPress: () => {}},
      {
        text: '确认',
        onPress: () => {
          clear();
        },
      },
    ]);
  };

  useEffect(() => {
    setColors(shuffle(x.COLORS).slice(0, 5));
    return function () {};
  }, []);
  return (
    <Card title={'设置'}>
      <View style={{height: 5}} />
      <Flex justify={'space-between'} horizontal>
        <Text style={{fontSize: x.scale(14), color: '#333'}}>低调模式</Text>
        <Switch
          value={isDidiao}
          onValueChange={() => setIsDidiao(!isDidiao)}
          thumbColor={isDidiao ? theme : '#999'}
          // style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
          trackColor={{false: '#ccc', true: x.Colors.hex2Rgba(theme, 0.28)}}
        />
      </Flex>
      <View style={{height: 10}} />
      <Flex justify={'space-between'} horizontal>
        <Text style={{fontSize: x.scale(14), color: '#333'}}>清除数据缓存</Text>
        <Button
          title={'清除'}
          onPress={onClearPress}
          textStyle={{color: '#fff'}}
          style={{
            backgroundColor: theme,
            ...styles.button,
          }}
        />
      </Flex>
      <View style={{height: 10}} />
      <Flex justify={'space-between'} horizontal>
        <Flex horizontal>
          <Text style={{fontSize: x.scale(14), color: '#333'}}>主题</Text>
          <View style={{width: 12}} />
          <Flex horizontal>
            {colors.map((it, i) => (
              <TouchableOpacity
                onPress={() => {
                  setTheme(it.value);
                }}
                key={i}>
                <View style={{...styles.dotColor, backgroundColor: it.value}} />
              </TouchableOpacity>
            ))}
          </Flex>
        </Flex>
        <Button
          title={'换一批'}
          onPress={() => {
            setColors(shuffle(x.COLORS).slice(0, 5));
          }}
          textStyle={{color: '#fff'}}
          style={{
            ...styles.button,
            backgroundColor: theme,
          }}
        />
      </Flex>
    </Card>
  );
};

const styles = StyleSheet.create({
  dotColor: {
    height: 24,
    width: 24,
    borderRadius: 12,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 1,
    padding: 1,
  },
  button: {
    height: x.scale(30),
    paddingHorizontal: 12,
    borderRadius: 15,
  },
});

export default Config;
