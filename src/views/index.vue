<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './../components/HelloWorld.vue'
import WinTitleBar from '../components/WinTitleBar.vue'

let title = document.title

function clickRight() {
  window.electronAPI?.openVersionWin()
}
</script>

<template>
  <div class="wrapper" style="overflow: hidden">
    <WinTitleBar :title="title" :controls="true" @clickRight="clickRight" />
    <main id="main">
      <div class="section">
        <img
          alt="Vue logo"
          class="logo"
          src="@/assets/logo.svg"
          width="125"
          height="125"
        />

        <div class="navBox">
          <HelloWorld msg="You did it!" />

          <div class="nav">
            <RouterLink to="/home">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
          </div>
        </div>
      </div>

      <RouterView />
    </main>
  </div>
</template>

<style scoped lang="less">
@import url('@/assets/main.less');
</style>
