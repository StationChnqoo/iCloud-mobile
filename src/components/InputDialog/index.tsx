import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import Flex from '../Flex';
import {useCaches} from '@src/constants/store';

interface MyProps {
  title: string;
  message: string;
  show: boolean;
  value?: string;
  onClose: () => void;
  onShow?: () => void;
  onHide?: () => void;
  onConfirm?: (s: string) => void;
}

const InputDialog: React.FC<MyProps> = props => {
  const {title, message, value, onConfirm, show, onClose, onHide, onShow} =
    props;
  const {theme} = useCaches();
  const [text, setText] = useState('');

  return (
    <Modal
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      animationInTiming={361}
      animationOutTiming={618}
      isVisible={show}
      onBackdropPress={onClose}
      onModalShow={onShow}
      onModalHide={onHide}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      statusBarTranslucent={false}
      backdropOpacity={0.58}
      style={{margin: 0, padding: 0, justifyContent: 'center'}}
      onShow={() => {
        setText(value);
      }}>
      <View style={styles.view}>
        <Text style={{color: '#333', fontWeight: '500', fontSize: 16}}>
          {title}
        </Text>
        <View style={{height: 15}} />
        <Text style={{color: '#333', fontSize: 14}}>{message}</Text>
        <View style={{height: 15}} />
        <TextInput
          style={styles.input}
          placeholder={''}
          value={text}
          onChangeText={setText}
          underlineColorAndroid={'transparent'}
        />
        <View style={{height: 30}} />
        <Flex horizontal justify={'flex-end'}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onClose}
            hitSlop={{bottom: 12, left: 12, top: 12, right: 12}}>
            <Text style={{color: '#999', fontSize: 16}}>取消</Text>
          </TouchableOpacity>
          <View style={{width: 24}} />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              onConfirm(text);
            }}
            hitSlop={{bottom: 12, left: 12, top: 12, right: 12}}>
            <Text style={{color: theme, fontSize: 16}}>确认</Text>
          </TouchableOpacity>
        </Flex>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  view: {
    borderRadius: 15,
    backgroundColor: 'white',
    margin: 24,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    padding: 0,
    height: 36,
    fontSize: 16,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 5,
  },
});

export default InputDialog;
