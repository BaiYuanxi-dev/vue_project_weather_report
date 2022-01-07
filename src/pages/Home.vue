<template>
  <div class="b">
    <!--<rili></rili>-->
    <pageheader v-on:userMsgGot=" getUserMsg($event)"></pageheader>
    <!--<rili class="rili2"></rili>-->
    <wenbenkuang ref="testcard" class="wenzi" :cityMsg="city"></wenbenkuang>
    <div class="image">
      <rili class="calendar" v-on:msgGot="getData($event)"></rili>
      <lineChart ref="child" class="zhexiantu"></lineChart>
    </div>

    <!--    <el-page-header class="logo" @back="goBack" content="渔溏天气研究所" style="height: 50px">-->
    <!--    </el-page-header>-->
  </div>
</template>

<script>
import pageheader from "../components/pageheader.vue";
import rili from "../components/rili.vue";
import wenbenkuang from "../components/wenbenkuang";
import lineChart from "../components/lineChart";
export default {
  components: {
    pageheader,
    rili,
    wenbenkuang,
    lineChart,
  },
  data() {
    return {
      // tempDatas: {},
      testDatas: [10, 15, 16, 12, 19, 18, 17, 54, 35],
      city: "北京市",
      count: 0,
      // 设置form用于进行添加的时候绑定值
    };
  },
  watch: {},
  methods: {
    getData(msg) {
      let datas = [];
      // let dates = [];
      if (msg === "") {
        alert("请选择日期");
        return;
      } else {
        let params = {
          date1: msg[0],
          date2: msg[1],
        };

        //发
        //收
        this.$api.getDatas(params, { type: "json" }).then((res) => {
          datas = eval(res);
          for (let i in datas) {
            datas[i] = datas[i].toFixed(2);
          }
          this.$refs.child.getData(msg, datas);
        });
      }
    },
    changecityName() {
      this.city = this.$route.query.cityN;
      this.$refs.child.init(this.city);
    },
    getUserMsg(msg) {
      this.$router.push({ name: "User", query: { msgs: msg } });
    },
  },
  // created(){
  //   console.log("create")
  //   this.changecityName();
  //   this.$refs.testcard.getClimate(this.city);
  //   this.$refs.testcard.getSpeech();
  // },
  mounted() {
  

    //   // Code that will run only after the
    //   // entire view has been rendered
    this.changecityName();
    this.$refs.testcard.getClimate(this.city);
    this.$refs.testcard.getSpeech();

  },
  // activated(){

  // },
  // created(){
  //   this.changecityName();
  //   this.$refs.testcard.getClimate(this.city);
  //   this.$refs.testcard.getSpeech();
  // }
};
</script>

<style scope>
.b {
  width: 100%;
  height: 100%;
  position: fixed;
}

.image {
  width: 1200px;
  height: 1100px;
  margin: 0 0 0 400px;
}
.zhexiantu {
  position: fixed;
  top: 70px;
  left: 80px;
  height: 500px;
  width: 1000px;
}

.calendar {
  position: fixed;
  top: 74px;
  right: 180px;
}
</style>