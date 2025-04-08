const { app, BrowserWindow, Menu, ipcMain, nativeTheme } = require('electron')
const path = require('node:path')
const { isPackaged, codeWindow } = require('./window')

// remote 初始化
require('@electron/remote/main').initialize()
const menuTemplate = [
  {
    label: '打开控制台',
    click: () => {
      mainWin.webContents.openDevTools()
      // 通过IPC向渲染进程发送打开控制台的信号
      mainWin.webContents.send('open-console')
    }
  },
  {
    label: '编辑',
    submenu: [
      // role按角色进行配置
      { label: '撤销', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
      { label: '重做', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
      { type: 'separator' },
      { label: '剪切', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
      { label: '复制', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
      { label: '粘贴', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
      { label: '删除', role: 'delete' },
      { label: '全选', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
    ]
  },
  {
    label: '文件',
    submenu: [
      //role配置快捷键
      {
        label: '新建',
        accelerator: 'ctrl+n',
        click: () => {
          console.log('新建文件')
        }
      },
      {
        label: '打开',
        accelerator: 'ctrl+o',
        click: () => {
          console.log('打开文件')
        }
      },
      //分割线
      { type: 'separator' },
      {
        label: '保存',
        accelerator: 'ctrl+s',
        click: () => {
          console.log('保存文件')
        }
      }
    ]
  },
  ,
  {
    label: '关于',
    submenu: [
      {
        label: '关于',
        click: () => {
          createVersionWindow()
        }
      },
      { label: '控制台', role: 'toggleDevTools' },
      { label: '退出', accelerator: 'ctrl+Esc', role: 'quit' },
      { label: '全屏', accelerator: 'ctrl+F11', role: 'togglefullscreen' }
    ]
  }
]

// 禁止显示主菜单
Menu.setApplicationMenu(null)

let loginWin = null
let mainWin = null
let winUrl = 'http://localhost:8089/'
let tray = null
// 版本说明
let versionWin = null

if (isPackaged) {
  winUrl = `file://${path.join(__dirname, '../dist/index.html')}`
}
// 初始化
function initWin() {
  loginWin = null
  mainWin = null
  tray = null
  // 版本说明
  versionWin = null
}
// 主页窗口
function createWindow() {
  mainWin = codeWindow.createWindow(
    {
      minWidth: 320,
      minHeight: 540,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      },
      // 标题栏样式为隐藏
      titleBarStyle: 'hidden',
      // 显示系统自带窗口控制按钮
      titleBarOverlay: {
        color: nativeTheme.shouldUseDarkColors ? '#000' : '#fff',
        height: 40,
        symbolColor: nativeTheme.shouldUseDarkColors ? '#fff' : '#000'
      }
    },
    winUrl
  )
  // 监听右键事件
  mainWin.webContents.on('context-menu', (e, params) => {
    //阻止当前窗口默认事件
    e.preventDefault()
    const menu = Menu.buildFromTemplate(menuTemplate)
    menu.popup({ window: mainWin })
  })
  // 在渲染进程中监听'open-console'信号并打开控制台
  ipcMain.on('open-console', () => {
    mainWin.webContents.openDevTools()
  })

  // 创建系统托盘
  const homeIcon = codeWindow.iconPathUrl('./icons/home.png', 12)
  const exitIcon = codeWindow.iconPathUrl('./icons/exit.png', 12)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '显示主界面',
      icon: homeIcon,
      click: () => {
        mainWin.show()
      }
    },
    {
      type: 'separator' // 这里是横线
    },
    {
      label: '关闭桌面应用',
      icon: exitIcon,
      click: () => {
        mainWin.destroy() // 强制关闭窗口, 除了closed之外，close，unload 和 beforeunload 都不会被触发
        mainWin = null
        app.exit() // 所有窗口都将立即被关闭，而不询问用户
      }
    }
  ])

  tray = codeWindow.createTray({
    iconUrl: './icons/icon.png',
    toolTip: 'Electron + Vue3客户端',
    contextMenu
  })

  tray.on('click', () => {
    mainWin.isVisible() ? mainWin.hide() : mainWin.show()
  })

  // 主窗口关闭时阻止其默认行为
  mainWin.on('close', event => {
    event.preventDefault()
    mainWin.hide()
    mainWin.webContents.closeDevTools()
  })
}
// 登录窗口
function createLoginWindow() {
  // 创建一个新的浏览器窗口
  const loginWin = codeWindow.createWindow(
    {
      width: 400,
      height: 300,
      maximizable: false,
      frame: false,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    },
    winUrl + '#/login'
  )

  return loginWin
}
// 版本说明窗口
function createVersionWindow() {
  versionWin = codeWindow.createWindow(
    {
      width: 400,
      height: 300,
      resizable: false, // 是否可以自己调整窗口大小
      maximizable: false, // 禁止最大化
      parent: mainWin, // 父窗口
      modal: true, // 开启父窗口 true: 会导致父窗口无法拖动
      backgroundColor: '#fff',
      hasShadow: false,
      frame: false, // 禁用默认边框
      show: false
    },
    winUrl + '#/version'
  )
  require('@electron/remote/main').enable(versionWin.webContents)

  versionWin.on('ready-to-show', () => {
    versionWin.show()
  })

  // 监听右键事件
  versionWin.webContents.on('context-menu', (e, params) => {
    //阻止当前窗口默认事件
    e.preventDefault()
  })

  versionWin.on('closed', () => {
    versionWin = null
  })
}

// 监听文件更改并自动 刷新
app.on('did-finish-load', () => {
  mainWin.webContents.reloadIgnoringCache()
})

app.whenReady().then(() => {
  // 创建登录窗口
  loginWin = createLoginWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      loginWin = createLoginWindow()
    }
  })
})

