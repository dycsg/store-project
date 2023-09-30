<template>
  <div class="spec-preview">
    <img v-lazy="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "ZooM",
  props: ["skuImageList"],
  data() {
    return {
      imgIndex: 0,
    };
  },
  mounted() {
    // console.log(this.skuImageList);
    // 全局事件总线  接收到子组件传过来的数据 $on (事件名, 回调)
    this.$bus.$on("getIndex", (index) => {
      // console.log(index)
      this.imgIndex = index;
    });
  },
  computed: {
    imgObj() {
      return this.skuImageList[this.imgIndex] || {};
    },
  },
  methods: {
    // 鼠标事件
    handler(event) {
      // console.log('11');
      let mask = this.$refs.mask;   //遮罩层
      // console.log(mask);
      let big = this.$refs.big     //图片元素
      // console.log(big);
      let left = event.offsetX - mask.offsetWidth / 2; //计算出距离左边的宽度-减去mask元素的宽度的一半
      let top = event.offsetY - mask.offsetHeight / 2; //同理
      // 约束范围
      if (left < 0) left = 0; //不让他超过左边  如果他mask小于最左边就让他等于0
      if (left >= mask.offsetWidth) left = mask.offsetWidth; //如果mask大于或等于则让的等于这个元素的宽度
      if (top < 0) top = 0; //上面   同理
      if (top >= mask.offsetHeight) top = mask.offsetHeight;
      // 把计算好的属性赋值
      mask.style.left = left + "px";   //一定记得加像素单位
      mask.style.top = top + "px";
      // 计算放大后的图片
      big.style.left = - 2 * left + "px";
      big.style.top = - 2 * top + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -0.5px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
