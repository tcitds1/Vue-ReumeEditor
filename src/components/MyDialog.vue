<template>
  <!-- //用户登录注册容器-->
  <div class="dialogWrapper" v-show="visible">
      <div class="wrapper" @click="close"></div>
      <div class="dialog">
          <main>
              <slot></slot>
          </main>
      </div>
  </div>
</template>

<script>
export default {
  name: 'MyDialog',
  //父子间通信数据
  props: ['title', 'visible'],
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
  .wrapper {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .dialogWrapper {
    position: fixed;
    background: hsla(0,0%,40%,0.5);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dialog {
      background: white;
      min-height: 4em;
      min-width: 10em;
      > header {
          padding: 16px;
          display: flex;
          justify-content: space-between;
      }
      > min {
          padding: 16px;
      }
      .close {
          cursor: pointer;
      }
  }
</style>

