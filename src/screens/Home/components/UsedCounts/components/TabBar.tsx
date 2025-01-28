import {Flex} from '@src/components';
import {useCaches} from '@src/constants/store';
import x from '@src/constants/x';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface MyProps {
  onPress: (index: number) => void;
}

const TabBar: React.FC<MyProps> = props => {
  const {onPress} = props;
  const [tabIndex, setIndex] = useState(0);
  const tabs = ['近一周', '近一月', '近半年', '近一年'];
  const {theme} = useCaches();

  return (
    <Flex style={{gap: 12}} horizontal>
      {tabs.map((it, i) => (
        <TouchableOpacity
          key={i}
          activeOpacity={x.Touchable.OPACITY}
          onPress={() => {
            setIndex(i);
          }}>
          <Flex>
            <Text
              style={{
                fontSize: x.scale(14),
                color: tabIndex == i ? theme : '#666',
              }}>
              {it}
            </Text>
            <View style={{height: 4}} />
            <View
              style={{
                height: 2,
                width: 12,
                borderRadius: 2,
                backgroundColor: tabIndex == i ? theme : '#fff',
              }}
            />
          </Flex>
        </TouchableOpacity>
      ))}
    </Flex>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default TabBar;
