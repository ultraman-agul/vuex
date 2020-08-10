<template>
    <div>
        <h3>{{this.$store.getters.showCount}}</h3>
        <button @click="addHandle()">+</button> <br>
        <button @click="addHandle0()">+</button> <br>
        <button @click="addHandle1()">异步加一</button>
        <button @click="addHandle2()">异步加N</button>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    computed: {
    ...mapState(['count'])
  },
  methods: {
    ...mapMutations(['addN', 'sub']),
    addHandle () {
        //   this.$store.commit('add', 3)
        this.addN(2)
      },
    addHandle0 () {
      // commit 专门用来触发 mutations
      this.$store.commit('addN', 3)
    },
    addHandle1 () {
      // dispatch 专门用来触发 action
      this.$store.dispatch('addAsync')
    },
    addHandle2 () {
      this.$store.dispatch('addNAsync', 5)
    }
  }
}
</script>
