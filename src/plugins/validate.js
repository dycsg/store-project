// vee-validate表单验证插件
import Vue from "vue";
// 表单验证
import VeeValidate from "vee-validate";
// 导入中文提示信息
import zh_CN from "vee-validate/dist/locale/zh_CN";
Vue.use(VeeValidate);

// 表单验证  传两个参数一个中文一个验证回调
VeeValidate.Validator.localize("zh_CN", {
  messages: {
    ...zh_CN.messages, //使用中文提示信息
    is: (field) => `${field}必须与密码相同`,
  },
  attributes: {
    phone: "手机号",
    code: "验证码",
    password: "密码",
    password1: "确定密码",
    agree: "协议",
  },
});

//自定义校验规则
//定义协议必须打勾同意
VeeValidate.Validator.extend("agree", {
  validate: (value) => {
    return value;
  },
  getMessage: (field) => field + "必须同意",
});
