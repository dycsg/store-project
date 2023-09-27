<template>
  <div>
    <!-- 三级联动组件全局 -->
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <RanK />
    <FlooR v-for="floor in floorList" :key="floor.id" :list="floor" />
    <!-- :list传递给FlooR组件 props接收 -->
    <!-- <FlooR/> -->
    <BranD />
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import TodayRecommend from "@/pages/Home/TodayRecommend";
import RanK from "@/pages/Home/RanK";
import FlooR from "@/pages/Home/FlooR";
import BranD from "@/pages/Home/BranD";
import { mapState } from "vuex";

export default {
  name: "MyHome",
  data() {
    return {};
  },
  components: {
    ListContainer,
    TodayRecommend,
    RanK,
    FlooR,
    BranD,
  },
  mounted() {
    // 获取floor数据
    this.$store.dispatch("getFloorList");
    // 通过token获取用户数据
    this.$store.dispatch("getUserInfo");
  },
  computed: {
    ...mapState({
      floorList: (state) => {
        return state.home.floorList;
      },
    }),
  },
  methods: {},
};
</script>

<style lang="less" scoped></style>
