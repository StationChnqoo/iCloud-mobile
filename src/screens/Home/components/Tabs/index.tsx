import {Flex} from '@src/components';
import {useCaches} from '@src/constants/store';
import x from '@src/constants/x';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface MyProps {
  tabIndex: number;
  onTabPress: (t: number) => void;
}

const Tabs: React.FC<MyProps> = props => {
  const {tabIndex, onTabPress} = props;
  const {theme, user} = useCaches();
  
  const tabs = [
    {label: '工作', value: 'jira'},
    {label: '密码', value: 'password'},
    // {label: '刘谦', value: 'magic'},
  ];
  const sideSize = {height: x.scale(48), width: x.scale(48)};
  return (
    <View style={{backgroundColor: '#fff', ...x.Styles.CARD}}>
      <View style={{height: useSafeAreaInsets().top}} />
      <ScrollView horizontal bounces={false}>
        <Flex style={{gap: 15, paddingHorizontal: 15, height: 44}} horizontal>
          {tabs.map((it, i) => (
            <TouchableOpacity
              key={i}
              activeOpacity={0.9}
              onPress={() => {
                onTabPress(i);
              }}>
              <Flex>
                <Text
                  style={{fontSize: 16, color: tabIndex == i ? theme : '#666'}}>
                  {it.label}
                </Text>
                <View style={{height: 4}} />
                <View
                  style={{
                    ...styles.dot,
                    backgroundColor: tabIndex == i ? theme : 'white',
                  }}
                />
              </Flex>
            </TouchableOpacity>
          ))}
        </Flex>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    width: 16,
    height: 3,
    borderRadius: 2,
  },
});

export default Tabs;
