import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    showCount: state => {
      return '当前最新数据为：【' + state.count + '】'
    }
  },
  mutations: {
    addN (state, step) {
      state.count += step
    },
    add1 (state) {
      state.count++
    },
    sub (state) {
      state.count--
    },
    subN (state, step) {
      state.count -= step
    }
  },
  actions: {
    addAsync (context) {
      setInterval(() => {
      context.commit('add1')
      }, 1000)
    },
    addNAsync (context, step) {
      setTimeout(() => {
        context.commit('addN', step)
      }, 1000)
    },
    asyncSubN (context, step) {
      setTimeout(() => {
        context.commit('subN', step)
      }, 1000)
    }
  },
  modules: {
  }
})
