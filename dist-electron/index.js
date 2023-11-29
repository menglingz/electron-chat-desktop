"use strict";
const { app, BrowserWindow, ipcMain, webContents, dialog } = require("electron");
const path = require("path");
const fs = require("fs");
const isMac = process.platform === "darwin";
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
const vueProjectAddress = "http://localhost:5173";
const createWindow = () => {
  let win = new BrowserWindow({
    minWidth: 1e3,
    minHeight: 600,
    width: 1e3,
    height: 600,
    frame: false,
    // 窗口无边框
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
      // 渲染进程使用Node API
      contextIsolation: false
      // 是否开启隔离上下文
    }
  });
  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, "../index.html"));
  } else {
    win.loadURL(vueProjectAddress);
  }
  let videoWin;
  ipcMain.on("open-video", (e, url) => {
    if (videoWin) {
      videoWin.show();
    } else {
      videoWin = new BrowserWindow({
        width: 800,
        height: 500,
        titleBarStyle: "hidden",
        resizable: false,
        // 窗口大小是否可以调整
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
        }
      });
      videoWin.on("ready-to-show", () => {
        videoWin.show();
      });
      videoWin.on("close", () => {
        videoWin = null;
      });
    }
    videoWin.loadURL(vueProjectAddress + "/video?url=" + url);
  });
  ipcMain.on("close-video", () => {
    videoWin.close();
    videoWin = null;
  });
  ipcMain.on("minWin", () => {
    win.minimize();
  });
  ipcMain.on("close", () => {
    app.quit();
  });
  ipcMain.on("open-dialog", (e, msgInfo) => {
    dialog.showMessageBox({
      title: "消息提醒",
      defaultId: 0,
      message: `你确定要${msgInfo}?`,
      icon: path.join(__dirname, "./images/logo.png"),
      buttons: ["确定", "取消"]
    }).then((result) => {
      let index = result.response;
      if (index === 0) {
        win.webContents.send("dialog-determine");
      }
    });
  });
  let groupEditWin;
  ipcMain.on("open-group-edit", (e, id) => {
    if (groupEditWin) {
      groupEditWin.show();
    } else {
      groupEditWin = new BrowserWindow({
        width: 300,
        height: 550,
        titleBarStyle: "hidden",
        minimizable: false,
        maximizable: false,
        fullscreenable: false,
        show: false,
        resizable: false,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
        }
      });
      groupEditWin.setWindowButtonVisibility(false);
      groupEditWin.on("ready-to-show", () => {
        groupEditWin.show();
      });
      groupEditWin.on("close", () => {
        groupEditWin = null;
      });
    }
    groupEditWin.loadURL(vueProjectAddress + "/edit/group?id=" + id);
  });
  ipcMain.on("del-group-user", () => {
    win.webContents.send("del-group-user");
  });
  ipcMain.on("close-group-edit", () => {
    groupEditWin.close();
    groupEditWin = null;
  });
  ipcMain.on("update-success", (e, groupName) => {
    groupEditWin.close();
    groupEditWin = null;
    win.webContents.send("update-success", groupName);
  });
  let aboutWin;
  ipcMain.on("open-about", () => {
    if (aboutWin) {
      aboutWin.show();
    } else {
      aboutWin = new BrowserWindow({
        width: 650,
        height: 500,
        titleBarStyle: "hidden",
        minimizable: false,
        maximizable: false,
        fullscreenable: false,
        show: false,
        resizable: false,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
        }
      });
      aboutWin.on("ready-to-show", () => {
        aboutWin.show();
      });
      aboutWin.on("close", () => {
        aboutWin = null;
      });
    }
    aboutWin.loadURL(vueProjectAddress + "/about");
  });
  ipcMain.on("close-about", () => {
    aboutWin.close();
    aboutWin = null;
  });
  ipcMain.on("read-file", async (e) => {
    let dir = path.resolve(__dirname, isMac ? "../src/views/About/WaiFChat.md" : "..\\src\\views\\About\\WaiFChat.md");
    let str = await fs.readFileSync(dir, "utf-8");
    aboutWin.webContents.send("read-file", str);
  });
  let webviewWin;
  ipcMain.on("open-webview", (e, url) => {
    const { screen } = require("electron");
    const { height } = screen.getPrimaryDisplay().workAreaSize;
    if (webviewWin) {
      webviewWin.show();
    } else {
      webviewWin = new BrowserWindow({
        width: 750,
        height,
        minWidth: 750,
        minHeight: height,
        titleBarStyle: "hiddenInset",
        show: false,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          webviewTag: true
          // 启用webview
        }
      });
      webviewWin.on("ready-to-show", () => {
        webviewWin.show();
      });
      webviewWin.on("close", () => {
        webviewWin = null;
      });
    }
    webviewWin.loadURL(vueProjectAddress + "/webview?url=" + url);
  });
  ipcMain.on("close-webview", () => {
    webviewWin.close();
    webviewWin = null;
  });
  ipcMain.on("open-telephone", (e, {}) => {
  });
  let screenChooseWin;
  ipcMain.on("open-screen-choose", (e, { type, url }) => {
    if (screenChooseWin) {
      screenChooseWin.show();
    } else {
      screenChooseWin = new BrowserWindow({
        width: 800,
        height: 600,
        // minWidth: 480,
        // minHeight: 540,
        titleBarStyle: "hiddenInset",
        minimizable: false,
        maximizable: false,
        // fullscreenable: false, // 是否可以全屏
        show: false,
        // resizable: false, // 是否可以调整窗口大小
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
        }
      });
      screenChooseWin.setWindowButtonVisibility(false);
      screenChooseWin.on("ready-to-show", () => {
        screenChooseWin.show();
      });
      screenChooseWin.on("close", () => {
        screenChooseWin = null;
      });
    }
    screenChooseWin.loadURL(vueProjectAddress + url);
  });
  let screenShareSendWin;
  ipcMain.on("open-screen-share-send", (e, { type, url }) => {
    if (screenShareSendWin) {
      screenShareSendWin.show();
    } else {
      screenShareSendWin = new BrowserWindow({
        width: 200,
        height: 150,
        titleBarStyle: "hidden",
        minimizable: false,
        maximizable: false,
        fullscreenable: false,
        show: false,
        resizable: false,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
        }
      });
      screenShareSendWin.setWindowButtonVisibility(false);
      screenShareSendWin.on("ready-to-show", () => {
        screenShareSendWin.show();
      });
      screenShareSendWin.on("close", () => {
        screenShareSendWin = null;
      });
    }
    screenShareSendWin.loadURL(vueProjectAddress + url);
  });
  let screenShareReceiveWin;
  ipcMain.on("open-screen-share-receive", (e, { type, url }) => {
    if (screenShareReceiveWin) {
      screenShareReceiveWin.show();
    } else {
      screenShareReceiveWin = new BrowserWindow({
        width: 1e3,
        height: 800,
        minWidth: 1e3,
        minHeight: 800,
        titleBarStyle: "hidden",
        show: false,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
        }
      });
      screenShareReceiveWin.on("ready-to-show", () => {
        screenShareReceiveWin.show();
      });
      screenShareReceiveWin.on("close", () => {
        screenShareReceiveWin = null;
      });
    }
    screenShareReceiveWin.loadURL(vueProjectAddress + url);
  });
  ipcMain.on("logout", () => {
    BrowserWindow.getAllWindows().forEach((window) => {
      if (window === win)
        return;
      window.close();
    });
  });
};
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
  });
});
app.on("window-all-closed", () => {
  app.quit();
});
