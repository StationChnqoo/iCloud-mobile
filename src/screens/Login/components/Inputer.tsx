import React, {useState} from 'react';
import {
  Image,
  ImageRequireSource,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {useToast} from '@src/components/ToastProvider';
import {useCaches} from '@src/constants/store';
import {LoginInputAction} from '@src/constants/t';
import x from '@src/constants/x';
import {NextService} from '@src/service';
import {Flex} from '@src/components';

interface MyProps {
  icon: ImageRequireSource;
  label: string;
  onChage: (s: string) => void;
  action: LoginInputAction;
}

const Inputer: React.FC<MyProps> = props => {
  const {icon, label, onChage, action} = props;
  const {theme, setUser} = useCaches();
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const submit = async () => {
    if (code && password) {
      let result = await new NextService().selectLogin(code, password);
      if (result.success) {
        setUser(result.data);
        toast.show('登录成功 ~');
        // navigation.goBack();
      } else {
        toast.show(result.message);
      }
    } else {
      toast.show('请填完后登录 ~');
    }
  };

  return (
    <View style={styles.view}>
      <Image source={icon} style={{tintColor: theme, ...styles.icon}} />
      <View style={{width: 1, height: 24, backgroundColor: '#ccc'}} />
      <Flex
        horizontal
        style={{paddingHorizontal: 12, flex: 1}}
        justify={'space-between'}>
        <TextInput style={styles.input} />
      </Flex>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    flexDirection: 'row',
    height: x.scale(48),
  },
  icon: {
    height: x.scale(24),
    width: x.scale(24),
    marginHorizontal: 12,
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

export default Inputer;
