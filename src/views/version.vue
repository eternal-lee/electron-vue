<script setup>
import iconClose from '@/components/icons/iconClose.vue'
import WinTitleBar from '@/components/WinTitleBar.vue'
import { getCurrentWindow } from '@electron/remote'
import dayjs from 'dayjs'
import Clipboard from 'clipboard'

function closeWin() {
  getCurrentWindow().hide() // 先隐藏在关闭，避免闪烁
  getCurrentWindow().close()
}

var clipboard = new Clipboard('[data-clipboard-copy]', {
  text: () => {
    let txt = document.querySelector('#info').innerText
    return txt
  }
})
clipboard.on('success', function (e) {
  e.clearSelection()
  console.info('Copied!')
  closeWin()
})
clipboard.on('error', function (e) {
  console.error(e.action, 'Failed!')
})
</script>

<template>
  <div class="version">
    <WinTitleBar @clickRight="closeWin">
      <template #left>electron-vue3_关于</template>
      <template #right>
        <i class="icon_close">
          <iconClose />
        </i>
      </template>
    </WinTitleBar>
    <div class="version_info" id="info">
      <p>版本: ElectronVueDev-0.0.1-setup (user setup)</p>
      <p>提交: 74f6148eb9ea00507ec113ec51c489d6ffb4b771</p>
      <p>日期: {{ dayjs().format('YYYY-MM-DDTHH:mm:ss') }}</p>
      <p>电子: 29.1.64</p>
      <p>ElectronBuildId: 21893604</p>
      <p>Chromium: 108.0.5359.215</p>
      <p>Node.js: 18.16.0</p>
      <p>V8: 10.8.168.25-electron.0</p>
      <p>OS: Windows_NT x64 10.0.22000</p>
    </div>
    <div class="btns">
      <div class="btn copy" data-clipboard-copy>复制</div>
      <div class="btn confirm" @click="closeWin">确认</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.version {
  min-height: 100%;
  background: #fff;

  :deep(.titlebar-container) {
    background: #fff;

    .title_left {
      padding-left: 10px;
      color: #333;
      font-family: PingFangSC-Medium, 'PingFang SC';
    }

    .title_right .layout-controls-container {
      height: 100%;
      padding: 0 9px;

      .icon_close {
        color: #333;
      }

      &:hover {
        background: rgba(255, 0, 0, 30%);
        border-bottom-left-radius: 8px;

        .icon_close {
          color: #fff;
        }
      }
    }
  }

  .version_info {
    padding: 0 30px;
    color: #333;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.6;
    user-select: none;
  }

  .btns {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    padding-right: 10px;

    .btn {
      display: inline-block;
      box-sizing: border-box;
      height: 36px;
      padding: 0 15px;
      overflow: hidden;
      color: #333;
      line-height: 36px;
      background: #fff;
      border: none;
      border-radius: 4px;
      outline: none;
      cursor: pointer;

      &:hover {
        color: #fff;
        background: rgba(25, 137, 250, 50%);
        border: 1px solid #1989fa;
      }
    }

    .copy {
      margin-right: 8px;
      border: 1px solid #1989fa;
    }

    .confirm {
      border: 1px solid #dedede;
    }
  }
}
</style>
