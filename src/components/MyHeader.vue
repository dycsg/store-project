<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p style="color: red"><marquee>尚品汇欢迎您！</marquee></p>
          <p v-if="!userName">
            <!-- 没有用户名的时候显示 -->
            <span>请</span>
            <router-link to="/mylogin">登入</router-link>
            <router-link class="register" to="/myregister"
              >免费注册</router-link
            >
          </p>
          <p
            v-else
            style="display: flex; justify-content: center; align-items: center"
          >
            <svg
              t="1695606594798"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1639"
              width="20"
              height="20"
            >
              <path
                d="M588 855.4H436c-64.5 0-125.5 0-169.8-6.8-21.6-3.3-87.3-13.4-87.3-67.2v-14.9c0-139.7 115.4-253.3 257.2-253.3h152c141.8 0 257.2 113.6 257.2 253.3v14.9c0 52.6-65.7 63-87.2 66.5-44 7-103 7.5-170.1 7.5zM436 556.5c-117.9 0-213.9 94.2-213.9 210v14.9c0 13.7 27.5 20.8 50.6 24.4 41.1 6.3 100.4 6.3 163.2 6.3h152c65.2 0 122.5-0.5 163.1-7 15.3-2.4 50.7-9.6 50.7-23.7v-14.9c0-115.8-96-210-213.9-210H436z m75.4-83.9c-112.5 0-204-90.2-204-201s91.5-201 204-201 204 90.2 204 201-91.5 201-204 201z m0-358.7c-88.6 0-160.7 70.7-160.7 157.7 0 87 72.1 157.7 160.7 157.7s160.7-70.7 160.7-157.7c0-87-72.1-157.7-160.7-157.7z"
                p-id="1640"
              ></path>
            </svg>
            <!-- 用户名 -->
            <a class="register">{{ userName }}</a>
            <a class="loginuot" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" title="尚品汇" to="/myhome">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
            @keydown.enter="keydownsearch"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch()"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "MyHeader",

  data() {
    return {
      keyword: "",
    };
  },

  methods: {
    // 搜索处理函数，用于跳转到搜索组件上 params参数
    goSearch() {
      // console.log(this.keyWords);
      // 把query参数和params参数合并
      // 判断如果这里有query参数就也把它带过去
      if (this.$route.query) {
        // console.log(this.$route.query);
        let loction = {
          name: "mysearch",
          params: { keyword: this.keyword || undefined },
        };
        loction.query = this.$route.query;
        this.$router.push(loction);
        // console.log(loction);
      }
    },
    // 退出登入
    async logout() {
      try {
        // 调用仓库删除接口函数
        await this.$store.dispatch("UserLogout");
        //  跳转带首页
        this.$router.push("/myhome");
      } catch (error) {
        alert(error.message);
      }
    },
  },
  mounted() {
    // 全局事件总线清除关键字
    this.$bus.$on("clear", () => {
      this.keyword = "";
    });
  },
  computed: {
    // 计算用户信息
    userName() {
      return this.$store.state.user.userInfo.name;
    },
  },
};
</script>

<style lang="less">
svg {
  padding-top: 4px;
}
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          // .registers {
          //   cursor: pointer;
          //   border-right: 1px solid #b3aeae;
          //   padding: 0 5px;
          //   margin-right: 5px;
          // }
          .register {
            cursor: pointer;
            border-right: 1px solid #b3aeae;
            padding: 0 5px;
            margin-right: 5px;
          }
          .loginuot {
            cursor: pointer;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
