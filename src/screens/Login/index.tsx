import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {Button, Flex} from '@src/components';
import {useToast} from '@src/components/ToastProvider';
import ToolBar from '@src/components/ToolBar';
import {useCaches} from '@src/constants/store';
import x from '@src/constants/x';
import {NextService} from '@src/service';
import {RootStacksProp} from '../Screens';

interface MyProps {
  navigation?: RootStacksProp;
}

const Login: React.FC<MyProps> = props => {
  const {navigation} = props;
  const {theme, setUser} = useCaches();
  const toast = useToast();
  const [hidePassword, setHidePassword] = useState(true);
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    if (code && password) {
      let result = await new NextService().selectLogin(code, password);
      if (result.success) {
        setUser(result.data);
        toast.show('登录成功 ~');
        navigation.goBack();
      } else {
        toast.show(result.message);
      }
    } else {
      toast.show('请填完后登录 ~');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ToolBar
        title={'登录'}
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={{height: 1, backgroundColor: '#eee'}} />
      <View style={{padding: 16}}>
        <View style={styles.view}>
          <Image
            source={require('@src/assets/images/login/code.png')}
            style={{tintColor: theme, ...styles.icon}}
          />
          <View style={{width: 1, height: 24, backgroundColor: '#ccc'}} />
          <Flex
            horizontal
            style={{paddingHorizontal: 12, flex: 1}}
            justify={'space-between'}>
            <TextInput
              style={styles.input}
              placeholder={'账号'}
              numberOfLines={1}
              onChangeText={setCode}
              value={code}
            />
          </Flex>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{padding: 12}}
            onPress={() => {
              setCode('');
            }}>
            <Image
              source={require('@src/assets/images/login/clear.png')}
              style={{...styles.action}}
            />
          </TouchableOpacity>
        </View>
        <View style={{height: 16}} />
        <View style={styles.view}>
          <Image
            source={require('@src/assets/images/login/password.png')}
            style={{tintColor: theme, ...styles.icon}}
          />
          <View style={{width: 1, height: 24, backgroundColor: '#ccc'}} />
          <Flex
            horizontal
            style={{paddingHorizontal: 12, flex: 1}}
            justify={'space-between'}>
            <TextInput
              style={styles.input}
              placeholder={'密码'}
              numberOfLines={1}
              // textContentType={'password'}
              value={password}
              onChangeText={setPassword}
            />
          </Flex>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{padding: 12}}
            onPress={() => {
              setHidePassword(t => !t);
            }}>
            <Image
              source={
                hidePassword
                  ? require('@src/assets/images/login/eye_close.png')
                  : require('@src/assets/images/login/eye_open.png')
              }
              style={{...styles.action}}
            />
          </TouchableOpacity>
        </View>
        <View style={{height: 16}} />
        <Button
          style={{
            height: x.scale(44),
            backgroundColor: theme,
            borderRadius: 16,
          }}
          textStyle={{fontSize: x.scale(16), color: '#fff'}}
          title={'登录'}
          onPress={submit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    flexDirection: 'row',
    height: x.scale(48),
  },
  icon: {
    height: x.scale(20),
    width: x.scale(20),
    marginHorizontal: 12,
  },
  action: {
    height: x.scale(18),
    width: x.scale(18),
    tintColor: '#666',
  },
  input: {
    fontSize: x.scale(16),
    paddingVertical: 0,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    height: x.scale(24),
  },
});

export default Login;
