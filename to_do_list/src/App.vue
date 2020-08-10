<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="inputValueChange" />
    <a-button type="primary" @click="addItemClick">添加事项</a-button>

    <a-list bordered :dataSource="cateList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="e => {cbChangeStatus(e, item.id)}">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{undoItemLength}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="btnKey === 'all' ? 'primary' : 'default'" @click="changeKey('all')">全部</a-button>
          <a-button :type="btnKey === 'undone' ? 'primary' : 'default'" @click="changeKey('undone')">未完成</a-button>
          <a-button :type="btnKey === 'done' ? 'primary' : 'default'" @click="changeKey('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'app',
  data() {
    return {
    }
  },
  created() {
    // 获取任务列表
    this.$store.dispatch('getList')
  },
  // 将值计算为映射属性
  computed: {
    ...mapState(['inputValue', 'btnKey']),
    ...mapGetters(['undoItemLength', 'cateList'])
  },
  methods: {
    ...mapMutations(['handleInputValue', 'addItem']),
    // 文本框内容改变事件
    inputValueChange(e) {
      // console.log(e.target.value)
      this.handleInputValue(e.target.value)
    },
    // 添加事件按钮点击事件
    addItemClick() {
      if (this.inputValue.trim().length <= 0) {
        return this.$message.warning('事项不能为空')
      }
      this.addItem()
    },
    removeItemById(id) {
      this.$store.commit('removeItem', id)
    },
    // 修改复选框的状态
    cbChangeStatus(e, id) {
      // 传递状态和id
      const params = {
        status: e.target.checked,
        id: id
      }
      this.$store.commit('changeStatus', params)
    },
    // 清除已完成
    clean() {
      this.$store.commit('cleanDone')
    },
    // 改变按钮的选择样式
    changeKey(key) {
      this.$store.commit('changeBtn', key)
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
