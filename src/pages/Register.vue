//register组件
<template>
  <div class="regist">
    <div class="header">
      <div class="header-container">
        <img class="logo" src="../assets/image/logo.gif" alt="" />
        <div class="slogan">One world, One dream!</div>
      </div>
    </div>
    <div class="regist_container">
      <div class="regist_form">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <!--标题-->
          <el-form-item class="title_item">
            <h1 class="regist-title">注册</h1>
          </el-form-item>
          <!--用户名-->
          <el-form-item prop="name">
            <el-input v-model="ruleForm.name" placeholder="用户名"></el-input>
          </el-form-item>
          <!--密码-->
          <el-form-item prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              placeholder="密码"
            ></el-input>
          </el-form-item>
          <!--确认密码-->
          <el-form-item prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              placeholder="确认密码"
            ></el-input>
          </el-form-item>

          <!-- <el-form-item prop="mail">
            <el-input
              class="mailNum"
              v-model="ruleForm.mail"
              placeholder="qq邮箱"
            ></el-input>
            <el-button class="vertify-btn" type="success" @click="getVertify">
              获取验证码
            </el-button>
          </el-form-item>

          <el-form-item prop="vertify">
            <el-input
              v-model="ruleForm.vertify"
              placeholder="验证码"
            ></el-input>
          </el-form-item> -->

          <!-- <el-form-item>
            <el-button class="submit-btn" type="primary" @click="vertify">
              验证
            </el-button>
          </el-form-item> -->

          <div class="action-btns">
            <!--注册-->
            <el-button class="register-btn" type="success" @click="regist">
              注册
            </el-button>
            <!--忘记密码-->
            <el-button class="forget-pw-btn" type="info" @click="back">
              返回
            </el-button>
          </div>
        </el-form>

        <el-dialog title="验证" :visible.sync="dialogFormVisible">
          <!-- 在el-dialog中进行嵌套el-form实现弹出表格的效果 -->
          <el-form :model="newRuleForm">
            <el-form-item prop="mail">
              <el-input
                class="mailNum"
                v-model="newRuleForm.mail"
                placeholder="qq邮箱"
              ></el-input>
              <!-- 获取验证码 -->
              <el-button
                class="vertify-btn"
                type="primary"
                plain
                @click="getCaptcha"
                :disabled="flag"
                >{{ content }}
              </el-button>

            </el-form-item>

            <el-form-item prop="vertify">
              <el-input
                v-model="newRuleForm.vertify"
                placeholder="验证码"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <!-- 设置触发更新的方法 -->
            <el-button type="primary" @click="update">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
            // 验证码按钮
      flag: false, //按钮是否可取
      content: "发送验证码", //按钮内文本
      totalTime: 10, //倒计时时间
      activeName: "second",
      ruleForm: {
        name: "",
        pass: "",
        checkPass: "",
      },

      newRuleForm:{
        mail: "",
        vertify: "",
      },
      dialogFormVisible: false,

      rules: {
        name: [
          { required: true, message: "请输入您的名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        pass: [
          { required: true, validator: validatePass, trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    getCaptcha() {
      //判断是不是qq邮箱
      // [1-9]\d{7,10}@qq\.com
      let reg = new RegExp(
        "^[0-9]+@qq\.com+$"
      );
      let mailStr = this.newRuleForm.mail;
      if (this.newRuleForm.mail == "") {
        this.$message.error("请输入qq邮箱");
        return;
      }

      if (!reg.test(mailStr)) {
        //正则验证不通过，格式不对
        this.$message.error("格式不对,请输入qq邮箱");
        return;
      } else {
        // this.$message({
        //   type: "success",
        //   message: "成功",
        // });
      }
      this.flag = true; //点击之后设置按钮不可取
      this.content = this.totalTime + "s后重新发送"; //按钮内文本
      let clock = window.setInterval(() => {
        this.totalTime--;
        this.content = this.totalTime + "s后重新发送";
        if (this.totalTime < 0) {
          window.clearInterval(clock);
          this.content = "重新发送";
          this.totalTime = 10;
          this.flag = false; //这里重新开启
        }
      }, 1000);
      this.getVertify();
    },


    regist(formName) {
      var that = this;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.dialogFormVisible = true;
        }
      });
    },

    getVertify() {
      console.log(this.newRuleForm.mail)

      let params = {
        mail: this.newRuleForm.mail,
      };
      this.$api.vertify(params, { type: "json" }).then((res) => {

      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    back() {
      this.$router.push("/Login");
    },
    // 更新验证码
    changeImgCode() {},
    cancel() {
      this.dialogFormVisible = false;
    },
    update() {
      let params = {
        id: this.ruleForm.name,
        password: this.ruleForm.pass,
        verti: this.newRuleForm.vertify,
        mail: this.newRuleForm.mail,
      };
      // console.log(this.newRuleForm.vertify)

      this.$api.register(params, { type: "json" }).then((res) => {
        if (res.msg == 200) {
          this.$message({
            type: "success",
            message: "注册成功",
          });
          this.dialogFormVisible=false;
          
          this.$router.push("/Login");
          //进行页面跳转
        } else if (res.msg == 400) {
          this.$message.error("用户名已存在");
        } else if (res.msg == 401) {
          this.$message.error("验证码错误");
        } else if (res.msg == 402) {
          this.$message.error("注册邮箱与验证邮箱不一致");
        }
      });
    },
  },
};
</script>


<style scope lang="less">
/*登录页面*/
.regist {
  height: 100%;
  background-image: url(../assets/image/reg-bk.jpg);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;

  .header {
    min-width: 1200px;

    .header-container {
      float: left;
      width: 1200px;
      // margin: 0 auto;
      margin-left: 50px;
      height: 80px;
      display: flex;

      .logo {
        height: 80px;
      }
      .slogan {
        float: right;
        margin: 20px 20px 0px 250px;
        font-family: 包图小白体;
        font-size: 80px;
        color: white;
        -webkit-box-reflect: below 20px -webkit-gradient(linear, 0 0, 0 100%, from(transparent), color-stop(0.4, transparent), to(rgba(3, 3, 3, 0.8)));
      }
    }
  }
}

.regist_container {
  width: 1200px;
  height: calc(100vh - 80px);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  .regist_form {
    width: 400px;
    height: 300px;
    padding: 13px;
    background-color: rgba(240, 255, 255, 0.8);
    border-radius: 10px;
    text-align: center;
    margin-bottom: 40px;

    .regist-title {
      color: black;
      font-size: 26px;
      // font-family: 沐瑶随心手写体;
    }

    .submit-btn {
      width: 100%;
    }
  }
}

.mailNum {
  float: left;
  width: 540px;
}
.vertify-btn {
  float: right;
  width: 140px;
}
.action-btns {
  display: flex;

  .register-btn {
    width: 190px;
    flex-grow: 1;
  }
  .forget-pw-btn {
    width: 190px;
    flex-grow: 1;
  }
}
</style>
