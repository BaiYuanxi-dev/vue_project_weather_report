<template>
  <div class="wenzi">
    <!--  <p class="firstline">{{area}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{date}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{real}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{weather}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{wind}}</p>-->
    <p class="firstline">{{ area }}</p>
    <p class="sencondline">{{ real }}</p>
    <p class="thirdline">{{ weather }}</p>
    <p class="fourthline">{{ wind }}</p>
    <p class="zoreline">{{ date }}</p>
    <p class="poem">{{ content }}</p>
    <p class="poet">---{{ author }}《{{ source }}》</p>
    <p class="TIPS1">{{ tip.slice(0, 19) }}</p>
    <p class="TIPS2">{{ tip.slice(19, 38) }}</p>
    <p class="TIPS3">{{ tip.slice(38, 57) }}</p>
    <p class="TIPS4">{{ tip.slice(57, 76) }}</p>
    <p class="TIPS5">{{ tip.slice(76, 95) }}</p>

    <!--  <p class="TIPS">tips:{{ tip.slice(0,14) }}{{ tip.slice(14,29) }}{{ tip.slice(29,44) }}{{ tip.slice(44,60) }}</p>-->
  </div>
</template>

<script>
export default {
  name: 'wenbenkuang',
  // props:['cityMsg'],
  // watch:{
  //   cityMsg(){

  //     // console.log(this.cityMsg)
  //     if(this.cityMsg != "" && this.cityMsg != undefined && this.cityMsg != null){
  //       this.city = this.cityMsg;
  //       this.urlStr = 'http://api.tianapi.com/txapi/tianqi/index?key=8ab7d238f9356392ada4e2a56c5568c3&city=';
  //       this.urlStr += this.city;   
  //       // this.getClimate();
  //     } else {
  //       this.city = '北京市'
  //     }
  //   }
  // },
  data () {
    return {
      area: '',
      date: '',
      weather: '',
      real: '',
      wind: '',
      content: '',
      author: '',
      source: '',
      tip: '',
      city:'北京市',
      urlStr:'http://api.tianapi.com/txapi/tianqi/index?key=dcdc93765dfd26a9df44aed50086debd&city=北京市',
    }
  },
  // created () {
  //   this.getClimate()
  //   this.getSpeech()
  // },
  methods: {
    getClimate (city) {
      if(city == undefined){
        city = '北京市'
      }
      this.urlStr = 'http://api.tianapi.com/txapi/tianqi/index?key=dcdc93765dfd26a9df44aed50086debd&city=';
      this.urlStr += city;   
      // console.log(this.urlStr)
      this.$axios
        .get(this.urlStr)
        .then(res => {
          this.area = res.data.newslist[0].area
          // this.area = this.city;
          this.date = res.data.newslist[0].date
          this.weather = res.data.newslist[0].weather
          this.real = res.data.newslist[0].real
          this.wind = res.data.newslist[0].wind
          this.tip = res.data.newslist[0].tips
          // console.log(this.area)
          // console.log(this.date)
          // console.log(this.weather)
          // console.log(this.real)
          // console.log(this.wind)
          // console.log(this.tip)
        })
        .catch(function (error) {
          console.log(error)
        })
        
    },
    getSpeech () {
      this.$axios
        .get('http://api.tianapi.com/txapi/tianqishiju/index?key=dcdc93765dfd26a9df44aed50086debd')
        .then(res => {
          this.content = res.data.newslist[0].content
          this.author = res.data.newslist[0].author
          this.source = res.data.newslist[0].source
        })
        .catch(function (error) {
          console.log(error)
        })
    },
  },
}
</script>

<style scoped>
.wenzi {
  /* font-family: 仿宋; */
  font-size: 20px;
  position: relative;
}
.poem {
  position: fixed;
  top: 620px;
  left: 825px;
  /* right:200px;   */
  align-content: center;
}
.poet {
  position: fixed;
  bottom: 40px;
  right: 150px;
  align-content: center;
}
.TIPS1 {
  position: fixed;
  top: 360px;
  left: 80px;
}
.TIPS2 {
  position: fixed;
  top: 410px;
  left: 80px;
}
.TIPS3 {
  position: fixed;
  top: 460px;
  left: 80px;
}
.TIPS4 {
  position: fixed;
  top: 510px;
  left: 80px;
}
.TIPS5{
   position: fixed;
   top: 560px;
   left: 80px;
}
.firstline {
  /* font-family: 楷体; */
  font-size: 40px;
  position: fixed;
  top: 130px;
  left: 80px;
}
.sencondline {
  /* font-family: 楷体; */
  font-size: 60px;
  position: fixed;
  top: 180px;
  left: 80px;
}
.thirdline {
  /* font-family: 仿宋; */
  font-size: 30px;
  position: fixed;
  top: 250px;
  left: 80px;
}
.fourthline {
  /* font-family: 仿宋; */
  font-size: 30px;
  position: fixed;
  top: 250px;
  left: 280px;
}
.zoreline {
  font-size: 20px;
  position: fixed;
  top: 5px;
  left: 1650px;
}
/*.TIPS2{*/
/*  position: fixed;*/
/*  top: 250px;*/
/*  left: 360px;*/
/*}*/
/*.TIPS3{*/
/*  position: fixed;*/
/*  top: 300px;*/
/*  left: 270px;*/
/*}*/
/*.TIPS4{*/
/*  position: fixed;*/
/*  top: 350px;*/
/*  left: 180px;*/
/*}*/
</style>
