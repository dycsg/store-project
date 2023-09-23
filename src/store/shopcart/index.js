import { reqCartList,reqDeleteCartById,reqUpdateCheckedById } from "@/api"


const state = {
    cartList: []
}
const mutations = {
    GETCARTLIST(state, cartList){
        state.cartList = cartList
    }
}
const actions = {
    async getCateList({commit}){
       let dyc = await reqCartList()
    //    console.log(dyc);
       if(dyc.code == 200){
        commit("GETCARTLIST", dyc.data)
       } 
    },
    // 删除购物车某个产品
    async DeleteCartListBySkuId({commit},skuId){
      let result =  await reqDeleteCartById(skuId)
      if(result.code == 200){
        return 'ok'
      }else{
        return Promise.reject(new Error('faile'))
      }
    },
    // 修改产品选中状态
    async updateCheckedById({commit},{skuId,isChecked}){
      let result = await reqUpdateCheckedById(skuId,isChecked)
      if(result.code == 200){
        return "ok"
      }else{
        return Promise.reject(new Error('faile'))
      }
    },
    // 删除选中的商品
    deleteAllCheckedCart({dispatch,getters}){    // {}括号里面不只可以调用commit还可以调用actions, getters, state
      // console.log(getters,);//获取服务器购物车里面的数据列表
      // 获取购物车中的全部产品 数组
      let PromiseAll = []    //用来存储返回成功的promise
      getters.cartList.cartInfoList.forEach(item => {
        // console.log(item);
        // actions.dispatch("DeleteCartListBySkuId",item.skuId); //调用上面的删除接口遍历删除每一项，但是需要判断是否选中
        let promise = item.isChecked == 1 ? dispatch("DeleteCartListBySkuId", item.skuId) : '' //如果遍历好的数据的isChecked == 1 则调用上面的删除接口，再把id传过去 否则就不操作
        // 把每一次返回的的promise添加到数组中
        PromiseAll.push(promise)
      });
      // 只有全部的都成功才会 返回成功结果
      // 有一个失败，即为失败结果
      return Promise.all(PromiseAll)  //如果Promise.all等于我们返回的PromiseAll 相等就是成功即返回
    },
    // 修改全选按钮的选中状态
    updateAllCartisChecked({dispatch,state}, isChecked) {
      let PromiseAll = []
      state.cartList[0].cartInfoList.forEach((item) => {
      let promise =  dispatch("updateCheckedById", {skuId: item.skuId,isChecked})  //对象简写形式
        PromiseAll.push(promise)
      })
      return Promise.all(PromiseAll)
    }
  }
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },
    
}

export default {
    state,
    mutations,
    actions,
    getters,
}