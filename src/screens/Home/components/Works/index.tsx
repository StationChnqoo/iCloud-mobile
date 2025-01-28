import {Flex} from '@src/components';
import {useCaches} from '@src/constants/store';
import {Jira} from '@src/constants/t';
import TrifleService from '@src/service/TrifleService';
import {useInfiniteQuery} from '@tanstack/react-query';
import moment from 'moment';
import React, {memo} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface MyProps {}

const Works: React.FC<MyProps> = memo(props => {
  const {} = props;
  const {theme, user} = useCaches();

  const loadDatas = async (page: number) => {
    let result = await new TrifleService().selectKpis({
      page,
      pageSize: 10,
    });
    // datas.value = result.data.data;
    return result.data;
  };

  const jiraQuery = useInfiniteQuery({
    initialPageParam: {page: 1},
    queryKey: ['jiraQuery'],
    retryOnMount: false,
    queryFn: params => loadDatas(params.pageParam.page),
    getNextPageParam: (lastPage, pages) => {
      return {page: lastPage.page + 1};
    },
  });

  // console.log('worksQuery: ', worksQuery.data.pages.map(it => it.datas).flat() || [])
  const loadItem = (info: ListRenderItemInfo<Jira>) => {
    const {item} = info;
    return <Item item={item} theme={theme} />;
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        ListHeaderComponent={() => <View style={{height: 10}} />}
        data={jiraQuery.data?.pages.map(it => it.datas).flat() || []}
        onEndReached={() => {
          jiraQuery.fetchNextPage();
        }}
        renderItem={loadItem}
        removeClippedSubviews={true}
        keyExtractor={(it, i) => `${it.id}:${i}`}
        onEndReachedThreshold={0.1}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        ListFooterComponent={() => (
          <Flex style={{marginVertical: 12}}>
            <Text style={{fontSize: 12, color: '#999'}}>滑动到底了 ...</Text>
          </Flex>
        )}
      />
    </View>
  );
});

const Item = React.memo(({item, theme}: {item: Jira; theme: string}) => {
  return (
    <View style={styles.item}>
      <Flex horizontal justify={'space-between'}>
        <Flex horizontal style={{flex: 1}} justify={'flex-start'}>
          <Text style={{fontSize: 14, color: theme}}>版本{item.version}</Text>
          <Text> · </Text>
          <Text style={{fontSize: 14, color: '#999'}}>{item.id}</Text>
        </Flex>
        <View style={{width: 32}} />
        <Text style={{fontSize: 14, color: '#666'}}>
          {moment(item.completeDate).format('YYYY/MM/DD')}
        </Text>
      </Flex>
      <View style={{height: 1, marginVertical: 6, backgroundColor: '#eee'}} />
      <Text style={{fontSize: 16, color: '#333'}}>{item.title}</Text>
      <View style={{height: 5}} />
      <Text style={{fontSize: 14, color: '#666'}}>
        主要参与:{' '}
        <Text style={{color: '#333'}}>{JSON.stringify(item.people)}</Text>
      </Text>
      <View style={{height: 5}} />
      <Text style={{fontSize: 14, color: '#666'}}>
        备注:{' '}
        <Text style={{color: '#333'}}>{item.message || '啥也没有 ~'}</Text>
      </Text>
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

export default Works;
