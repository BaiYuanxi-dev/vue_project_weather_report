<template>
  <div class="personalCenter">
    <el-container>
      <el-header>个人中心</el-header>
      <el-container>
        <!-- 左盒子 -->
        <el-aside width="360px">
          <el-col :span="12">
            <!-- <div class="sub-title"></div> -->
            <div class="demo-basic--circle">
              <div class="img">
                <el-avatar
                  :size="100"
                  :src="circleUrl"
                  :key="circleUrl"
                  align="center"
                ></el-avatar>
              </div>
              <div class="block">
                <span>ADMIN</span>
              </div>
            </div>
          </el-col>
          <!--          <el-input v-model="input1" type="text" placeholder="用户ID" maxlength="6" show-word-limit></el-input>-->
          <el-input
            v-model="input3"
            type="text"
            placeholder="用户名"
            :disabled="true"
            show-word-limit
          ></el-input>
          <el-input
            v-model="input4"
            placeholder="用户密码"
            :disabled="true"
            show-password
          ></el-input>
          <el-input
            v-model="input5"
            type="text"
            placeholder="用户姓名"
            show-word-limit
          ></el-input>
          <!--          <el-input v-model="input6" type="text" placeholder="用户权限" maxlength="2" show-word-limi></el-input>-->
          <el-input v-model="input7" placeholder="邮箱" :disabled="true"
            ><template slot="append">@qq.com</template></el-input
          >
          <el-input
            v-model="input8"
            type="text"
            placeholder="手机号码"
            minlength="11"
            maxlength="11"
            show-word-limit
          ></el-input>
          <!--          <el-input v-model="input9" type="text" placeholder="固定电话" maxlength="20" show-word-limit></el-input>-->
          <el-button-group style="float: right; padding: 3px 0" type="text">
            <el-button @click="back" type="primary" size="medium" round
              >退出</el-button
            >
            <el-button @click="preservation" type="primary" size="medium" round
              >保存</el-button
            >
          </el-button-group>
          <img
            src="../assets/pictures/4.png"
            height="40%"
            width="15%"
            style="position: absolute; top: 560px; left: 65px"
          />
        </el-aside>

        <el-container>
          <el-main>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="float: left"><b>账户修改</b></span>
                <el-button-group
                  style="float: right; padding: 3px 0"
                  type="text"
                >
                  <el-button @click="update" type="primary" size="medium" round
                    ><i class="el-icon-upload el-icon--right"></i
                    >上传信息</el-button
                  >
                  <el-button @click="exit" type="primary" size="medium" round
                    ><i class="el-icon-right"></i>返回首页</el-button
                  >
                </el-button-group>
              </div>
              <div>
                <el-table :data="tableData" style="width: 100%">
                  <el-table-column label="邮箱" width="220">
                    <template slot-scope="scope">
                      <el-input
                        v-model="input03"
                        type="text"
                        :disabled="disabledId"
                        show-word-limit
                      ></el-input>
                      <div slot="reference" class="name-wrapper"></div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button size="mini" @click="changeId">编辑</el-button>
                      <!--                      <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">解绑</el-button>-->
                    </template>
                  </el-table-column>
                  <el-table-column label="更多" align="center">
                    <el-row>
                      <el-button
                        type="info"
                        icon="el-icon-message"
                        circle
                      ></el-button>
                      <el-button
                        type="warning"
                        icon="el-icon-star-off"
                        circle
                      ></el-button>
                      <el-button
                        type="share"
                        icon="el-icon-share"
                        circle
                      ></el-button>
                    </el-row>
                  </el-table-column>
                </el-table>
              </div>
              <div>
                <el-table :data="tableData" style="width: 100%">
                  <el-table-column label="用户密码" width="220">
                    <template slot-scope="scope">
                      <el-input
                        v-model="input04"
                        type="text"
                        :disabled="disabledPassword"
                        show-password
                      ></el-input>
                      <div slot="reference" class="name-wrapper"></div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button size="mini" @click="changePassword"
                        >编辑</el-button
                      >
                      <!--                      <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">解绑</el-button>-->
                    </template>
                  </el-table-column>
                  <el-table-column label="更多" align="center">
                    <el-row>
                      <el-button
                        type="info"
                        icon="el-icon-message"
                        circle
                      ></el-button>
                      <el-button
                        type="warning"
                        icon="el-icon-star-off"
                        circle
                      ></el-button>
                      <el-button
                        type="share"
                        icon="el-icon-share"
                        circle
                      ></el-button>
                    </el-row>
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
            <el-card class="box-card">
              <div>
                <span style="float: left" shadow="hover"
                  ><b>历史上的今天</b></span
                >
                <br />
                <br />
                <span>{{ title0 }}&nbsp;&nbsp;{{ date0 }}</span>
                <el-divider></el-divider>
                <span>{{ title1 }}&nbsp;&nbsp;{{ date1 }}</span>
                <el-divider></el-divider>
                <span>{{ title2 }}&nbsp;&nbsp;{{ date2 }}</span>
                <el-divider></el-divider>
                <span>{{ title3 }}&nbsp;&nbsp;{{ date3 }}</span>
              </div>
            </el-card>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "User",
  created() {
    let now = new Date();
    let nowMonth = now.getMonth() + 1;
    nowMonth = nowMonth < 10 ? "0" + nowMonth : nowMonth;
    // console.log(nowMonth);
    let nowDay = now.getDate();
    nowDay = nowDay < 10 ? "0" + nowDay : nowDay;
    // console.log(nowDay);
    this.getSentence();
  },
  data() {
    return {
      //历史上的今天插件
      nowDay: "",
      nowMonth: "",
      title0: "",
      title1: "",
      title2: "",
      title3: "",
      date0: "",
      date1: "",
      date2: "",
      date3: "",
      disabledId: true,
      disabledPassword: true,
      // input1: '',
      // input2: '',
      // 用户昵称
      input3: "byx",
      // 用户密码
      input4: "111111",
      // 用户姓名
      input5: "BaiYuanxi",
      // input6: '',
      // 用户邮箱
      input7: "3493571335@qq.com",
      // 手机号码
      input8: "11122223333",
      // input9: '',
      input03: this.input7,
      input04: this.input4,
      circleUrl:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      sizeList: ["large"],
      tableData: [{}],
      userMsg: [],
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },

    preservation() {
      if(this.input8.length != 0){
        if(this.input8.length != 11){
          this.$message.error("请输入正确的手机号码");
          return;
        }
      }

      let params = {
        id: this.input3,
        password: this.input4,
        name: this.input5,
        mail: this.input7,
        phone: this.input8,
      };
      console.log(params);
      // //在此处将此时input5，7，8的值分别返回保存为用户姓名，邮箱，号码
      this.$api.saveMsg(params, { type: "json" }).then((res) => {
        if (res.msg == 200) {
          this.$message({
            type: "success",
            message: "修改成功",
        });
        } else {
          this.$message.error("修改失败");
        }
      });

    },

    back() {
      this.$router.push("/Login");
    },
    changeId() {
      this.disabledId = false;
    },
    changePassword() {
      this.disabledPassword = false;
    },
    update() {
      if (this.input03 == undefined) {

      } else {
        this.input7 = this.input03;
      }

      if (this.input04 == undefined) {
        
      } else {
        this.input4 = this.input04;
      }
      // console.log(this.input04);

      this.input4 = this.input04;
      this.disabledId = true;
      this.disabledPassword = true;
    },
    exit() {
      // 点击此处返回主页
      this.$router.push("/Home");
    },
    getSentence() {
      this.$axios
        .get(
          "http://api.tianapi.com/txapi/lishi/index?key=db50aac7518c6e4bea96d701786b1e01&date=" +
            this.nowMonth +
            this.nowDay
        )
        .then((res) => {
          // console.log("????????")
          // console.log(this.nowMonth + this.nowDay);
          this.title0 = res.data.newslist[0].title;
          this.title1 = res.data.newslist[1].title;
          this.title2 = res.data.newslist[2].title;
          this.title3 = res.data.newslist[3].title;
          // console.log(res.data.newslist[0].title);
          // console.log(res.data.newslist[1].title);
          // console.log(res.data.newslist[2].title);
          // console.log(res.data.newslist[3].title);
          this.date0 = res.data.newslist[0].lsdate;
          this.date1 = res.data.newslist[1].lsdate;
          this.date2 = res.data.newslist[2].lsdate;
          this.date3 = res.data.newslist[3].lsdate;
          // console.log(res.data.newslist[0].lsdate);
          // console.log(res.data.newslist[1].lsdate);
          // console.log(res.data.newslist[2].lsdate);
          // console.log(res.data.newslist[3].lsdate);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    init() {
      this.userMsg = this.$route.query.msgs;
      for(let i in this.userMsg){
          console.log(this.userMsg[i]);
        }
      this.input3 = this.userMsg[0];
      this.input4 = this.userMsg[1];
      this.input5 = this.userMsg[2];
      this.input7 = this.userMsg[3];
      this.input8 = this.userMsg[4];
      this.input03 = this.input7;
      this.input04 = this.input4;
      // this.input04 = this.userMsg[1];
    },
  },
  mounted() {
    
    this.init();
  },
};
</script>
<style>
.el-header {
  line-height: 60px;
  text-align: center;
  background-color: #b3c0d1;
}
.el-aside {
  line-height: 44px;
  text-align: center;
  /*background-color: lightskyblue;*/
}
.el-main {
  line-height: 36px;
  text-align: center;
  background-color: #e9eef3;
}

.demo-basic--circle {
  align: "center";
  margin-top: 30px;
  margin-left: 125px;
}
.block {
  margin-left: 25px;
  font-weight: bold;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 1125px;
  border-radius: 30px;
}
</style>
