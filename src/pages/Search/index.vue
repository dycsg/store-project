<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 三级列表面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 搜索关键字面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removekeyword">×</i>
            </li>
            <!-- 品牌面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              <!-- 用slice切割数组 加上第0位 直接写trademark返回的是id:name -->
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removetrademark">×</i>
            </li>
            <!-- 详情信息面包屑 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              <!-- 用slice切割数组 加上第0位 直接写trademark返回的是id:name -->
              {{ attrValue.split(":")[1]
              }}<i @click="removeattrValue(index)">×</i>
            </li>
          </ul>
        </div>
        <!--selector品牌-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrsInfo="attrsInfo" />
        <!--details详情-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a
                    >综合<i
                      v-show="{ isOne }"
                      class="iconfont icon-zonghepaixu"
                      style="font-size: 10px"
                    ></i
                  ></a>
                </li>
                <li>
                  <a>销量<i class="iconfont icon-xiaoliangyuce"></i></a>
                </li>
                <li>
                  <a>新品<i class="iconfont icon-new"></i></a>
                </li>
                <li>
                  <a>评价<i class="iconfont icon-pingjia"></i></a>
                </li>
                <li :class="{ active: isFour }" @click="changeOrder('2')">
                  <a
                    >价格<i
                      v-show="{ isFour }"
                      class="iconfont"
                      :class="{
                        'icon-jiantou_qiehuanxiangshang': isAsc,
                        'icon-jiantou_qiehuanxiangxia': isDesc,
                      }"
                    ></i
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <!-- 产品详情 -->
              <li class="yui3-u-1-5" v-for="item in goodsList" :key="item.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 在路由path:占位 这里把商品的id传过去 -->
                    <router-link :to="`/detail/${item.id}`">
                      <img :src="item.defaultImg" alt="" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em style="padding-right: 6px">¥</em>
                      <i>{{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{ item.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      @click="addShopCart"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <PaginaTion
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getpageNo="getpageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// icon-jiantou_qiehuanxiangshang icon-jiantou_qiehuanxiangxia
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";
export default {
  name: "MySearch",

  components: {
    SearchSelector,
  },
  data() {
    return {
      // 带给服务器参数
      searchParams: {
        category1Id: "", //一级分类id
        category2Id: "", //二级分类id
        category3Id: "", //三级分类id
        categoryName: "", //分类名字
        order: "1:desc", //排序
        keyword: "", //搜索关键字
        props: [], // 商品各种详情参数
        pageNo: 1, //分页器，第几页
        pageSize: 3, // 展示个数
        trademark: "", //  品牌
      },
    };
  },
  beforeMount() {
    // es6新增语法：合并对象将搜索关键正和三级列表里面的合并起来                   重要
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
    // console.log(this.$route.query);
    // console.log(this.$route.params);
  },
  mounted() {
    this.getData();

  },
  computed: {
    ...mapGetters(["goodsList"]), //注意数据格式
    // 计算排序
    isOne() {
      // 判断order是否有1这个元素 如果没有就返回-1
      return this.searchParams.order.indexOf("1") != -1;
    },
    isFour() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    // 计算样式 价格上下
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
    // 获取分页器数据
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),
  },
  methods: {
    // 封装成一个函数，要用的话就调用就好了
    getData() {
      // 向服务器发请求获取搜索数据 根据参数不同展示不同数据
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    // 删除面包屑
    removeCategoryName() {
      this.searchParams.categoryName = undefined;
      // 每次请求都置空
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData();
      //删除完跳转路由,但是不能直接跳转 如果有params参数，则进行跳转再加上params参数
      if (this.$route.params) {
        this.$router.push({ name: "mysearch", params: this.$route.params });
      }
    },
    removekeyword() {
      this.searchParams.keyword = undefined;
      // 每次请求都置空
      this.getData();
      // 通知Myheader组件清空input框搜索关键字
      this.$bus.$emit("clear");
      // 路由跳转
      this.$router.push({ name: "mysearch", query: this.$route.query });
      // console.log(this.$route.query);
    },
    // 品牌自定义事件
    trademarkInfo(trademark) {
      // 接收到子组件传过来的数据
      // console.log(trademark);
      // 整理传过来的参数格式是"id:品牌" 再赋值给它
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      // 发请求获取品牌数据
      this.getData();
    },
    // 删除品牌
    removetrademark() {
      // 置空
      this.searchParams.trademark = undefined;
      // 调接口
      this.getData();
    },
    // 详情信息自定义事件
    attrsInfo(attrs, attrValue) {
      // console.log(attrs, attrValue);
      // 整理传过来的参数格式是数组
      let props = `${attrs.attrId}:${attrValue}:${attrs.attrName}`; //中间的attrValue是从子组件传过来的所有不需要加attrs
      // 数组去重 防止重复点击
      if (this.searchParams.props.indexOf(props) == -1) {
        // 再重新push到本地data的props
        this.searchParams.props.push(props);
      }
      // console.log(this.searchParams.props);
      this.getData();
    },
    // 删除详情信息面包屑
    removeattrValue(index) {
      // 删除数组元素 用索引值index   上面传过来    接收   使用 和只删除一个
      this.searchParams.props.splice(index, 1);
      // 调接口
      this.getData();
    },
    changeOrder(flag) {
      // flag形参：它是一个标记，代表用户点击的是综合1，价格2 用户点击的时候传过来的
      // console.log(flag);
      // let originOrder = this.searchParams.order   //初始值
      let originFlag = this.searchParams.order.split(":")[0]; // 1或2
      let originSort = this.searchParams.order.split(":")[1]; // asc或desc
      // console.log( originOrder,originFlag,originSort);
      let newOrder = "";
      // 判断点击的是综合
      if (flag == originFlag) {
        // alert('综合')
        newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`;
        // console.log(newOrder);
      } else {
        // 点击的是价格
        newOrder = `${flag}:${"desc"}`;
      }
      // 将新的order赋值给searchParams
      this.searchParams.order = newOrder;
      // 再次发请求
      this.getData();
    },
    // 获取分页器pageNo数据 发请求
    getpageNo(pageNo) {
      // console.log(pageNo);
      // 整理服务器传过来的参数
      this.searchParams.pageNo = pageNo;
      // 调接口
      this.getData();
    },

     // 添加购物车事件     回调要么成功要么失败 pormise
     async addShopCart() {
      // 发请求 路由里的事件 把我们的skuid skunum传过去          当前组件上的skuid skunum
      // console.log(result);
      // 成功干什么 失败干什么跟if差不多AddOrUpdateShopCart
      try {
        //成功干什么
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: this.$route.params.skuid,
          skuNum: this.skuNum,
        });
        // 路由跳转
        this.$router.push({
          name: "addcartsuccess",
          query: { skuNum: this.skuNum },
        });
        // 简单数据用query传过去，复杂数据用会话存储但是不能直接存要进行转换、
        sessionStorage.setItem("SKUINFO", JSON.stringify(this.skuInfo));
      } catch (error) {
        // 路由跳转
        this.$router.push({
          name: "addcartsuccess",
          query: { skuNum: this.skuNum },
        });
        // 简单数据用query传过去，复杂数据用会话存储但是不能直接存要进行转换、
        sessionStorage.setItem("SKUINFO", JSON.stringify(this.skuInfo));
        console.log(error.message);
      }
    },
  },
  watch: {
    $route() {
      // console.log(this.searchParams);
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      this.getData();
      // 每次请求都置空
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
    },
  },
};
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 14px;
}
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
