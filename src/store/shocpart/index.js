import { reqcartList } from "@/api"


const state = {
    cartList: []
}
const mutations = {
    GETCARTLIST(state, cartList){
        state.cartList = cartList
    }
}
const actions = {
    async getcartList({commit}, cartList){
       let dyc = await reqcartList(cartList)
       if(dyc.code == 200){
        commit("GETCARTLIST", dyc.data)
       } 
    }
}
const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters,
}