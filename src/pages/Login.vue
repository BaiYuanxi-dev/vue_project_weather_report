<template>
  <div class="login">
    <div class="header">
      <div class="header-container">
        <img class="logo" src="../assets/image/logo.gif" alt="" />
        <div class="slogan">One world, One dream!</div>
      </div>
    </div>
    <div class="login-container">
      <div class="login-form">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <el-form-item>
            <h1 class="login-title">登录</h1>
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

          <!--登录按钮-->
          <el-form-item>
            <el-button class="submit-btn" type="primary" @click="submitForm">
              登录
            </el-button>
          </el-form-item>

          <div class="action-btns">
            <!--注册-->
            <el-button class="register-btn" type="success" @click="regist">
              注册
            </el-button>
            <!--忘记密码-->
            <el-button class="forget-pw-btn" type="info" @click="forget">
              忘记密码
            </el-button>
          </div>
        </el-form>

        <el-dialog title="忘记密码" :visible.sync="dialogFormVisible">
          <!-- 在el-dialog中进行嵌套el-form实现弹出表格的效果 -->
          <el-form :model="newRuleForm" :rules="newRules" ref="newRuleForm">
            <el-form-item prop="username">
              <el-input
                v-model="newRuleForm.username"
                placeholder="用户名"
              ></el-input>
            </el-form-item>

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
            <!-- 新密码 -->
            <el-form-item prop="newPass">
              <el-input
                type="password"
                v-model="newRuleForm.newPass"
                placeholder="新密码"
              ></el-input>
            </el-form-item>
            <!--确认新密码-->
            <el-form-item prop="newCheckPass">
              <el-input
                type="password"
                v-model="newRuleForm.newCheckPass"
                placeholder="确认新密码"
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
// import register from 'Register.vue'
// components:{
//   register
// }
export default {
  data() {
    //第一步检测
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        //回调该函数
        callback();
      }
    };

    var validatePass3 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.newRuleForm.newCheckPass !== "") {
          this.$refs.newRuleForm.validateField("newCheckPass");
        }
        //回调该函数
        callback();
      }
    };
    var validatePass4 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.newRuleForm.newPass) {
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
        verificationCode: "",
      },
      newRuleForm: {
        username: "",
        mail: "",
        vertify: "",
        newPass: "",
        newCheckPass: "",
      },
      dialogFormVisible: false,

      //第二步检测
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
      },

      newRules: {
        username: [
          { required: true, message: "请输入您的名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        newPass: [
          { required: true, validator: validatePass3, trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        newCheckPass: [
          { required: true, validator: validatePass4, trigger: "blur" },
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
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          //发送登录请求
          //要发送的参数：id和password
          let params = {
            id: this.ruleForm.name,
            password: this.ruleForm.pass,
          };

          this.$api.login(params, { type: "json" }).then((res) => {
            if (res.msg == 202) {
              this.$message({
                type: "success",
                message: "登录成功",
              });
              // this.$root.username = this.ruleForm.name

              // this.Global.username = this.ruleForm.name
              this.$router.push("/Home");
              //进行页面跳转
            } else if (res.msg == 200){
              //向某个页面传数据。
              this.$router.push({ name: "manage", query: { user: this.ruleForm.name, password: this.ruleForm.pass } });
            } else if (res.msg == 201) {
              this.$message.error("密码错误");
            } else if (res.msg == 400) {
              this.$message.error("该用户不存在");
            } else if (res.msg == 202) {
            }
          });
          // params={
          //   n:"1",
          // }
          // this.$api.login(params, { type: "json" }).then((res) => {
          //   console.log(res);
          //   // if (res.msg == 200) {
          //   //   this.$message({
          //   //     type: "success",
          //   //     message: "登录成功",
          //   //   });
          //   //   //进行页面跳转
          //   // } else {
          //   //   this.$message.error("密码错误");
          //   // }
          // });
        }
      });
    },
    regist() {
      //进入注册页面
      this.$router.push("/register");
    },
    forget() {
      this.dialogFormVisible = true;
    },
    //获取验证码
    getVertify() {
      let params = {
        username: this.newRuleForm.username,
        mail: this.newRuleForm.mail,
      };
      if (this.newRuleForm.username == "") {
        this.$message.error("请输入用户名");
        return;
      }
      // // console.log(this.newRuleForm.username);

      this.$api.newVertify(params, { type: "json" }).then((res) => {
        if (res.msg == 400) {
          this.$message.error("该用户不存在,请重新输入");
        } else if (res.msg == 401){
          this.$message.error("该邮箱与账号注册邮箱不一致");
          this.newRuleForm.mail = "";
        }
      });
    },

    cancel() {
      this.newRuleForm.username = "";
      this.newRuleForm.mail = "";
      this.newRuleForm.vertify = "";
      this.newRuleForm.newPass = "";
      this.newRuleForm.newCheckPass = "";
      this.dialogFormVisible = false;
    },

    update() {
      this.$refs.newRuleForm.validate((valid) => {
        if (valid) {
          //发送登录请求
          //要发送的参数：id和password
          let params = {
            password: this.newRuleForm.newPass,
            verti: this.newRuleForm.vertify,
            mail: this.newRuleForm.mail,
          };

          this.$api.forgetPass(params, { type: "json" }).then((res) => {
            if (res.msg == 200) {
              this.$message({
                type: "success",  
                message: "修改成功",
              });
            this.newRuleForm.username = "";
            this.newRuleForm.mail = "";
            this.newRuleForm.vertify = "";
            this.newRuleForm.newPass = "";
            this.newRuleForm.newCheckPass = "";
            this.dialogFormVisible = false;
            } else if (res.msg == 400) {
              this.$message.error("验证码错误");
            } else if (res.msg == 402){
              this.$message.error("注册邮箱与验证邮箱不一致");
            }
          });

        }
      });
    },
  },
};
</script>


<style scoped lang="less">
/*登录页面*/
.login {
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
        margin: 40px 100px 0px 250px;
        font-family: 包图小白体;
        font-size: 80px;
        color: white;
        -webkit-box-reflect: below 60px -webkit-gradient(linear, 0 0, 0 100%, from(transparent), color-stop(0.4, transparent), to(rgba(3, 3, 3, 0.8)));
      }
    }
  }
}

.login-container {
  width: 1200px;
  height: calc(100vh - 80px);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-form {
    width: 400px;
    height: 300px;
    padding: 13px;
    background-color: rgba(240, 255, 255, 0.8);
    border-radius: 10px;
    text-align: center;

    .login-title {
      color: black;
      font-size: 32px;
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

  .el-form-item__content {
    display: flex;
  }

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
