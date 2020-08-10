<template>
    <div>
        <h3>{{showCount}}</h3>
        <button @click="handle1">-</button>
        <button @click="handle2(5)">-n</button>
    </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['showCount'])
    },
    methods: {
        ...mapMutations(['sub']),
        ...mapActions(['asyncSubN']),
        handle1 () {
            this.sub()
        },
        handle2 (step) {
            this.asyncSubN(step)
        }
    }
}
</script>