// 登录成功
ipcMain.on('login-window', async () => {
  await closeLoginWin()
  await createWindow()

  // 消息通知
  codeWindow.createNotify({
    iconUrl: './icons/icon.ico',
    title: 'Basic Notification',
    body: 'Notification from the Main process登录成功!',
    duration: 2500
  })
})
// 退出登录窗口
ipcMain.on('exit-login-win', () => {
  closeLoginWin()
  app.quit()
})
// 关闭登录窗口
function closeLoginWin() {
  loginWin.hide()
  loginWin.close()
  loginWin = null
}

// 主题色 切换注册
ipcMain.handle('dark-mode:toggle', () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = 'light'
  } else {
    nativeTheme.themeSource = 'dark'
  }
  codeWindow.justSysColor(mainWin)
  return nativeTheme.shouldUseDarkColors
})

ipcMain.handle('dark-mode:system', () => {
  nativeTheme.themeSource = 'system'
  codeWindow.justSysColor(mainWin)
})

// 接受渲染进程  操作窗口 通知
ipcMain.on('operate-window', (event, opeType) => {
  if (!mainWin) return
  switch (opeType) {
    case 'max': // 窗口最大化
      mainWin.maximize()
      break
    case 'min': // 窗口最小化
      mainWin.minimize()
      break
    case 'restoreDown': // 窗口向下还原
      mainWin.unmaximize() // 当窗口最大化退出状态触发
      break
    case 'hide': // 窗口隐藏
      mainWin.hide()
      break
    case 'exit': // 窗口关闭
      app.quit()
      mainWin = null
      break
  }
})

ipcMain.on('open-version-win', () => {
  createVersionWindow()
})

// electron限制只能打开一个软件窗口
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 当运行第二个实例时,将会聚焦到mainWindow这个窗口
    if (loginWin && !loginWin.isVisible()) {
      return loginWin.show()
    }
    if (mainWin) {
      if (mainWin.isMaximized()) mainWin.restore() // 当窗口从最小化还原触发
      if (mainWin.isMinimized()) mainWin.unmaximize() // 当窗口最大化退出状态触发
      mainWin.focus()
      mainWin.show()
      return
    }
  })
}

app.on('close', () => {
  initWin()
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
