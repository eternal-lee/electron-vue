# electron_vue

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### electron-icon-builder"

生产图标包

```sh
cnpm i electron-icon-builder --save-dev
```

并在package.json 里面配置命令
--input=图片路径地址 --output=输出图标文件夹

```javascript
"scripts": {
  "electron:generate-icons": "electron-icon-builder --input=./public/logo.png --output=build --flatten",
}
```

### 打包配置

```javascript
"build": {
  "appId": "com.test",
  "productName": "ElectronXXX",
  "copyright": "Copyright © 2024",
  "nsis": {
    "oneClick": false,
    "allowToChangeInstallationDirectory": true,
    "installerIcon": "",  // 安装时图标
    "uninstallerIcon": "",  // 卸载时图标
    "installerHeaderIcon": "", //  // 安装时头部图标
    "createDesktopShortcut": true, // 是否创建桌面图标
    "createStartMenuShortcut": true, // 是否创建开始菜单图标
    "runAfterFinish": true, // 是否安装完成后运行
    "artifactName": "${name}-${version}-setup.${ext}" // 自定义包名称
  },
  // 可以通过配置files字段，来指定将哪些内容进行打包。
  "files": [
    "dist/**/*",
    "electron/**/*"
  ],
  "directories": {
    "buildResources": "build", // 指定打包需要的静态资源，默认是build
    "output": "dist_electron" // 输出文件夹
  },
  "mac": {
    "target": ["dmg", "zip"], //安装包的格式，默认是"dmg"和"zip"
    "icon": "build/icons/icon.icns",
    "dmg": {
      "background": "build/background.jfif",   //安装窗口背景图
      "icon": "build/icons/icon.icns",         //安装图标
      "iconSize": 100,                         //图标的尺寸
      "contents": [                            //安装图标在安装窗口中的坐标信息
        {
          "x": 380,
          "y": 180,
          "type": "link",
          "path": "/Applications"
        },
        {
          "x": 130,
          "y": 180,
          "type": "file"
        }
      ],
      "window": {                             //安装窗口的大小
        "width": 540,
        "height": 380
      }
    }
  },
  "win": {
    "target": [
      {
        "target": "nsis", //安装包的格式，默认是"nsis"
        "arch": [
          "x64",
          "ia32"
        ]
      }
    ],
    "icon": "build/icons/icon.ico"
  },
  "linux": {
    "target": [
      "AppImage",
      "deb",
      "rpm",
      "tar.xz"
    ],
    "icon": "build/icons/icon.ico"
  },
}
```

### remote安装使用

```bash
npm install --save @electron/remote
```

- @electron/remote/main 必须在主进程中初始化，然后才能从渲染器中使用

```javascript
// 在主进程:
require('@electron/remote/main').initialize()
```

- renderer进程中的require('electron').remote必须换成require('@electron/remote')

```javascript
// 在渲染进程

// 之前
const { BrowserWindow } = require('electron').remote

// 之后
const { BrowserWindow } = require('@electron/remote')
```

```txt
注意：由于这需要通过 npm 的模块而不是内置模块，如果您从沙盒进程使用远程，则需要适当地配置您的打包器以在预加载中打包 @electron/remote 的代码。 当然，使用@electron/remote 会使沙箱的效率大大降低。
```

```txt
注意：在 electron >= 14.0.0 中，您必须使用新的启用 API 分别为每个所需的 WebContents 启用远程模块：require("@electron/remote/main").enable(webContents)。

require('@electron/remote/main').enable(subWin.webContents)
subWin.loadURL(URL)
...
```

### Vite升级导致Electron运行报错：caught TypeError: path.join is not a function

```bash
// 安装
npm i vite-plugin-optimizer -D
```

- 解决方案

在vite.config.js中：

```javascript
import optimizer from 'vite-plugin-optimizer'

export default defineConfig({
  plugins: [
    optimizer({
      electron: `const { ipcRenderer } = require('electron'); export { ipcRenderer }`
    }),
    ...
  ],
  ...
}
```

### electron中使用win.hide()再使用win.show()会引起窗口闪烁问题

electron通过点击托盘打开无边框透明窗口闪烁问题解决办法

只需要在主进程文件里面加这一句代码即可：

```javascript
app.commandLine.appendSwitch('wm-window-animations-disabled')
```
