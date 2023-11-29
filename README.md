## 歪fchat桌面端

### 项目介绍
前端采用 <span style="color: skyblue;">vue3 + ts + vite + electron + element-plus + socket-io + webrtc</span>, 后端使用 <span style="color: skyblue;">express + socketio + mongodb</span>

### 实现功能
1. 用户登陆、注册、退出登陆
2. 群聊、私聊（群聊在h5基础上新增消息未读数）功能
3. 消息类型新增：视频通话、上传视频、支持不同类型文件(如.zip, .exe, .docx…)的上传，发送markdown类型的消息并做了消息类型界面的优化
4. 🌟<span style="color: skyblue;">主要新增功能：wbertc实现视频通话、屏幕共享功能</span>
5. 添加好友、创建群聊、对群成员的管理
6. 搜索好友、群
7. 用户个人资料的编辑
8. 发布空调动态（对比h5端新增点赞，评论回复功能）
8. 发布空间动态（对比h5端新增点赞，评论回复功能）
9. 便签功能（所有人均可见）
10. 主题色（深浅变换）

### 启动项目
1. 安装node
```
node -v 检查node版本
```
开发版本 v18.12.1

2. 安装依赖
```
npm install
```

3. 运行项目
```
npm run dev
```

4. 温馨提示: 项目运行前需要运行后端代码  
`代码地址: https://gitee.com/wifi-skew-f/weif-chat-desktop-backend`

5. 由于`vue3-video-play`第三方组件作者把他自己的包名引错了的原因, 需要启动项目, 还需要在`npm i`后, 在`node_modules`中找到`vue3-video-play`目录, 将目录下的`package.json`文件中的内容进行修改, 修改结果如下
```
"main": "./dist/index.umd.js",
"module": "./dist/index.es.js"
```

或者, 请查看`dist`目录下的文件名(请按照具体文件名进行更改)
```
"main": "./dist/index.umd.js",
"module": "./dist/index.mjs"
```

6. 打包: 执行`npm run dist`失败, 如下情况是因为网速过慢导致, 需要更改镜像源
```
 • packaging       platform=darwin arch=x64 electron=25.9.4 appOutDir=dist/mac
  ⨯ Get "https://github.com/electron/electron/releases/download/v25.9.4/electron-v25.9.4-darwin-x64.zip": EOF
github.com/develar/app-builder/pkg/download.(*Downloader).follow.func1
```

```
//将 Electron 镜像源设置为淘宝镜像源
npm config set ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/
//将 Electron-builder 镜像源设置为淘宝镜像源
npm config set ELECTRON_BUILDER_BINARIES_MIRROR=http://npm.taobao.org/mirrors/electron-builder-binaries/
```

7. 项目问题: 因为开发用的是mac, 电脑装的win10虚拟机后端是可以正常跑的, 貌似win和mac的文件路径不一样, 导致无法正常上传文件(上传图片应该可以用), 抽空我会找个win调试一下。

8. 项目的视频通话等功能还在开发中...