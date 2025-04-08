const {
  app,
  BrowserWindow,
  nativeTheme,
  Tray,
  nativeImage,
  Notification
} = require('electron')
const path = require('node:path')

class CodeWindow {
  constructor() {
    this._win = null
    this._tray = null
  }

  // 图片路径
  iconPathUrl(url, size = '') {
    if (!url) return ''
    let iconImg = nativeImage.createFromPath(path.join(__dirname, url))
    if (size) {
      iconImg = iconImg.resize({
        with: size,
        height: size
      })
    }
    return iconImg
  }

  // 桌面图标
  getDeskTopIcon(iconUrl = '') {
    return this.iconPathUrl(iconUrl)
  }
  // 创建窗口
  createWindow(opts = {}, url) {
    this._win = new BrowserWindow({
      width: 800,
      height: 600,
      icon: opts.iconUrl || 'electron/icons/icon.ico', // 任务栏图标
      backgroundColor: nativeTheme.shouldUseDarkColors ? '#181818' : '#fff',
      frame: true, // 禁用默认边框
      transparent: false, // 禁用透明度
      webPreferences: {
        nodeIntegration: true, // 解决require is not defined问题
        enableRemoteModule: true, // 使用remote模块
        contextIsolation: false,
        ...opts.webPreferences
      },
      // 标题栏样式为隐藏
      titleBarStyle: 'hidden',
      ...opts
    })
    this._win.loadURL(url)

    return this._win
  }
  // 创建系统托盘
  createTray(opts = {}) {
    this._tray = new Tray(this.iconPathUrl(opts.iconUrl))

    this._tray.setToolTip(opts.toolTip)
    this._tray.setContextMenu(opts.contextMenu)

    return this._tray
  }

  registerListeners() {
    this._win.on('close', () => {
      this._win?.destroy()
      this._win = null
    })
  }

  // 消息通知
  createNotify(opts = {}) {
    let notify = new Notification({
      title: opts.title,
      body: opts.body,
      icon: this.iconPathUrl(opts.iconUrl)
    })
    notify.show()

    if (opts.duration) {
      let timer = setTimeout(() => {
        notify.close()
        timer = null
      }, opts.duration)
    }
  }

  // 判断系统颜色
  justSysColor(win) {
    if (nativeTheme.shouldUseDarkColors) {
      win.setTitleBarOverlay({
        color: 'rgba(0,0,0,0)',
        height: 40,
        symbolColor: 'white'
      })
    } else {
      win.setTitleBarOverlay({
        color: '#4d4d4f',
        height: 40,
        symbolColor: '#fff'
      })
    }
  }
}

const codeWindow = new CodeWindow()

// 是否是生产环境
const isPackaged = app.isPackaged
module.exports = { codeWindow, isPackaged }
