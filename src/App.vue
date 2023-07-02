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
  mounted() {
    // 通知Vuex发请求，获取数据，存储于store中的home仓库中
    this.$store.dispatch("categoryList") //派发一个actions获取商品分类列表数据
    // console.log(this.$store);
    this.$store.dispatch("getBannerList") //派发一个actions获取轮播图数据
  }
  
}
</script>

<style>

</style>
