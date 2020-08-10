import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有的任务列表
    list: [],
    inputValue: '',
    nextid: 5,
    btnKey: 'all'
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    handleInputValue(state, value) {
      state.inputValue = value
    },
    addItem(state) {
      const itemInfo = {
        id: state.nextid,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(itemInfo)
      state.nextid++
      state.inputValue = ''
    },
    // 删除
    removeItem(state, id) {
      const i = state.list.findIndex(x => x.id === id)
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    // 改变复选框的状态
    changeStatus(state, params) {
      const i = state.list.findIndex(x => x.id === params.id)
      if (i !== -1) {
        state.list[i].done = params.status
      }
    },
    // 清除已完成
    cleanDone(state) {
      state.list = state.list.filter(x => x.done === false)
    },
    changeBtn(state, key) {
      state.btnKey = key
      // console.log(state.btnKey)
    }
  },
  getters: {
    undoItemLength(state) {
      return state.list.filter(x => x.done === false).length
    },
    cateList(state) {
      if (state.btnKey === 'all') {
        return state.list
      }
      if (state.btnKey === 'undone') {
        return state.list.filter(x => !x.done)
      }
      if (state.btnKey === 'done') {
        return state.list.filter(x => x.done)
      }
    }
  },
  actions: {
    // 获取数据是异步操作，所以要在actions里处理
    getList(context) {
      axios.get('/list.json').then(({ data }) => {
        // console.log(data)
        // 改变state数据只能调用mutations里的方法，赋值
        context.commit('initList', data)
      })
    }
  },
  modules: {
  }
})
