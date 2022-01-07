<template>
  <div>
    <img class="bg" src="../assets/pictures/map.png" />
    <el-tooltip
      class="item"
      effect="light"
      content="北京市"
      placement="top-end"
    >
      <el-button
        class="beijing"
        @click="change('北京市')"
        type="primary"
        circle
        size="mini"
      ></el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="light" content="天津市" placement="right">
      <el-button
        class="tianjin"
        @click="change('天津市')"
        type="primary"
        circle
        size="mini"
      ></el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="light" content="重庆市" placement="left">
      <el-button
        class="chongqing"
        @click="change('重庆市')"
        type="primary"
        circle
        size="mini"
      ></el-button>
    </el-tooltip>
    <el-tooltip
      class="item"
      effect="light"
      content="南京市"
      placement="bottom-start"
    >
      <el-button
        class="nanjing"
        @click="change('南京市')"
        type="primary"
        circle
        size="mini"
      ></el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="light" content="长沙市" placement="bottom">
      <el-button
        class="changsha"
        @click="change('长沙市')"
        type="primary"
        circle
        size="mini"
      ></el-button>
    </el-tooltip>
    <el-tooltip
      class="item"
      effect="light"
      content="昆明市"
      placement="bottom-end"
    >
      <el-button
        class="kunming"
        @click="change('昆明市')"
        type="primary"
        circle
        size="mini"
      ></el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="light" content="西安市" placement="left">
      <el-button
        class="xian"
        @click="change('西安市')"
        type="primary"
        circle
        size="mini"
      ></el-button>
    </el-tooltip>

    <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
      确认切换
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <!-- 设置触发更新的方法 -->
        <el-button type="primary" @click="update(city)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "changeCity",
  data() {
    return {
      dialogFormVisible: false,
      city: "北京市",
    };
  },
  methods: {
    change(city) {
      this.dialogFormVisible = true;
      this.city = city;
      // this.dialogFormVisible = false;
    },
    cancel() {
      this.dialogFormVisible = false;
    },
    update(city) {
      let cityName = "";
      switch (city) {
        case "北京市":
          cityName = "data_beijing";
          break;
        case "天津市":
          cityName = "data_tianjin";
          break;
        case "重庆市":
          cityName = "data_chongqing";
          break;
        case "南京市":
          cityName = "data_nanjing";
          break;
        case "长沙市":
          cityName = "data_changsha";
          break;
        case "昆明市":
          cityName = "data_kunming";
          break;
        case "西安市":
          cityName = "data_xian";
          break;
        default:
          break;
      }
      let params = {
        name: cityName,
      };
      //向Home传输字符串cityName
      this.$router.push({});

      // 向后端传输字符串cityHome
      // this.$api.changeCity(params, { type: "json" }).then((res) => {
      //   // this.dialogFormVisible=false;

      //   //进行页面跳转
      // });

      this.$router.push({ name: "Home", query: { cityN: city } });
      this.dialogFormVisible = false;
    },
    // mounted(){
    //   console.log("woshiqiehuan")
    // }
  },
};
</script>

<style scoped>
.bg {
  /* background: url(../assets/pictures/map.png);  */
  /*background: black;*/
  top: 70px;
  left: 250px;
  width: 70%;
  height: 80%;
  position: fixed;
  /* background-size: 100% 100%; */
  /*background-position: center;*/
  /*margin: 0;*/
  /*padding: 0;*/
}
.beijing {
  position: fixed;
  top: 302px;
  left: 936px;
  /*size: mini;*/
}
.xian {
  position: fixed;
  top: 375px;
  left: 823px;
  /*size: mini;*/
}
.tianjin {
  position: fixed;
  top: 315px;
  left: 943px;
  /*size: mini;*/
}
.chongqing {
  position: fixed;
  top: 460px;
  left: 792px;
  /*size: mini;*/
}
.kunming {
  position: fixed;
  top: 540px;
  left: 670px;
  /*size: mini;*/
}
.nanjing {
  position: fixed;
  top: 410px;
  left: 1000px;
  /*size: mini;*/
}
.changsha {
  position: fixed;
  top: 495px;
  left: 865px;
  /*size: mini;*/
}
</style>
