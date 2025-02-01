import {useFocusEffect} from '@react-navigation/native';
import {Flex} from '@src/components';
import {useCaches} from '@src/constants/store';
import {Property} from '@src/constants/t';
import WalletService from '@src/service/WalletService';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {produce} from 'immer';
import moment from 'moment';
import React, {memo, useCallback} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface MyProps {
  onItemPress: (id: string) => void;
}

const Wallets: React.FC<MyProps> = memo(props => {
  const {onItemPress} = props;
  const {theme, user} = useCaches();
  const queryClient = useQueryClient();

  const loadDatas = async (page: number) => {
    let result = await new WalletService().selectProperties({
      page,
      pageSize: 10,
    });
    return result.data;
  };

  const propertiesQuery = useInfiniteQuery({
    initialPageParam: {page: 1},
    queryKey: ['propertiesQuery'],
    retryOnMount: false,
    refetchOnMount: false,
    queryFn: params => loadDatas(params.pageParam.page),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasNext ? {page: lastPage.page + 1} : undefined;
    },
  });

  useFocusEffect(
    useCallback(() => {
      propertiesQuery.refetch();
      return function () {};
    }, []),
  );

  const loadItem = (info: ListRenderItemInfo<Property>) => {
    const {item} = info;
    const maps = {
      wechat: '微信',
      alipay: '支付宝',
      unionpay: '银联',
      cash: '现金',
      carpooling: '顺风车',
      eastmoney: '股票',
      housefund: '公积金',
    };
    return (
      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.8}
        onPress={() => {
          onItemPress(item.id);
        }}>
        <Flex horizontal justify={'space-between'}>
          <Text style={{fontSize: 14, color: '#999'}}>{item.id}</Text>
          <Text style={{fontSize: 14, color: '#333'}}>
            {moment(item.settleDate).format('YYYY年ww周').replace(' ', '')}
          </Text>
        </Flex>
        <View style={{height: 1, marginVertical: 6, backgroundColor: '#eee'}} />
        <Flex
          horizontal
          style={{flexWrap: 'wrap', gap: 10}}
          justify={'flex-start'}>
          {Object.keys(maps).map((it, i) => (
            <Flex horizontal justify="flex-start" key={i}>
              <Text
                style={{fontSize: 14, color: '#333'}}>{`${maps[it]}: `}</Text>
              <Text style={{fontSize: 14, color: '#999'}}>{`${
                Array.isArray(item[it])
                  ? `[${item[it].map(t => `${t}K`).join(' , ')}]`
                  : `${item[it]}K`
              }`}</Text>
            </Flex>
          ))}
        </Flex>
        <View style={{height: 10}} />
        <Flex justify="flex-end" horizontal>
          <Text style={{color: theme, fontSize: 16}}>
            {parseFloat(item.sum).toFixed(2)}K
          </Text>
        </Flex>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={propertiesQuery.isFetching}
            onRefresh={() => {
              queryClient.resetQueries({queryKey: ['propertiesQuery']});
              propertiesQuery.refetch();
            }}
          />
        }
        ListHeaderComponent={<View style={{height: 10}} />}
        data={propertiesQuery.data?.pages.map(it => it.datas).flat() || []}
        onEndReached={() => {
          propertiesQuery.fetchNextPage();
        }}
        renderItem={loadItem}
        keyExtractor={(it, i) => `${it.id}:${i}`}
        onEndReachedThreshold={0.1}
        removeClippedSubviews={true}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        ListFooterComponent={
          <Flex style={{marginVertical: 12}}>
            <Text style={{fontSize: 12, color: '#999'}}>滑动到底了 ...</Text>
          </Flex>
        }
      />
    </View>
  );
});

const styles = StyleSheet.create({
  view: {
    // backgroundColor: 'white',
    borderRadius: 8,
  },
  item: {
    borderRadius: 8,
    backgroundColor: 'white',
    marginHorizontal: 12,
    // marginVertical: 5,
    padding: 8,
  },
});

export default Wallets;
