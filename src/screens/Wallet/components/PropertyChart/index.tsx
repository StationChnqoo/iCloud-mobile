import React from 'react';
import {
  ActivityIndicator,
  processColor,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {useCaches} from '@src/constants/store';
import {Property} from '@src/constants/t';
import x from '@src/constants/x';
import {RootStacksProp} from '@src/screens/Screens';
import {LineChart} from 'react-native-charts-wrapper';
import {produce} from 'immer';
import {BooksTemplates} from '@src/constants/config';

interface MyProps {
  navigation?: RootStacksProp;
  datas: Property[];
}

const PropertyChart: React.FC<MyProps> = props => {
  const {navigation, datas} = props;
  const {theme, setUser} = useCaches();

  const buildGroupDatas = (label: string, key: keyof Property) => {
    const colors = produce(BooksTemplates, draft => {
      for (let i = 0; i < draft.length; i++) {
        let j = Math.floor(draft.length * Math.random());
        let t = draft[i];
        draft[i] = draft[j];
        draft[j] = t;
      }
    });
    let r = Math.floor(colors.length * Math.random());
    return {
      label,
      values: datas
        .sort((a, b) => a.settleDate - b.settleDate)
        .map(it => ({y: parseFloat(`${it[key]}`)})),
      config: {
        color: processColor(colors[r].value),
        circleColor: processColor(colors[r].value),
      },
    };
  };

  return (
    <View style={styles.view}>
      <View style={{height: 12}} />
      <Text style={styles.title}>个人资产净值</Text>
      <View style={{height: 10}} />
      {datas.length == 0 ? (
        <ActivityIndicator color={theme} />
      ) : (
        <LineChart
          style={{width: '100%', height: x.WIDTH * 0.618}}
          data={{
            dataSets: [
              buildGroupDatas('总资产', 'sum'),
              buildGroupDatas('股票', 'eastmoney'),
              buildGroupDatas('银联', 'cash'),
              buildGroupDatas('支付宝', 'alipay'),
            ],
          }}
        />
      )}
      <View style={{height: 10}} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: x.scale(16),
    color: '#333',
    fontWeight: '500',
    paddingHorizontal: 12,
  },
});

export default PropertyChart;
