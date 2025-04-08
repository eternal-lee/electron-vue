<template>
  <div class="login">
    <WinTitleBar title="登录" @clickRight="closeWin">
      <template #right>
        <i class="icon_close">
          <iconClose />
        </i>
      </template>
    </WinTitleBar>
    <div class="main">
      <div class="btn" @click="loginIn">登录</div>
    </div>
  </div>
</template>

<script setup>
import WinTitleBar from '../components/WinTitleBar.vue'
import iconClose from '@/components/icons/iconClose.vue'

function closeWin() {
  window.electronAPI?.exitLoginWin()
}
function loginIn() {
  window.electronAPI?.loginWindow()
}
</script>

<style lang="less" scoped>
.login {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .icon_close {
    padding-right: 10px;
    color: #fff;
  }

  .main {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

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
</style>
