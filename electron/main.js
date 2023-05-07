// main.js

// electron 模块可以用来控制应用的生命周期和创建原生浏览窗口
const { app, BrowserWindow, ipcMain, Menu, MenuItem } = require('electron')
const path = require('path')

let mainWindow

const NODE_ENV = process.env.NODE_ENV
process.env.ELECTRON_ENABLE_SECURITY_WARNINGS = 'true'

const createWindow = () => {
  const { screen } = require('electron')

  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  // 创建浏览窗口
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  ipcMain.handle('ping', () => 'pong')

  // 加载 index.html
  // mainWindow.loadFile('index.html')
  mainWindow.loadURL(
    NODE_ENV === 'development'
      ? 'http://localhost:8080'
      : `file://${path.join(__dirname, '../dist/index.html')}`
  )

  // 打开开发工具
  // mainWindow.webContents.openDevTools()
  // 切换开发工具
  // if (NODE_ENV === 'development') mainWindow.webContents.toggleDevTools()
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // 在 macOS 系统内, 如果没有已开启的应用窗口
    // 点击托盘图标时通常会重新创建一个新窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  const menu = new Menu()
  menu.append(
    new MenuItem({
      label: '复制',
      role: 'copy'
    })
  )
  menu.append(
    new MenuItem({
      label: '粘贴',
      role: 'paste'
    })
  )

  mainWindow.webContents.on('context-menu', (e, params) => {
    menu.popup({ window: mainWindow, x: params.x, y: params.y })
  })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态,
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// 在当前文件中你可以引入所有的主进程代码
// 也可以拆分成几个文件，然后用 require 导入。

// const template = [
//   {
//     role: 'help',
//     label: '帮助'
//   },
//   {
//     role: 'viewMenu',
//     label: '视图',
//     submenu: [
//       {
//         role: 'reload',
//         label: '重新加载'
//       }
//     ]
//   }
// ]

// const menu = Menu.buildFromTemplate(template)
// Menu.setApplicationMenu(menu)
