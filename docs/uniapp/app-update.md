# 应用更新

在这里我们讨论的应用更新指的是应用内触发的更新，分为两种：`热更新`和`整包更新`。

## 热更新

热更新中，安卓和苹果的实现方式是一样的，最主要的操作是：`下载更新包`和`安装更新包`，对应的方法为`plus.downloader.createDownload()`和`plus.runtime.install()`。

```js{3,14,32}
plus.nativeUI.showWaiting("正在更新...");

let downloader = plus.downloader.createDownload(
  "http://192.168.1.1/download/my-app.wgt", // 更新包的下载地址（别用localhost）
  {
    filename: "_doc/update/my-app.wgt",
  },
  function (data, status) {
    if (status == 200) {
      plus.nativeUI.closeWaiting();
      plus.nativeUI.showWaiting("安装文件...");

      // 安装更新包
      plus.runtime.install(
        data.filename,
        { force: true }, // 这是安装选项，force表示强制安装（不校验版本）
        function () {
          plus.nativeUI.closeWaiting();
          plus.nativeUI.alert("应用资源更新完成！", function () {
            plus.runtime.restart(); // 重启应用
          });
        },
        function (e) {
          plus.nativeUI.closeWaiting();
        }
      );
    }
    plus.nativeUI.closeWaiting();
  }
);

downloader.start(); // 开始下载
```

## 整包更新

整包更新中，安卓和苹果的操作略有不同，主要区别在于安卓只需要提供下载 apk 的地址就行，而苹果需要`跳转到appstore`进行下载。

:::tip
因为苹果需要跳转到 appstore，所以导致其更新需要连接公网。
:::

### 安卓

安卓的整包更新其实和热更新差不多，只是下载的包变为了 apk 文件而已。

```js{3,14,32}
plus.nativeUI.showWaiting("正在更新...");

let downloader = plus.downloader.createDownload(
  "http://192.168.1.1/download/my-app.apk", // 下载地址（别用localhost）
  {
    filename: "_doc/update/my-app.apk",
  },
  function (data, status) {
    if (status == 200) {
      plus.nativeUI.closeWaiting();
      plus.nativeUI.showWaiting("安装文件...");

      // 安装更新包
      plus.runtime.install(
        data.filename,
        { force: true }, // 这是安装选项，force表示强制安装（不校验版本）
        function () {
          plus.nativeUI.closeWaiting();
          plus.nativeUI.alert("应用资源更新完成！", function () {
            plus.runtime.restart(); // 重启应用
          });
        },
        function (e) {
          plus.nativeUI.closeWaiting();
        }
      );
    }
    plus.nativeUI.closeWaiting();
  }
);

downloader.start(); // 开始下载
```

### 苹果

苹果的更新需要跳转到 appstore。

```js
plus.runtime.launchApplication(
  {
    action: `itms-apps://itunes.apple.com/cn/app/id${Apple ID}?mt=8`,
  },
  function (e) {} // 错误时触发
);
```

:::tip
Apple ID 可以到 [苹果 app 管理](https://appstoreconnect.apple.com/apps) 查看。
:::
