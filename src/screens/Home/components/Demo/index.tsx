import {useCaches} from '@src/constants/store';
import {useQueryClient} from '@tanstack/react-query';
import {useToast} from 'native-base';
import React, {memo, useRef} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import VideoPlayer, {type VideoPlayerRef} from 'react-native-video-player';

interface MyProps {}

const Demo: React.FC<MyProps> = memo(props => {
  const {} = props;
  const {theme, user} = useCaches();
  const queryClient = useQueryClient();
  const toast = useToast();
  const playerRef = useRef<VideoPlayerRef>(null);

  return (
    <View style={{flex: 1}}>
      <VideoPlayer
        ref={playerRef}
        // endWithThumbnail
        // thumbnail={{
        //   uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
        // }}
        // disableControlsAutoHide
        autoplay={true}
        repeat
        showDuration={true}
        disableFullscreen={Platform.OS == 'android'}
        customStyles={{
          wrapper: {backgroundColor: '#000'},
        }}
        source={{
          uri: 'https://newcntv.qcloudcdn.com/asp/hls/main/0303000a/3/default/2954241d2c084dc05f90b890b53839eb/main.m3u8?maxbr=2048',
        }}
        onError={() => {
          toast.show({description: '播放失败 ...'});
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  view: {
    // backgroundColor: 'white',
  },
  item: {
    backgroundColor: 'white',
    // marginVertical: 5,
    padding: 12,
  },
  note: {
    color: '#333',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'right',
    flex: 1,
  },
});

export default Demo;
