import Button from '@src/components/Button';
import x from '@src/constants/x';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Card from '../Card';
import {useCaches} from '@src/constants/store';

interface MyProps {}

const Color: React.FC<MyProps> = props => {
  const {theme, setTheme} = useCaches();
  const [colors, setColors] = useState([]);
  const [r, setR] = useState(0);

  useEffect(() => {
    let _colors = [...x.COLORS]
      .sort(() => Math.random() - 0.5)
      .map(it => it.value)
      .slice(0, 5);
    setColors(_colors);
    return function () {};
  }, [r]);

  return (
    <Card title={'主题'}>
      <View style={{height: 6}} />
      <View style={x.Styles.rowCenter()}>
        <View style={x.Styles.rowCenter()}>
          {colors.map(it => (
            <TouchableOpacity
              key={it}
              hitSlop={x.Touchable.hitlop(6)}
              style={[
                styles.circle,
                {
                  backgroundColor: it,
                },
              ]}
              activeOpacity={x.Touchable.OPACITY}
              onPress={() => {
                setTheme(it);
              }}
            />
          ))}
        </View>
        <Button
          title={`${theme} 换一组`}
          textStyle={{color: 'white', fontSize: x.scale(12)}}
          style={[
            styles.button,
            {
              backgroundColor: theme,
            },
          ]}
          onPress={() => setR(Math.random())}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  circle: {
    height: x.scale(20),
    width: x.scale(20),
    marginRight: 12,
    borderRadius: x.scale(10),
  },
  button: {
    borderRadius: x.scale(15),
    height: x.scale(30),
    paddingHorizontal: 12,
  },
});

export default Color;
