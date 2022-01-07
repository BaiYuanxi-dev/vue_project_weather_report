<template>
  <div class="block">
<!--    <span class="demonstration">带快捷选项</span>-->
    <el-date-picker
      v-model="value2"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
      value-format="yyyy-MM-dd">
    </el-date-picker>
    <el-button icon="el-icon-search" circle  @click="getMsgs"></el-button>
    <!-- <button @click="getMsgs">查询</button> -->
  </div>
</template>

<script>
export default {
  name: 'rili',
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value1: '',
      value2: ''
    }
  },

  methods:{
    getMsgs(){
      // console.log(this.value2)
      this.$emit("msgGot",this.value2);
    }
  },

  mounted(){

  }
}
</script>

<style scoped>

</style>
