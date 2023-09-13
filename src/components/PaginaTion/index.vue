<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getpageNo', pageNo - 1)">上一页</button>
    <button v-if="startNumAndEndNum.start>1" @click="$emit('getpageNo', 1)" :class="{ active: pageNo==1 }">1</button>
    <button v-if="startNumAndEndNum.start>2">···</button>


    <button v-for="(page,index) in startNumAndEndNum.end" :key="index" v-if="page>=startNumAndEndNum.start" @click="$emit('getpageNo', page)" :class="{active: pageNo == page}">{{ page }}</button>


    <button v-if="startNumAndEndNum.end < totalPage -1">···</button>
    <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('getpageNo',totalPage)" :class="{ active: pageNo == totalPage}">{{ totalPage }}</button>
    <button :disabled="pageNo == totalPage" @click="$emit('getpageNo', pageNo + 1)">下一页</button>


    <button style="margin-left: 30px">共 {{ this.total }} 条</button>
    <!-- <h1>{{ startNumAndEndNum }}-当前页：{{ this.pageNo }}</h1> -->
  </div>
</template>

<script>
export default {
  name: "PaginaTion",
  //接收父组件传过来的数据
  props: ["pageNo", "pageSize", "total", "continues"], //total总条数 continues连续页数  pageSize每页展示数 pageNo当前页
  computed: {
    // 总共多少页 总页数
    totalPage() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算出起始页和结束页【连续的页吗数是5页】
    startNumAndEndNum() {
      // 解构可以让传过来的变量不用this
      const { pageNo, totalPage, continues } = this;
      // 定义起始页和结束页变量
      let start = 0,
        end = 0;
      // 连续页码数是5页但是如果总页数不够就要进行判断
      if (continues > totalPage) {
        // 非正常情况
        start = 1; //起始页
        end = totalPage; //结束页
      } else {
        // 正常情况
        // pageNo如果当前页是8  continues连续的页码是5    5/2=2.5parseInt取整=2    再用当前页pageNo-2 = 6
        start = pageNo - parseInt(continues / 2); //起始页  //parseInt取整
        // pageNo是当前页8 continue连续页数5     5/2=2.5parseInt取整=2     再用当前页pageNo+2 = 10
        end = pageNo + parseInt(continues / 2); //结束页
        // 有不正常情况 start有可能等于负数获取0             走这给if 当前是1 && 2
        if (start < 1) {
          //如果小于1则让start=1
          start = 1;
          end = continues; //结束页=连续页码数
        }
        // 有不正常情况 end有可能大于等于 总页数totalPage        走这给if 当前是30 && 31
        if (end >  totalPage) {
          end = totalPage; //如果大于则让他就等于总页数
          start =  totalPage - continues + 1; //31-5+1=27
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #e1251b;
      color: #fff;
    }
  }
}
</style>
