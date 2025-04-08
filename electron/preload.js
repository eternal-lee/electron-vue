window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})

const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system')
})

contextBridge.exposeInMainWorld('electronAPI', {
  operateWindow: opeType => ipcRenderer.send('operate-window', opeType),
  openVersionWin: type => ipcRenderer.send('open-version-win', type),
  loginWindow: () => ipcRenderer.send('login-window'),
  exitLoginWin: () => ipcRenderer.send('exit-login-win')
})
