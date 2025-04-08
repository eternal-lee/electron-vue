<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1>Electron + Vue3</h1>
    <p>
      We are using Node.js <span id="node-version"></span>, Chromium
      <span id="chrome-version"></span>, and Electron
      <span id="electron-version"></span>.
    </p>
    <p>
      Current theme source: <strong id="theme-source">{{ themeName }}</strong>
    </p>
    <div v-if="is_electron" class="btns">
      <button class="btn" @click="toggle">Toggle Dark Mode</button>
      <button class="btn" @click="system">Reset to System Theme</button>

      <div class="icon_bg"></div>
    </div>

    <div v-if="is_electron" class="btns">
      <div class="btn min" @click="onElectronOperationWindow('min')">
        最小化
      </div>
      <div class="btn max" @click="onElectronOperationWindow('max')">
        最大化
      </div>
      <div
        class="btn restoreDown"
        @click="onElectronOperationWindow('restoreDown')"
      >
        向下还原
      </div>
      <div class="btn close" @click="onElectronOperationWindow('hide')">
        关闭
      </div>
    </div>

    <div class="skewed-rectangle">
      <div class="left"></div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

let themeName = ref('System')
let is_electron = ref(true)

var userAgent = navigator.userAgent.toLowerCase()
if (userAgent.indexOf('electron/') > -1) {
  is_electron.value = true
} else {
  is_electron.value = false
}

async function toggle() {
  let isDarkMode = await window.darkMode?.toggle()

  themeName.value = isDarkMode ? 'Dark' : 'Light'
}

async function system() {
  await window.darkMode?.system()
  themeName.value = 'System'
}

function onElectronOperationWindow(operationType) {
  if (window.electronAPI) {
    window.electronAPI?.operateWindow(operationType)
  }
}
</script>

<style scoped lang="less">
@media (width >= 1024px) {
  .about {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    min-height: 100vh;
  }
}

.btns {
  margin-bottom: 20px;

  .btn {
    display: inline-block;
    height: 36px;
    margin-right: 8px;
    padding: 0 15px;
    color: #fff;
    line-height: 36px;
    background: #1989fa;
    border: none;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
  }
}

.icon_bg {
  width: 32px;
  height: 32px;
  margin-top: 10px;
  background: var(--icon-bg) no-repeat;
  background-size: 100% 100%;
}

.skewed-rectangle {
  position: relative; /* 设置元素的定位模式为相对定位 */
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  margin-top: 20px;
  overflow: hidden;

  .left,
  .right {
    flex: 1;
    box-sizing: border-box;
    height: 100%;
    border: 0 solid #fff;
  }

  .left {
    border-top: 30px solid #f43f32;
    border-right: 12px solid transparent;
    border-radius: 8px 0 0 8px;
  }

  .right {
    border-bottom: 30px solid #1ab872;
    border-left: 12px solid transparent;
    border-radius: 0 8px 8px 0;
  }
}
</style>
