"use client";

const { app, BrowserWindow } = require("electron");
const { join } = require("path");
const { format } = require("url");
const isDev = require("electron-is-dev");
const prepareNext = require("electron-next");

const createWindow = async () => {
  await prepareNext("./");

  // ブラウザウインドウを作成する
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, "preload.js"),
    },
  });

  const url = isDev
    ? "http://localhost:8000/"
    : format({
        pathname: join(__dirname, "../out/index.html"),
        protocol: "file",
        slashes: true,
      });

  // アプリのindex.htmlを読み込む
  mainWindow.loadURL(url);
  // mainWindow.webContents.openDevTools();
};

// Electronを初期化しブラウザウインドウの作成準備が完了した時に実行される
app.on("ready", async () => {
  await createWindow();

  app.on("activate", async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow();
    }
  });
});

// macOSを除き、全ウインドウが閉じられた時に実行される
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
