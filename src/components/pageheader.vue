<template>
 <div class="outdiv">
   <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
     <img src="../assets/pictures/logo2.gif" height="80%" style="position: absolute; top: 7px; left: 9px"/>
     <span id="brand">渔溏天气研究所</span>
     <el-menu-item index="1" style="margin: 0px 0 5px 400px;"></el-menu-item>
<!--     <el-menu-item index="2">通知发布</el-menu-item>-->
   </el-menu>
   <el-button class='person' type="primary" icon="el-icon-edit" circle @click="enterUser"></el-button>
   <el-button class='city' type="primary" round @click="changeC">切换城市</el-button>
   <!--   <img src="../assets/pictures/logo2.gif" class="logo" align="middle">-->
<!--   <span id="brand">渔溏天气研究所</span>-->
 </div>
</template>

<script>
export default {
  name: 'pageheader',
  data(){
    return {
      userMsg:[],
    }
  },
  methods: {
    changeC(){
      this.$router.push("/changeCity");
    },
    enterUser(){
      let params = {
        id: "?",
      };
      this.userMsg = [];
      // console.log("?????")
      // console.log(this.$root.username)

      this.$api.initUser({ type: "json" }).then((res) => {
        //接下来，如何解析成json型
        let temp =JSON.parse(res);//将字符串转换成json对象
        let items = temp;
        // console.log(res)  
        for(let i in items){
          // console.log(res[i]);
          this.userMsg.push(items[i]);
        }

        this.$emit("userMsgGot",this.userMsg);
      });
      // this.$emit("userMsgGot",this.userMsg);
      // this.$router.push("/User");
    },
    activeIndex(){

    },
    handleSelect(){

    },
  }
}
</script>

<style scoped lang="less">
#brand{
  font-family: 包图小白体;
  font-size: 30px;
  color: black;
  position: fixed;
  top: 17px;
  left: 153px;
}
.outdiv{
  min-width: 1000px;
  overflow: hidden;
  /*width: 70%;*/
  /*position: center;*/
}
.logo{
  width: 140px;
  height: 80px;
  position: fixed;
  top: 20px;
}
.person{
  position: fixed;
  left: 1450px;
  height: 40px;
  top: 14.5px;
}
.city{
  position: fixed;
  left: 400px;
  height: 40px;
  top: 13.5px;
}


</style>
