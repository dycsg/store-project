<template>
  <div class="outer">
    <!-- 登录 -->
    <div class="login-wrap">
      <div class="login">
        <div class="loginform">
          <ul class="tab clearFix">
            <li>
              <a @click="scanCode" style="border-right: 0">扫描登录</a>
            </li>
            <li>
              <a  class="current">账户登录</a>
            </li>
          </ul>

          <div class="content">
            <form>
              <div class="input-text clearFix">
                <i></i>
                <input
                  placeholder="请输入你的手机号"
                  v-model="phone"
                  name="phone"
                  v-validate="{ required: true, regex: /^1\d{10}$/ }"
                  :class="{ invalid: errors.has('phone') }"
                />
                <span class="error-msg">{{ errors.first("phone") }}</span>
              </div>

              <div class="input-text clearFix">
                <i class="pwd"></i>
                <input
                  placeholder="请输入你的登录密码"
                  v-model="password"
                  name="password"
                  v-validate="{ required: true, regex: /^[0-9A-Za-z]{6,16}$/ }"
                  :class="{ invalid: errors.has('password') }"
                />
                <span class="error-msg">{{ errors.first("password") }}</span>
              </div>

              <div class="setting clearFix">
                <label class="checkbox inline">
                  <input name="m1" type="checkbox" value="2" checked="" />
                  自动登录
                </label>
                <span class="forget" @click="a">忘记密码？</span>
              </div>
              <!-- 阻止默认行为 -->
              <button class="btn" @click.prevent="userLogin">
                登&nbsp;&nbsp;录
              </button>
            </form>
            <div class="call clearFix">
              <ul>
                <li>
                  <a href="https://qm.qq.com/q/hIoVShFDAA"
                    ><img src="./images/qq.png" alt=""
                  /></a>
                </li>
                <li>
                  <a href="https://ur.alipay.com/_3KgF0FExFG3bOVcXCtv3vS"
                    ><img src="./images/ali.png" alt=""
                  /></a>
                </li>
                <li>
                  <a
                    href="https://kf.qq.com/touch/wechat-product/index.html?scene=wxhelp&randstr=16959759209RI"
                    ><img src="./images/weixin.png" alt=""
                  /></a>
                </li>
              </ul>
              <router-link class="register" to="/myregister"
                >立即注册</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：江西省南昌市安义县科技园综合楼6层</div>
      <div class="beian" >赣ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
import code from "./images/code.png"
export default {
  name: "MyLogin",

  data() {
    return {
      phone: "",
      password: "",
    };
  },

  mounted() {},

  methods: {
    // 登入
    async userLogin() {
      try {
        const { phone, password } = this;
        phone &&
          password &&
          (await this.$store.dispatch("userLogin", { phone, password }));
        // 跳转到登录
        // 看路由中是否包含query参数，有就跳转到query参数指定的路由 记录了想去的路由， 没有就正常跳转到myhome
        // console.log(this.$route.query.redirect);
        let toPath = this.$route.query.redirect || "/myhome";
        this.$router.push(toPath);
      } catch (error) {
        alert(error.message);
      }
    },
    a() {
      alert("请联系管理员：3501194074");
    },
    // 扫码
    scanCode() {
        this.$confirm(`<img src="${code}" style="width: 150px; height: 150px;" />`, '扫码登录', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          iconClass: 'el-icon-full-screen',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      }
    
  },
};
</script>

<style lang="less">
.login-wrap {
  height: 487px;
  background-color: #e93854;
  .login {
    width: 1200px;
    height: 487px;
    margin: 0 auto;
    background: url(./images/loginbg.png) no-repeat;
  }
  .loginform {
    width: 420px;
    height: 406px;
    box-sizing: border-box;
    background: #fff;
    float: right;
    top: 45px;
    position: relative;
    padding: 20px;
    .tab {
      li {
        width: 50%;
        float: left;
        text-align: center;
        a {
          width: 100%;
          display: block;
          height: 50px;
          line-height: 50px;
          font-size: 20px;
          font-weight: 700;
          color: #333;
          border: 1px solid #ddd;
          box-sizing: border-box;
          text-decoration: none;
        }
        .current {
          border-bottom: none;
          border-top-color: #28a3ef;
          color: #e1251b;
        }
      }
    }
    .content {
      width: 380px;
      height: 316px;
      box-sizing: border-box;
      border: 1px solid #ddd;
      border-top: none;
      padding: 18px;
      form {
        margin: 15px 0 18px 0;
        font-size: 12px;
        line-height: 18px;
        .input-text {
          margin-bottom: 22px;
          position: relative;
          i {
            float: left;
            width: 37px;
            height: 32px;
            border: 1px solid #ccc;
            background: url(./images/icons.png) no-repeat -10px -201px;
            box-sizing: border-box;
            border-radius: 2px 0 0 2px;
          }
          .pwd {
            background-position: -72px -201px;
          }
          input {
            width: 302px;
            height: 32px;
            box-sizing: border-box;
            border: 1px solid #ccc;
            border-left: none;
            float: left;
            padding-top: 6px;
            padding-bottom: 6px;
            font-size: 14px;
            line-height: 22px;
            padding-right: 8px;
            padding-left: 8px;

            border-radius: 0 2px 2px 0;
            outline: none;
          }

          .error-msg {
            position: absolute;
            top: 100%;
            left: 40px;
            color: red;
          }
        }
        .setting {
          label {
            float: left;
          }
          .forget {
            float: right;
            cursor: pointer;
          }
        }
        .btn {
          background-color: #e1251b;
          padding: 6px;
          border-radius: 0;
          font-size: 16px;
          font-family: 微软雅黑;
          word-spacing: 4px;
          border: 1px solid #e1251b;
          color: #fff;
          width: 100%;
          height: 36px;
          margin-top: 25px;
          outline: none;
        }
      }
      .call {
        margin-top: 30px;
        ul {
          float: left;
          li {
            float: left;
            margin-right: 5px;
          }
        }
        .register {
          float: right;
          font-size: 15px;
          line-height: 38px;
        }
        .register:hover {
          color: #4cb9fc;
          text-decoration: underline;
        }
      }
    }
  }
}
.copyright {
  width: 1200px;
  margin: 0 auto;
  text-align: center;
  line-height: 24px;
  ul {
    li {
      display: inline-block;
      border-right: 1px solid #e4e4e4;
      padding: 0 20px;
      margin: 15px 0;
    }
  }
}
</style>
