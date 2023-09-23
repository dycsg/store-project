<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <!-- 判断服务器传过来的数据是否等于1 -->
            <input
              type="checkbox"
              name="chk_list"
              id=""
              value=""
              :checked="cart.isChecked == 1"
              @change="updateChecked(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cart.cartPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <!-- 使用同一个回调函数 但是每一个需要传不同的参数-->
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="cart.skuNum"
              @change="handler('change', $event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.cartPrice }}</span>
          </li>
          <li class="cart-list-con7" style="display: flex">
            <a href="#none" class="sindelet" @click="deleteCartById(cart)"
              >删除</a
            >
            <br />
            <a href="#none" class="collect">收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck && cartInfoList.length>0" @change="updateAllCratChecked"/>
        <span>全选</span>
      </div>
      <div class="option" style="padding-top: 15px">
        <a class="DeleteCheck" @click="deleteAllCheckedCart"
          >删除</a
        >
        <a href="javascript:;" class="removeLove">收藏</a>
        <a href="javascript:;" class="clear">清空</a>
      </div>
      <div
        class="money-box"
        style="display: flex; justify-content: center; align-items: center"
      >
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalprice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入节流
import throttle from "lodash/throttle";
import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  methods: {
    // 发请求
    getData() {
      this.$store.dispatch("getCateList");
    },
    // 修改产品的个数  添加节流  throttle
    handler: throttle(async function (type, disNum, cart) {
      // type: 点击的是哪个 用来区分元素
      // disNum：更改后里面的数据
      // cart 是哪一个产品 有id属性
      // console.log(type,'---',disNum,'---',cart);
      // 向服务器发请求 修改数量
      switch (
        type //区分我点击是的是哪个按钮
      ) {
        case "add":
          disNum = 1;
          break; //退出
        case "minus":
          // 判断产品的个数大于1 才可以传递给服务器-1
          // if(cart.skuNum > 1){
          //   disNum = -1
          // }else{
          //   // 产品的个数小于等于1
          //   disNum = 0
          // }
          // 如果产品的个数小于等于1，传递给服务器0个 原封不动
          disNum = cart.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          // 如果用户输入的是非法的或者是负数 则让它不变
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            disNum = parseInt(disNum) - cart.skuNum; //如果是小数则让它取整
          }
          // disNum = (isNaN(disNum) || disNum < 1) ? 0 : parseInt(disNum) - cart.skuNum    //三元写法
          break;
      }
      // 成功了干什么失败了干什么
      try {
        // 派发action
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: cart.skuId,
          skuNum: disNum,
        }); //传递参数过去
        // 再次获取最新数据展示
        this.getData();
      } catch (error) {
        // return Promise.reject(new Error('faile'))
      }
    }, 500),
    // 删除产品回调
    deleteCartById(cart) {
      // console.log(cart);
      try {
        // 如果删除成功再次发请求获取新数据
        this.$store.dispatch("DeleteCartListBySkuId", cart.skuId);
        this.getData();
      } catch (error) {
        alert(error.massage);
      }
    },
    // 更改产品的选中状态
    async updateChecked(cart, event) {
      // 先获取我们点击的是哪一个元素，再通过$event获取选中状态
      // console.log(cart,event.target.checked);
      try {
        let isChecked = event.target.checked ? "1" : "0"; //本地返回的属性值只有true和false 需要判断如果它的真就让他等于1否则就是0 ,服务器的数据是isChecked:1||0
        await this.$store.dispatch("updateCheckedById", {skuId: cart.skuId,isChecked: isChecked}); //这里再赋值 使用对象的简写形式
          // 再次发请求
          this.getData();
      } catch (error) {
        alert(error.massage);
      }
    },
    // 删除已选中商品
    async deleteAllCheckedCart() {
      try {
        // 派发一个回调到仓库进行操作
        await this.$store.dispatch("deleteAllCheckedCart")
        // 如果成功则再次发请求获取购物车列表数据
        this.getData();
      } catch (error) {
        alert(error.massage)
      }
    },
    // 全选的勾选状态
    async updateAllCratChecked(event) {   //获取事件对象
        // console.log(checked);、
        try {
          let isChecked = event.target.checked ? "1" : "0"    //判断是否等于0或1
          // 派发action
          await this.$store.dispatch('updateAllCartisChecked',isChecked)   //还要把选中状态发出去
          this.getData();
        } catch (error) {
          alert(error.massage)
        }
    }
  },
  computed: {
    ...mapGetters(["cartList"]),
    // 计算出来的购物车发的数据
    cartInfoList(state) {
      return state.cartList.cartInfoList || []; //或者是字符串还是数组得根据数据
    },
    // 计算商品的总价
    totalprice() {
      // 商品总和
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        // console.log(item);  //循环遍历出购物车数据
        sum += item.skuNum * item.skuPrice; //再相加
      });
      return sum;
    },
    isAllCheck() {
      // 遍历数组里面数据全部的ischecked===1为真    every遍历数组的每一项
      // 否则就是假
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
  },
};
</script>

<style lang="less" scoped>
a{
  cursor: pointer;
}
.clear {
  padding-top: 5px;
  padding: 10px;
  background-color: rgb(97, 199, 239);
  width: 30px;
  margin-left: 5px;
  height: 20px;
  font-size: 13px;
  border-radius: 8px;
}
.collect,
.removeLove {
  padding: 10px;
  text-align: center;
  background-color: #e1d71b;
  width: 30px;
  margin-left: 5px;
  height: 20px;
  font-size: 13px;
  border-radius: 8px;
}
.collect:hover {
  transform: scale(0.9);
}
.sindelet,
.DeleteCheck {
  padding: 10px;
  background-color: #1be12b;
  width: 30px;
  height: 20px;
  font-size: 13px;
  border-radius: 8px;
}
.sindelet:hover {
  transform: scale(0.9);
}
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 10%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
