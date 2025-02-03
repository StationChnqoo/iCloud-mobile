# iCloud

## react-native

版本，`0.72.17`，release -> 2024/08/19

## 分页

采用`ChatGPT`的建议，避免混淆，

```java
private List<T> records; // 当前页的数据
private int currentPage; // 当前页数
private int totalPages;  // 总页数
private int totalItems;  // 总数据条数
private boolean hasNextPage; // 是否有下一页
```

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
