<template>
  <div class="personalCenter">
    <el-container>
      <el-header style="height: 40px">管理中心<el-button class="el-icon-s-home" @click="exit" type="primary" size="large" style="float: right; min-height:40px">退出</el-button></el-header>
      <el-container>
        <el-aside width="300px">
          <el-col :span="12">
            <div class="sub-title"></div>
            <div class="demo-basic--circle">
              <div class="img">
                <el-avatar :size="100" :src="circleUrl" :key="circleUrl" align="center"></el-avatar>
              </div>
              <div class="block">
                <span>ADMIN</span>
              </div>
            </div>
          </el-col>
          <el-input v-model="input3" type="text" placeholder="用户名" :disabled="true" show-word-limit></el-input>
          <el-input v-model="input4" placeholder="用户密码" :disabled="true" show-password></el-input>
<!--          <el-button-group style="float: right; padding: 3px 0" type="text">-->
<!--            <el-button @click="preservation" type="primary" size="medium" round>保存</el-button>-->
<!--          </el-button-group>-->
          <img src="../assets/pictures/4.png" height="40%" width="15%" style="position: absolute; top: 380px; left: 25px"/>
        </el-aside>
        <el-container>
          <el-main style="background-color: #ffffff">
            <el-tabs type="border-card">
              <el-tab-pane label="用户信息">
                <el-card class="box-card">
                  <div slot="header" class="clearfix" style="height: 20px">
                    <el-button-group style="float: left; padding: 3px 0" type="text">
                      <el-button @click="add1" type="primary" size="medium"><i class="el-icon-circle-plus"></i>增加</el-button>
                      <el-input type= "search" v-model="search" style= "width:70%" placeholder= "请输入关键字" />  
                    </el-button-group>
                  </div>
                  <div>
                    
                    <el-table :data="tableData1.slice((currentPage1-1)*pageSize1,currentPage1*pageSize1)" style="width: 100%" :row-style="{height: '0'}" :cell-style="{padding: '0'}" :header-cell-style="{'text-align':'center'}">
                      
                      <el-table-column label="用户名" width="150" align="center"  >
                        <template slot-scope="scope">
                          <el-input placeholder="请输入内容" v-show="false" v-model="scope.row.username1"></el-input>
                          <span v-show="!scope.row.show" v-html=" showDate( scope.row.username1)">{{scope.row.username1}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="用户密码" width="150" align="center" >
                        <template slot-scope="scope">
                          <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.password1"></el-input>
                          <span v-show="!scope.row.show" v-html=" showDate( scope.row.password1)">{{scope.row.password1}}</span>
                        </template>
                      </el-table-column>

                      <el-table-column label="用户邮箱" width="450" align="center" >
                        <template slot-scope="scope">
                          <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.mail1"></el-input>
                          <span v-show="!scope.row.show" v-html=" showDate( scope.row.mail1)">{{scope.row.mail1}}</span>
                        </template>
                      </el-table-column>

                      <el-table-column label="操作" width="400">
                        <template slot-scope="scope">
                       <span style="display: block;text-align: center;" >
 
                        <el-button type="primary" circle class="el-icon-edit" @click="scope.row.show =true"></el-button>
                        <el-button type="success" circle class="el-icon-circle-check" @click="scope.row.show =false, save1(scope.$index)"></el-button >
                        <el-button type="danger"  circle class="el-icon-delete" @click="delect1(scope.$index)"></el-button>
                      <!-- <el-button class="el-icon-edit" @click="scope.row.show =true"></el-button>
                      <el-button class="el-icon-circle-check" @click="scope.row.show =false"></el-button>
                      <el-button class="el-icon-delete" @click="delect1(scope.$index)"></el-button> -->
                       </span>
                        </template>
                      </el-table-column>
                    </el-table>
                                          
                    <div CLASS="block" style="margin-top: 15px" >
                      
                      <el-pagination align='center'
                                     @size-change="handleSizeChange1"
                                     @current-change="handleCurrentChange1"
                                     :current-page="currentPage1"
                                     :page-sizes="[7, 8, 9]"
                                     :page-size="pageSize1"
                                     layout="total, sizes, prev, pager, next, jumper"
                                     :total="tableData1.length"
                                     >
                      </el-pagination>
                    </div>
                  </div>
                </el-card>
              </el-tab-pane>

              <el-tab-pane label="管理员信息">
                <el-card class="box-card">
                  <div slot="header" class="clearfix" style="height: 20px">
                    <el-button-group style="float: left; padding: 3px 0" type="text">
                      <el-button @click="add2" type="primary" size="medium"><i class="el-icon-circle-plus"></i>增加</el-button>
                      <!-- <el-input type= "search" v-model="search2" style= "width:70%" placeholder= "请输入关键字"> -->
                    </el-button-group>
                  </div>
                  <div>
                    <el-table :data="tableData2.slice((currentPage2-1)*pageSize2,currentPage2*pageSize2)" style="width: 100%" :row-style="{height: '0'}" :cell-style="{padding: '0'}" :header-cell-style="{'text-align':'center'}">
                      <el-table-column label="管理员昵称" width="150" align="center">
                        <template slot-scope="scope">
                          <el-input placeholder="请输入内容" v-show="false" v-model="scope.row.username2"></el-input>
                          <span v-show="!scope.row.show" >{{scope.row.username2}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="管理员密码" width="150" align="center">
                        <template slot-scope="scope">
                          <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.password2"></el-input>
                          <span v-show="!scope.row.show" >{{scope.row.password2}}</span>
                        </template>
                      </el-table-column>

                      <el-table-column label="管理员邮箱" width="450" align="center">
                        <template slot-scope="scope">
                          <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.mail2"></el-input>
                          <span v-show="!scope.row.show" >{{scope.row.mail2}}</span>
                        </template>
                      </el-table-column>

                      <el-table-column label="操作" width="400">
                        <template slot-scope="scope">
                       <span style="display: block;text-align: center;" >
                      <el-button type="primary" circle class="el-icon-edit" @click="scope.row.show =true"></el-button>
                      <el-button type="success" circle class="el-icon-circle-check" @click="scope.row.show =false, save2(scope.$index)"></el-button >
                      <el-button type="danger"  circle class="el-icon-delete" @click="delect2(scope.$index)"></el-button>
                       </span>
                        </template>
                      </el-table-column>
                    </el-table>
                    <div CLASS="block" style="margin-top: 15px">
                      <el-pagination align='center'
                                     @size-change="handleSizeChange2"
                                     @current-change="handleCurrentChange2"
                                     :current-page="currentPage2"
                                     :page-sizes="[7, 8, 9]"
                                     :page-size="pageSize2"
                                     layout="total, sizes, prev, pager, next, jumper"
                                     :total="tableData2.length">
                      </el-pagination>
                    </div>
                  </div>
                </el-card>
              </el-tab-pane>
              

              <el-tab-pane label="用户流量监测">
                
                              <div id="b">
                <newLineChart ref="childChart" class="zhexiantu"></newLineChart>
              </div>
              </el-tab-pane>
            </el-tabs>

          </el-main>
        </el-container>
      </el-container>
    </el-container>

   <el-dialog title="确认修改" :visible.sync="dialogFormVisible">
          <!-- 在el-dialog中进行嵌套el-form实现弹出表格的效果 -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item prop="password">
              <el-input
                class="password"
                v-model="ruleForm.password"
                placeholder="密码"
              ></el-input>
            </el-form-item>

            <el-form-item prop="mail">
              <el-input
                v-model="ruleForm.mail"
                placeholder="邮箱"
              ></el-input>  
            </el-form-item>
          </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
            <!-- 设置触发更新的方法 -->
        <el-button type="primary" @click="update">确 定</el-button>
      </div>

    </el-dialog> 


    <el-dialog title="增加用户" :visible.sync="addDialogVisible">
          <!-- 在el-dialog中进行嵌套el-form实现弹出表格的效果 -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item prop="username">
              <el-input
                v-model="ruleForm.username"
                placeholder="用户名"
              ></el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                class="password"
                v-model="ruleForm.password"
                placeholder="密码"
              ></el-input>
            </el-form-item>

            <el-form-item prop="mail">
              <el-input
                v-model="ruleForm.mail"
                placeholder="邮箱"
              ></el-input>  
            </el-form-item>
          </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel2">取 消</el-button>
          <!-- 设置触发更新的方法 -->
        <el-button type="primary" @click="update2">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="确认删除" :visible.sync="deleteDialogVisible">
          <!-- 在el-dialog中进行嵌套el-form实现弹出表格的效果 -->
      <div>
        确认删除
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel3">取 消</el-button>
          <!-- 设置触发更新的方法 -->
        <el-button type="primary" @click="update3">确 定</el-button>
      </div>
    </el-dialog>  
  </div>

  
</template>
<script>
import newLineChart from '../components/newLineChart.vue'
export default {
  name: 'PersonalCenter',
  components: {
    newLineChart
  },
  data () {
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
    return {
      search: '',
      search2: '',
      dialogFormVisible:false,
      addDialogVisible:false,
      deleteDialogVisible:false,
      // operation:0,
      operationIndex:-1,
      pageIndex:0,


      ruleForm: {
        username: "",
        password: "",
        mail: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },


      baseUserName:'',
      basePassword:'',
      trafficData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//六个流量数据
      allUserMsg:[],
      managerMsg:[],//管理员
      commonUserMsg:[],//普通用户




      currentPage1: 1,
      total1: '',
      pageSize1: 7,
      totalPage1: '',
      currentPage2: 1,
      total2: '',
      pageSize2: 7,
      totalPage2: '',
      tableData1: [
        // {username1: 'qwe', password1: '123456', mail1: '1348619724@qq.com',  show: false},
        // {username1: 'rty', password1: '123456', mail1: '3254779001@qq.com', show: false},
        // {username1: 'uio', password1: '123456', mail1: '3254779001@qq.com', show: false},
        // {username1: 'ppp', password1: '123456', mail1: '3254779001@qq.com', show: false},
        // {username1: 'asd', password1: '123456', mail1: '3254779001@qq.com', show: false},
        // {username1: 'fgh', password1: '123456', mail1: '3254779001@qq.com', show: false},
        // {username1: 'jkl', password1: '123456', mail1: '3254779001@qq.com', show: false},
        // {username1: 'Keep', password1: 'Keepinmind', mail1: '3254779001@qq.com', show: false},
        // {username1: 'wnd', password1: 'nmslsl', mail1: '1348619724@qq.com', show: false},
        // {username1: '123', password1: '123123', mail1: '3254779001@qq.com', show: false}
      ],
      tableData2: [
        // {username2: 'byx', password2: '111111', mail2: '3493571335@qq.com', show: false},
        // {username2: 'cjz', password2: '222222', mail2: '1348619724@qq.com', show: false},
        // {username2: 'hill', password2: 'jiangshan', mail2: '740702531@qq.com', show: false},
        // {username2: 'qiutong', password2: '111111', mail2: '1348619724@qq.com', show: false},
        // {username2: 'fxy', password2: '12341234', mail2: '1348619724@qq.com', show: false},
        // {username2: 'czj', password2: '111111', mail2: '1348619724@qq.com', show: false},
      ],
      input3: '巴依老爷',
      input4: '111111',
      circleUrl:
        'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    }
  },
  methods: {
    showDate(val) {
      if (
        val.indexOf(this.page.searchCode) !== -1 && 
        this.page.searchCode !== ''
      ) {
        return val.replace(
          this.page.searchCode,
          '<font color="#f00">' + this.page.searchCode + '</font>'
        )
      } else {
        return val
      }
    },
    judgeQQMail(str){
      let reg = new RegExp(
        "^[0-9]+@qq\.com+$"
      );
      if (str == "") {
        this.$message.error("请输入qq邮箱");
        return false;
      }

      if (!reg.test(str)) {
        //正则验证不通过，格式不对
        this.$message.error("格式不对,请输入qq邮箱");
        return false;
      } else {
        // this.$message({
        //   type: "success",
        //   message: "成功",
        // });
      }
      return true;
    },
    // 每页条数改变时触发 选择一页显示多少行
    handleSizeChange1 (val) {
      console.log(`每页 ${val} 条`)
      this.currentPage1 = 1
      this.pageSize1 = val
    },
    handleSizeChange2 (val) {
      console.log(`每页 ${val} 条`)
      this.currentPage2 = 1
      this.pageSize2 = val
    },
    // 当前页改变时触发 跳转其他页
    handleCurrentChange1 (val) {
      console.log(`当前页: ${val}`)
      this.currentPage1 = val
    },
    handleCurrentChange2 (val) {
      console.log(`当前页: ${val}`)
      this.currentPage2 = val
    },


    //删除1
    delect1 (index) {
      // this.operation = 2;
      this.operationIndex = index + (this.currentPage1 - 1) * this.pageSize1;
      this.pageIndex = 1;
      this.deleteDialogVisible=true;
    },
    delect1Op(index) {
      // console.log("delect1op")
      this.tableData1.splice(this.operationIndex, 1);
      this.total1 = this.tableData1.length;
      this.totalPage1 = Math.ceil((this.total1) / this.pageSize1) // 总页数
      if (this.currentPage1 > this.totalPage1) {
        this.currentPage1 = this.totalPage1
      } else if (this.currentPage1 < 1) {
        this.currentPage1 = 1
      } else {
        this.currentPage1 = this.currentPage1
      }
      // this.currentPage = this.currentPage > totalPage ? this.currentPage : (this.currentPage - 1)
      // this.currentPage = this.currentPage < 1 ? 1 : this.currentPage
    },


    //删除2
    delect2 (index) {
      // this.operation = 2;
      this.operationIndex = index + (this.currentPage2 - 1) * this.pageSize2;
      this.pageIndex = 2;
      this.deleteDialogVisible=true;
    },

    delect2Op(index) {
      // console.log("delect2op")
      this.tableData2.splice(this.operationIndex, 1)
      this.total2 = this.tableData2.length
      this.totalPage2 = Math.ceil((this.total2) / this.pageSize2) // 总页数
      if (this.currentPage2 > this.totalPage2) {
        this.currentPage2 = this.totalPage2
      } else if (this.currentPage2 < 1) {
        this.currentPage2 = 1
      } else {
        this.currentPage2 = this.currentPage2
      }
    },

    //删除对话框
    cancel3(){
      this.deleteDialogVisible=false;
    },
    update3(){
      let sendArr = [];
      let succ = true;
      let sentMsg = "";
      if(this.pageIndex == 1){
        sendArr = this.tableData1;
        sentMsg = sendArr[this.operationIndex].username1;
        // this.delect1Op(this.operationIndex);
      } else if(this.pageIndex == 2){
        sendArr = this.tableData2;
        sentMsg = sendArr[this.operationIndex].username2
        // this.delect2Op(this.operationIndex);
      }

      let params = {
        id: sentMsg,
      }
      console.log("del");
      console.log(params);
      this.$api.deleteUser(params, {type: "json"}).then((res)=>{
        if(res.msg == 200){
          succ = true;
          this.$message({
            type: "success",
            message: "删除成功",
          });
        } else {
          this.$message.error("删除失败");
          succ = false;
        }
      });

      if(!succ){

        return;
      }
      if(this.pageIndex == 1){
        this.delect1Op(this.operationIndex);
      } else if(this.pageIndex == 2){
        this.delect2Op(this.operationIndex);
      }
      //发送sendArr对应的this.operationIndex（即sendArr[this.operationIndex]）的用户名， 请求删除：/deleteUser
      this.deleteDialogVisible=false;
    },





    // 增加：首先弹出对话框，然后输入所有的信息包括用户名，密码，邮箱，然后在update里传输数据，
    //       数据除了传输也要在本地保存一份（this.addMsg），然后在界面上增加一条信息
    // 增加1
    add1 () {
      this.pageIndex = 1;
      this.addDialogVisible=true;
      this.operationIndex = 1;
    },

    add1Op(username, password, mail){
      let list = {username1: username, password1: password,mail1: mail, show: false}
      this.tableData1.push(list)
      this.total1 = this.tableData1.length
      this.totalPage1 = Math.ceil((this.total1) / this.pageSize1)
      this.currentPage1 = this.totalPage1
    },

    add2 () {
      this.pageIndex = 2;
      this.addDialogVisible=true;
      this.operationIndex = 2;
    },

    //增加2
    add2Op(username, password, mail) {
      this.addDialogVisible=true;
      let list = {username2: username, password2: password, mail2: mail, show: false}
      this.tableData2.push(list)
      this.total2 = this.tableData2.length
      this.totalPage2 = Math.ceil((this.total2) / this.pageSize2)
      this.currentPage2 = this.totalPage2
    },



    // 增加对话框
    cancel2(){
      this.addDialogVisible=false;
    },
    update2(){
      let succ = true;
      if(this.ruleForm.username == "" ){
        this.$message.error("请输入用户名");
        return;
      }
      if(this.ruleForm.password == ""){
        this.$message.error("请输入密码");
        return;
      }
      if( !this.judgeQQMail(this.ruleForm.mail) ){
        return;
      }
      //直接发送用户名密码邮箱，/addUser
      let symbol = "0";
      if(this.operationIndex == 1){
        symbol = "1";
      } else if (this.operationIndex == 2){
        symbol = "0";
      }
      let params = {
        id:this.ruleForm.username,
        password: this.ruleForm.password,
        mail: this.ruleForm.mail,
        sy:symbol,
      }
      console.log("add");
      console.log(params);

      this.$api.addUser(params, { type: "json" }).then((res) => {
        if(res.msg == 200){
          succ = true;
          this.$message({
            type: "success",
            message: "增加成功",
          });
          this.ruleForm.username = "";
          this.ruleForm.password = "";
          this.ruleForm.mail = "";
        } else if (res.msg == 400) {
          this.$message.error("用户名已存在");
          succ = false;
        }
      });

      if(!succ){ 
        return;
      }


      if(this.pageIndex == 1){
        this.add1Op(this.ruleForm.username, this.ruleForm.password, this.ruleForm.mail);
      } else if(this.pageIndex == 2){
        this.add2Op(this.ruleForm.username, this.ruleForm.password, this.ruleForm.mail);
      }
      

      this.addDialogVisible=false;
    },




    //保存：在update里发送即可
    //保存1
    save1(index){
      // this.operation=1;//保存
      this.operationIndex = index + (this.currentPage1 - 1) * this.pageSize1 ;
      this.pageIndex = 1;
      this.dialogFormVisible=true;
    },
    //保存2
    save2(index){
      this.operationIndex = index + (this.currentPage2 - 1) * this.pageSize2;
      // this.operation=1;//保存
      this.pageIndex = 2;
      this.dialogFormVisible=true;
    },

    //保存修改对话框
    cancel(){
      this.dialogFormVisible=false;
    },
    update(){
      let sendArr = [];
      let succ = true;
      let sentMsg = "";
      if(this.ruleForm.password == ""){
        this.$message.error("请输入密码");
        return;
      }
      if( !this.judgeQQMail(this.ruleForm.mail) ){
        return;
      }
      if(this.pageIndex == 1){
        sendArr = this.tableData1;
        sentMsg = sendArr[this.operationIndex].username1;
        // this.delect1Op(this.operationIndex);
      } else if(this.pageIndex == 2){
        sendArr = this.tableData2;
        sentMsg = sendArr[this.operationIndex].username2
        // this.delect2Op(this.operationIndex);
      }

      let params = {
        id:sentMsg,
        password: this.ruleForm.password,
        mail: this.ruleForm.mail,
      }
      
      console.log("save");
      console.log(params);
      this.$api.saveChange(params, {type: "json"}).then((res)=>{
        if(res.msg == 200){
          succ = true;
          this.$message({
            type: "success",
            message: "修改成功",
          });
        if(this.pageIndex == 1){
          this.tableData1[this.operationIndex].password = this.ruleForm.password;
          this.tableData1[this.operationIndex].mail = this.ruleForm.mail;
        } else if(this.pageIndex == 2){
          this.tableData2[this.operationIndex].password = this.ruleForm.password;
          this.tableData2[this.operationIndex].mail = this.ruleForm.mail;
        }
        window.location.reload();
          // this.ruleForm.username = "";
          this.ruleForm.password = "";
          this.ruleForm.mail = "";
        } else {
          this.$message.error("修改失败");
          succ = false;
        }
      });
      //发送sendArr中的this.operationIndex（即sendArr[this.operationIndex]）的用户名，密码，邮箱 /saveChange
      
      this.dialogFormVisible=false;
    },



    exit () {
      //回到登录界面
      this.$router.push("/Login");
    },

    //TODO
    init(){
      // trafficData: [],//六个流量数据
      // managerMsg:[],//管理员
      // commonUserMsg
      //请求所有数据并展示  1：用户 2 管理员 3 点击量
      let params={
        a1:'asd',
      }
      this.baseUserName = this.$route.query.user;

      this.basePassword = this.$route.query.password
      this.input3 = this.baseUserName;
      this.input4 = this.basePassword;
      let userMsgs = {username:'', password: '', mail: '', symbol: ''};
      // console.log(userMsgs);
      let str = "";
      this.trafficData = [0,0,0,0,0,0,0,0,0,0,0,0];
      this.$api.initManager(params, {type: "json"}).then((res)=>{
        let resdata=JSON.parse(JSON.stringify(res));  

        // console.log("运行记录组件接到的数据",resdata);
        // console.log(Array.isArray(resdata));
        for(let i in resdata){
          if(i <= 11){
            this.trafficData[i]=Number(resdata[i]);
          } else {
            if( i % 4 == 0 ){
              userMsgs.username = resdata[i];
            } else if ( i % 4 == 1 ){
              userMsgs.password = resdata[i];
            }else if ( i % 4 == 2 ){
              userMsgs.mail = resdata[i];
            }else if ( i % 4 == 3 ){
              userMsgs.symbol = resdata[i];
            }
            // console.log(userMsgs)
            if( i % 4 == 3){
              if(userMsgs.symbol == "1"){
                let list = {username1: userMsgs.username, password1: userMsgs.password,mail1: userMsgs.mail, show: false};
                this.tableData1.push(list);
                this.total1 = this.tableData1.length
                this.totalPage1 = Math.ceil((this.total1) / this.pageSize1)
                this.currentPage1 = this.totalPage1
              } else if(userMsgs.symbol == "0"){
                let list = {username2: userMsgs.username, password2: userMsgs.password,mail2: userMsgs.mail, show: false};
                this.tableData2.push(list);
                this.total2 = this.tableData2.length
                this.totalPage2 = Math.ceil((this.total2) / this.pageSize2)
                this.currentPage2 = this.totalPage2
              } 
              
              // this.allUserMsg.push(userMsgs);
              userMsgs={username:'', password: '', mail: '', symbol: ''};
            }
            this.currentPage1 = 1;
            this.currentPage2 = 1;
          }
        }
        this.initChart(this.trafficData);
        // console.log(this.allUserMsg);
        // console.log(this.allUserMsg.mail);
      });
      let newArr = this.trafficData;
      // console.log(newArr)
      
    },

    initChart(data){
      this.$refs.childChart.init(data);
    },
    showDate( val) {
      val = val + '';
      if ( val. indexOf( this. search) !== - 1 && this. search !== '') {
        return val. replace( this. search, '<font color="#409EFF">' + this. search + '</font>')
      } else {
        return val;
      }
    }
  },
  computed: {
        // 实时监听表格
      tables: function() {
        const search = this. search
          if (search) {
              return this. tableData. filter( dataNews => {
                return Object. keys(dataNews). some( key => {
                  return String(dataNews[key]). toLowerCase(). indexOf(search) > - 1
                })
              })
          }
          return this.tableData
      }
  },
  mounted(){
    this.init();
  }
}
</script>
<style>
#b{
  width: 100%;
  height: 100%;
  position: fixed;
}
.zhexiantu{
  position: fixed;
  top: 40px;
  left: 20px;
  margin-top:60px;
  margin-left:50px;
  height: 400px;
  width: 1000px;
  /*height: 70%;*/
  /*width: 65%;*/
  /*right: 50px;*/
}
.el-header {
  line-height: 40px;
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
  align: 'center';
  margin-top: 30px;
  margin-left: 100px;
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
.clearfix:before{
  height: 50px;
}
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  top: 100px;
  width: 1368px;
  height: 560px;
  border-radius: 30px;
}

body .el-scrollbar__wrap {
    overflow-x: hidden;
}
</style>
