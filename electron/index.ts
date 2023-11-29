const { app, BrowserWindow, ipcMain, webContents, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
// 判断系统
const isMac = process.platform === 'darwin';

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// 本地启动的vue项目路径
const vueProjectAddress = 'http://localhost:5173';
/**
 * 创建一个新的窗口
 */
const createWindow = () => {
  let win = new BrowserWindow({
    minWidth: 1000,
    minHeight: 600,
    width: 1000,
    height: 600,
    frame: false, // 窗口无边框
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true, // 渲染进程使用Node API
      contextIsolation: false, // 是否开启隔离上下文
    },
  });

  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, '../index.html'));
  } else {
    win.loadURL(vueProjectAddress);
  }
  // win.webContents.openDevTools()

  let videoWin;
  // 打开video窗口
  ipcMain.on('open-video', (e, url: string) => {
    if (videoWin) {
      videoWin.show();
    } else {
      videoWin = new BrowserWindow({
        width: 800,
        height: 500,
        titleBarStyle: 'hidden',
        resizable: false, // 窗口大小是否可以调整
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
        },
      });

      videoWin.on('ready-to-show', () => {
        videoWin.show();
      });

      videoWin.on('close', () => {
        videoWin = null;
      });
    }

    videoWin.loadURL(vueProjectAddress + '/video?url=' + url);
  });

  // 关闭video窗口
  ipcMain.on('close-video', () => {
    videoWin.close();
    videoWin = null;
  });

  // 最小化
  ipcMain.on('minWin', () => {
    win.minimize();
  });

  // 关闭主窗口
  ipcMain.on('close', () => {
    // 关闭软件
    app.quit();
  });

  // 打开dialog
  ipcMain.on('open-dialog', (e, msgInfo: string) => {
    dialog
      .showMessageBox({
        title: '消息提醒',
        defaultId: 0,
        message: `你确定要${msgInfo}?`,
        icon: path.join(__dirname, './images/logo.png'),
        buttons: ['确定', '取消'],
      })
      .then(result => {
        let index = result.response;
        if (index === 0) {
          // 确定按钮
          win.webContents.send('dialog-determine'); // 主进程向渲染进程通信
        }
      });
  });

  let groupEditWin;
  // 打开群编辑窗口
  ipcMain.on('open-group-edit', (e, id: string) => {
    if (groupEditWin) {
      groupEditWin.show();
    } else {
      groupEditWin = new BrowserWindow({
        width: 300,
        height: 550,
        titleBarStyle: 'hidden',
        minimizable: false,
        maximizable: false,
        fullscreenable: false,
        show: false,
        resizable: false,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
        },
      });
      groupEditWin.setWindowButtonVisibility(false); // mac中红绿灯隐藏

      groupEditWin.on('ready-to-show', () => {
        groupEditWin.show();
      });

      groupEditWin.on('close', () => {
        groupEditWin = null;
      });
    }

    groupEditWin.loadURL(vueProjectAddress + '/edit/group?id=' + id);
  });

  // 群主将群成员踢出群聊
  ipcMain.on('del-group-user', () => {
    win.webContents.send('del-group-user');
  });

  // 关闭群编辑窗口
  ipcMain.on('close-group-edit', () => {
    groupEditWin.close();
    groupEditWin = null;
  });

  // 保存群编辑按钮
  ipcMain.on('update-success', (e, groupName: string) => {
    groupEditWin.close();
    groupEditWin = null;
    win.webContents.send('update-success', groupName);
  });

  let aboutWin;
  // 打开关于歪fChat窗口
  ipcMain.on('open-about', () => {
    if (aboutWin) {
      aboutWin.show();
    } else {
      aboutWin = new BrowserWindow({
        width: 650,
        height: 500,
        titleBarStyle: 'hidden',
        minimizable: false,
        maximizable: false,
        fullscreenable: false,
        show: false,
        resizable: false,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
        },
      });

      aboutWin.on('ready-to-show', () => {
        aboutWin.show();
      });

      aboutWin.on('close', () => {
        aboutWin = null;
      });
    }

    aboutWin.loadURL(vueProjectAddress + '/about');
  });

  // 关闭关于窗口
  ipcMain.on('close-about', () => {
    aboutWin.close();
    aboutWin = null;
  });

  // 读取markdown文件
  ipcMain.on('read-file', async e => {
    let dir = path.resolve(__dirname, isMac ? '../src/views/About/WaiFChat.md' : '..\\src\\views\\About\\WaiFChat.md');
    let str = await fs.readFileSync(dir, 'utf-8');
    aboutWin.webContents.send('read-file', str);
  });

  let webviewWin;
  // 打开webview窗口
  ipcMain.on('open-webview', (e, url: string) => {
    const { screen } = require('electron');
    const { height } = screen.getPrimaryDisplay().workAreaSize; // 获取设备高度
    if (webviewWin) {
      webviewWin.show();
    } else {
      webviewWin = new BrowserWindow({
        width: 750,
        height: height,
        minWidth: 750,
        minHeight: height,
        titleBarStyle: 'hiddenInset',
        show: false,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          webviewTag: true, // 启用webview
        },
      });

      webviewWin.on('ready-to-show', () => {
        webviewWin.show();
      });

      webviewWin.on('close', () => {
        webviewWin = null;
      });
    }

    webviewWin.loadURL(vueProjectAddress + '/webview?url=' + url);
  });

  // 关闭webview窗口
  ipcMain.on('close-webview', () => {
    webviewWin.close();
    webviewWin = null;
  });

  let telephoneWin;
  // 打开通话窗口(语音, 视频都是共用一个窗口)
  ipcMain.on('open-telephone', (e: any, {}) => {});

  let screenChooseWin;
  // 打开选择屏幕共享窗口
  ipcMain.on('open-screen-choose', (e, { type, url }) => {
    if (screenChooseWin) {
      screenChooseWin.show();
    } else {
      screenChooseWin = new BrowserWindow({
        width: 800,
        height: 600,
        // minWidth: 480,
        // minHeight: 540,
        titleBarStyle: 'hiddenInset',
        minimizable: false,
        maximizable: false,
        // fullscreenable: false, // 是否可以全屏
        show: false,
        // resizable: false, // 是否可以调整窗口大小
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
        },
      });
      screenChooseWin.setWindowButtonVisibility(false);
      // screenChooseWin.setPosition(0, 0) // 设置窗口位置

      screenChooseWin.on('ready-to-show', () => {
        screenChooseWin.show();
      });

      screenChooseWin.on('close', () => {
        screenChooseWin = null;
      });
    }

    screenChooseWin.loadURL(vueProjectAddress + url);
  });

  let screenShareSendWin;
  // 打开屏幕共享窗口(发送方)
  ipcMain.on('open-screen-share-send', (e, { type, url }) => {
    if (screenShareSendWin) {
      screenShareSendWin.show();
    } else {
      screenShareSendWin = new BrowserWindow({
        width: 200,
        height: 150,
        titleBarStyle: 'hidden',
        minimizable: false,
        maximizable: false,
        fullscreenable: false,
        show: false,
        resizable: false,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
        },
      });
      screenShareSendWin.setWindowButtonVisibility(false);

      screenShareSendWin.on('ready-to-show', () => {
        screenShareSendWin.show();
      });

      screenShareSendWin.on('close', () => {
        screenShareSendWin = null;
      });
    }

    screenShareSendWin.loadURL(vueProjectAddress + url);
  });

  let screenShareReceiveWin;
  // 打开屏幕共享窗口(接收方)
  ipcMain.on('open-screen-share-receive', (e, { type, url }) => {
    if (screenShareReceiveWin) {
      screenShareReceiveWin.show();
    } else {
      screenShareReceiveWin = new BrowserWindow({
        width: 1000,
        height: 800,
        minWidth: 1000,
        minHeight: 800,
        titleBarStyle: 'hidden',
        show: false,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
        },
      });

      screenShareReceiveWin.on('ready-to-show', () => {
        screenShareReceiveWin.show();
      });

      screenShareReceiveWin.on('close', () => {
        screenShareReceiveWin = null;
      });
    }

    screenShareReceiveWin.loadURL(vueProjectAddress + url);
  });

  // 退出登陆关闭所有子窗口
  ipcMain.on('logout', () => {
    // 关闭所有子窗口
    BrowserWindow.getAllWindows().forEach(window => {
      if (window === win) return;
      window.close();
    });
  });
};

// 打开窗口
app.whenReady().then(() => {
  createWindow(); // 创建窗口

  app.on('activate', () => {
    // if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });
});

// 关闭窗口
app.on('window-all-closed', () => {
  app.quit();
  // if (process.platform !== "darwin") {
  //   app.quit()
  // }
});
