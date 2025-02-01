# iCloud

## react-native

版本，`0.72.17`，release -> 2024/08/19

## 打包

### Android

```bash
cd android && ./gradlew assembleRelease -PappName=iCloud -PpackageName=net.cctv3.iCloud.release && cd ..

cd android && ./gradlew assembleDebug -PappName=DebugiCloud -PpackageName=net.cctv3.iCloud.debug && cd ..
```

### 清除缓存

```sh
cd android && ./gradlew clean && ./gradlew --stop && rm -r ~/.gradle/caches
```
