<template>
  <div>
    <MyHeader/>
    <!-- 呈现路由组件内容 -->
    <router-view></router-view>
    <MyFooter v-show="$route.meta.isShow"></MyFooter>
  </div>
</template>

<script>
import MyFooter from './components/MyFooter';
import MyHeader from './components/MyHeader';

export default {
  name: 'App',
  components: {
    MyFooter,
    MyHeader
  },
  
}
</script>

<style>

</style>
