<template>
  <div id="app">
    <transition appear name="animate-app" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
    components: {
    }
}
</script>

<style lang="less">
  .animate-app-enter-active, .animate-app-leave-active {
    transition: .3s ease-in-out;
  }
  .animate-app-enter {
    opacity: 0;
  }
  .animate-app-leave-to {
    opacity: 0;
  }
</style>
