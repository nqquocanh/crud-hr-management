import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

export default new Vuex.Store({
  state: {
    name:'',
    age:'',
    dob:'',
    gender:'',
    address:'',
    email:'',
    dept:'',
    position:'',
  },
  getters,
  mutations,
  actions,
})
