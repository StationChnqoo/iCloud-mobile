import {useCaches} from '@src/constants/store';
import x from '@src/constants/x';
import React, {ReactNode} from 'react';
import {
  FlexAlignType,
  FlexStyle,
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Flex from '../Flex';

interface MyProps {
  label: string;
  onPress: () => void;
}

const MoreButton: React.FC<MyProps> = props => {
  const {label, onPress} = props;
  const {theme} = useCaches();
  return (
    <TouchableOpacity activeOpacity={x.Touchable.OPACITY}>
      <Flex horizontal>
        <Text style={{color: theme, fontSize: x.scale(14)}}>{label}</Text>
        <View style={{width: 4}} />
        <Image
          source={require('@src/assets/images/common/arrow_right.png')}
          style={{height: x.scale(16), width: x.scale(16), tintColor: theme}}
        />
      </Flex>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default MoreButton;
