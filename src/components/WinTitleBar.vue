<script setup>
import { ref } from 'vue'

defineProps({
  title: {
    type: String,
    default: ''
  },
  isShowLeftSlot: {
    type: Boolean,
    default: true
  },
  isShowRightSlot: {
    type: Boolean,
    default: true
  },
  controls: {
    type: Boolean,
    default: false
  },
  titleBarHeight: {
    type: String,
    default: '42px'
  }
})
let emit = defineEmits(['clickRight'])

var userAgent = navigator.userAgent.toLowerCase()
let isElectron = ref(userAgent.indexOf('electron/') > -1)

function rightHandle() {
  emit('clickRight')
}
</script>

<template>
  <div
    class="titlebar-container"
    :class="!isElectron ? 'isNotElectron' : ''"
    style="overflow: hidden"
  >
    <div class="titlebar-drag-region"></div>
    <div v-if="isShowLeftSlot" class="title_left">
      <slot name="left">
        <img src="./../../electron/icons/icon.ico" class="ico" alt="" />
      </slot>
    </div>
    <div class="title_center">
      <div class="window-title">
        <slot name="default">{{ title }}</slot>
      </div>
    </div>
    <div class="title_right">
      <!-- layout-controls-container show-layout-control -->
      <div
        v-if="isShowRightSlot"
        class="layout-controls-container show-layout-control"
        @click="rightHandle"
      >
        <slot name="right">关于</slot>
      </div>
      <div v-if="controls" class="window-controls-container primary"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@titleBarHeight: v-bind(titleBarHeight);

.titlebar-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  height: @titleBarHeight;
  overflow: hidden;
  background: var(--titlebar-color);
  user-select: none;

  .titlebar-drag-region {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    -webkit-app-region: drag;
  }

  .title_left {
    flex-grow: 2;
    justify-content: flex-start;
    order: 0;
    box-sizing: border-box;
    width: 20%;

    .ico {
      width: 20px;
      height: 20px;
      margin-left: 10px;
    }
  }

  .title_center {
    justify-content: center;
    order: 1;
    box-sizing: border-box;
    width: 60%;
    min-width: 0;
    max-width: fit-content;
    margin: 0 10px;

    .window-title {
      flex: 0 1 auto;
      margin-right: auto;
      margin-left: auto;
      overflow: hidden;
      color: #fff;
      font-size: 12px;
      font-family:
        PingFangSC-Medium,
        PingFang SC;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .title_right {
    display: flex;
    flex-grow: 2;
    align-items: center;
    justify-content: flex-end;
    order: 2;
    box-sizing: border-box;
    width: 20%;
    min-width: min-content;
    height: 100%;
    color: #fff;

    .window-controls-container {
      z-index: 3000;
      display: flex;
      flex-grow: 0;
      flex-shrink: 0;
      width: 0;
      height: 100%;
      text-align: center;
      -webkit-app-region: no-drag;

      &.primary {
        width: calc(138px / var(--zoom-factor, 1));
      }
    }

    .layout-controls-container {
      position: relative;
      z-index: 2500;
      display: none;
      flex-grow: 0;
      flex-shrink: 0;
      min-width: 28px;
      height: 100%;
      margin-left: auto;
      padding-right: 2px;
      text-align: center;
      -webkit-app-region: no-drag;

      &.show-layout-control {
        display: flex;
        align-items: center;
      }
    }
  }

  &.isNotElectron {
    .window-controls-container.primary {
      width: 10px;
    }
  }
}
</style>
