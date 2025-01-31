import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {RouteProp} from '@react-navigation/native';
import {Button, DatePicker, Flex, MoreButton, Star} from '@src/components';
import ToolBar from '@src/components/ToolBar';
import {useCaches} from '@src/constants/store';
import {Jira, JiraSchema} from '@src/constants/t';
import TrifleService from '@src/service/TrifleService';
import {produce} from 'immer';
import moment from 'moment';
import {Divider, ScrollView, useToast} from 'native-base';
import {RootStacksParams, RootStacksProp} from '../Screens';
import PeopleSelectorModal from './components/PeopleSelectorModal';
import {nanoid} from 'nanoid';
import x from '@src/constants/x';
import DateTimePicker from '@react-native-community/datetimepicker';

interface MyProps {
  navigation?: RootStacksProp;
  route?: RouteProp<RootStacksParams, 'EditJira'>;
}

const EditJira: React.FC<MyProps> = props => {
  const {navigation, route} = props;
  const {theme, setUser} = useCaches();
  const [form, setForm] = useState<Jira>(JiraSchema.parse({}));
  const [open, setOpen] = useState(false);
  const [timePicker, setTimePicker] = useState(false);

  const toast = useToast();

  const updateForm = <K extends keyof Jira>(key: K, value: Jira[K]) => {
    let _form = produce(form, draft => {
      draft[key] = value;
    });
    setForm(_form);
  };

  const onPeopleAppend = (t: string) => {
    updateForm('people', [...form.people, t]);
    setOpen(false);
  };

  const onPeopleDelete = (index: number) => {
    updateForm(
      'people',
      produce(form.people, draft => {
        draft.splice(index, 1);
      }),
    );
  };

  const onDelete = async () => {
    Alert.alert('提示', '删除后不可恢复，请谨慎操作 ...', [
      {text: '取消', onPress: () => {}},
      {
        text: '确定',
        onPress: async () => {
          const result = await new TrifleService().deleteJira(form.id);
          toast.show({description: '删除成功'});
          navigation.goBack();
        },
      },
    ]);
  };

  const onSave = async () => {
    if (route.params?.id) {
      await new TrifleService().updateJira(form);
    } else {
      await new TrifleService().insertJira(form);
    }
    toast.show({description: '修改成功'});
    navigation.goBack();
  };

  const loadLine = () => <View style={styles.line} />;

  const loadJira = async () => {
    let _form = JSON.parse(JSON.stringify(form)) as Jira;
    if (route.params?.id) {
      let result = await new TrifleService().selectJira(route.params.id);
      _form = result.data;
    } else {
      _form.createTime = new Date().getTime();
      _form.id = x.Strings.uuid();
    }
    _form.updateTime = new Date().getTime();
    delete _form['_id'];
    setForm(_form);
  };

  useEffect(() => {
    loadJira();
    return function () {};
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ToolBar
        title={`${route.params?.id ? '编辑' : '新增'}Jira`}
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={{height: 1, backgroundColor: '#eee'}} />
      <ScrollView bounces={false} style={{flex: 1}}>
        <View style={{padding: 15}}>
          <Flex horizontal justify="space-between" align="flex-end">
            <Text style={styles.label}>ID</Text>
            <Text>{form.id}</Text>
          </Flex>
          {loadLine()}
          <Flex horizontal justify="space-between" align="flex-end">
            <Text style={styles.label}>版本号</Text>
            <TextInput
              placeholder="版本号"
              style={styles.input}
              textAlign={'right'}
              multiline
              value={form.version}
              onChangeText={t => updateForm('version', t)}
            />
          </Flex>
          {loadLine()}
          <Flex horizontal justify="space-between" align="flex-end">
            <Text style={styles.label}>复杂度</Text>
            <Star
              value={form?.complexity}
              onPress={t => {
                updateForm('complexity', t);
              }}
            />
          </Flex>
          {loadLine()}
          <Flex horizontal justify="space-between" align="flex-end">
            <Text style={styles.label}>Jira简介</Text>
            <TextInput
              placeholder="Jira简介"
              style={{...styles.input, height: undefined}}
              textAlign={'right'}
              multiline
              value={form.title}
              onChangeText={t => updateForm('title', t)}
            />
          </Flex>
          {loadLine()}
          <Flex horizontal justify="space-between" align="flex-end">
            <Text style={styles.label}>Jira备注</Text>
            <TextInput
              placeholder="Jira备注"
              style={{...styles.input, height: undefined}}
              textAlign={'right'}
              multiline
              value={form.message}
              onChangeText={t => updateForm('message', t)}
            />
          </Flex>
          {loadLine()}
          <Flex horizontal justify="space-between" align="flex-end">
            <Text style={styles.label}>完成日期</Text>
            <MoreButton
              onPress={() => {
                setTimePicker(true);
              }}
              label={
                form.completeDate
                  ? moment(form.completeDate).format('YYYY/MM/DD')
                  : '请选择'
              }
            />
          </Flex>
          {loadLine()}
          <Flex horizontal justify="space-between" align="flex-end">
            <Text style={styles.label}>创建时间</Text>
            <Text>{moment(form.createTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
          </Flex>
          {loadLine()}
          <Flex horizontal justify="space-between" align="flex-end">
            <Text style={styles.label}>修改时间</Text>
            <Text>{moment(form.updateTime).fromNow()}</Text>
          </Flex>
          {loadLine()}
          <Flex horizontal justify="space-between" align="flex-end">
            <Text style={styles.label}>参与人员</Text>
            <MoreButton
              onPress={() => {
                setOpen(true);
              }}
              label={
                form.people.length > 0
                  ? `已选${form.people.length}人`
                  : '请选择'
              }
            />
          </Flex>
          <View style={{height: 5}} />
          <View style={styles.tags}>
            {form.people.map((it, i) => (
              <Flex horizontal key={i} style={styles.tag}>
                <Text
                  style={{color: '#333', fontSize: 14, paddingHorizontal: 5}}>
                  {it}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
                  onPress={() => {
                    onPeopleDelete(i);
                  }}>
                  <Image
                    source={require('./assets/delete.png')}
                    style={{height: 24, width: 24, tintColor: '#ccc'}}
                  />
                </TouchableOpacity>
              </Flex>
            ))}
          </View>
        </View>
      </ScrollView>
      <Divider />
      <Flex
        horizontal
        justify={'flex-end'}
        style={{paddingHorizontal: 15, paddingVertical: 10}}>
        <Button
          title={'删除'}
          style={{
            borderColor: theme,
            ...styles.deleteButton,
          }}
          textStyle={{color: theme}}
          onPress={onDelete}
        />
        <View style={{width: 16}} />
        <Button
          title={'保存'}
          style={{
            backgroundColor: theme,
            ...styles.saveButton,
          }}
          textStyle={{color: '#fff'}}
          onPress={onSave}
        />
      </Flex>
      <PeopleSelectorModal
        show={open}
        onClose={() => {
          setOpen(false);
        }}
        onHide={() => {}}
        onConfirm={onPeopleAppend}
      />
      <DatePicker
        value={new Date(form.completeDate)}
        show={timePicker}
        onClose={() => {
          setTimePicker(false);
        }}
        onConfirm={ms => {
          updateForm('completeDate', new Date(ms).getTime());
          setTimePicker(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: '#333',
    lineHeight: 24,
    textAlignVertical: 'center',
  },
  value: {
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
    height: 36,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  saveButton: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  line: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 5,
  },
  tag: {
    borderRadius: 10,
    height: 32,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 4,
  },
  input: {
    fontSize: 14,
    lineHeight: 16,
    flex: 1,
    padding: 0,
    height: 24,
  },
});

export default EditJira;
