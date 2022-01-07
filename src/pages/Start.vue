<template>
  <div id="start">
    <!--    背景视频-->
    <div class="videocontainer">
      <!-- <video
        class="fullscreenvideo"
        poster="../assets/image/start/firstImg.jpg"
        id="bgvid"
        playsinline=""
        autoplay=""
        muted=""
        loop=""
      >
        <source src="../assets/image/start/bgVideo.mp4" type="video/mp4" />
      </video> -->
    </div>

    <!--    logo-->
    <div class="logo">
      <img class="logoimg" src="../assets/image/logo.gif" alt="logo" />
    </div>

    <p class="header">渔溏——天气研究所</p>
    <!--    <br>-->
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <div class="showTime">{{ nowTime }}</div>
    <div class="info">
      <p id="sun">{{area}}:{{lowest}}~{{highest}}</p>
      <p id="rain">One World, One Dream!</p>
    </div>
    <button class="button blue skew" data-icon="♞" @click="newView">
      Enter
    </button>
  </div>
</template>

<script>
export default {
  name: "Start",
  data() {
    return {
      nowTime: "",
      area: '',
      lowest: '',
      highest: ''
    };
  },
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
          this.lowest = res.data.newslist[0].lowest
          this.highest = res.data.newslist[0].highest
        })
        .catch(function (error) {
          console.log(error)
        })

    },
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? "0" + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1;
      let date =
        new Date(timeStamp).getDate() < 10
          ? "0" + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate();
      let hh =
        new Date(timeStamp).getHours() < 10
          ? "0" + new Date(timeStamp).getHours()
          : new Date(timeStamp).getHours();
      let mm =
        new Date(timeStamp).getMinutes() < 10
          ? "0" + new Date(timeStamp).getMinutes()
          : new Date(timeStamp).getMinutes();
      let ss =
        new Date(timeStamp).getSeconds() < 10
          ? "0" + new Date(timeStamp).getSeconds()
          : new Date(timeStamp).getSeconds();
      let week = new Date(timeStamp).getDay();
      let weeks = ["日", "一", "二", "三", "四", "五", "六"];
      let getWeek = "星期" + weeks[week];
      this.nowTime =
        year +"年" +month +"月" +date +"日" +" " +hh +":" +mm +":" +ss +getWeek;
    }, // 实时刷新当前时间，格式化
    nowTimes() {
      this.timeFormate(new Date());
      setInterval(this.nowTimes, 1000);
      this.clear();
    },
    clear() {
      clearInterval(this.nowTimes);
      this.nowTimes = null;
    },
    newView() {
      this.$router.push("/Login");
    },

    clickDocument() {
      console.log("???");
      this.$router.push("/Login");
    },
  },
  mounted() {
    this.nowTimes();
    this.getClimate();
  },
  beforeDestroy() {
    this.clear();
  },
};
</script>

<style scoped>
.fullscreenvideo {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -100;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  -webkit-transition: 1s opacity;
  transition: 1s opacity;
}

.videocontainer {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -100;
}

.videocontainer:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  display: block;
  z-index: -1;
  top: 0;
  left: 0;
  background: rgba(25, 29, 34, 0.65);
}
* {
  box-sizing: border-box;
}
body {
  margin: 0;
}

.logo {
  width: 250px;
  height: 125px;

  position: absolute;
  left: 2%;
  top: 2%;
}

.logo img {
  width: 100%;
  height: 100%;
  opacity: 0.4;
  filter: alpha(opacity=40);
}
.header {
  position: absolute;
  left: 50%;
  top: 100px;
  transform: translate(-50%, -50%);
  font-size: 75px;
  font-family: 包图小白体;
  color: white;
}

.info {
  text-align: center;
  font-size: xxx-large;
  font-family: 包图小白体;
  color: white;
  position:absolute;
  top:400px;
  left:570px
}
.showTime {
  text-align: center;
  font-size: xxx-large;
  font-family: 包图小白体;
  color: white;
  position:absolute;
  top:300px;
  left:470px

}
/* -------------- THE button -------------- */
.button {
  /* text */
  text-decoration: none;
  font: 24px/1em "Droid Sans", sans-serif;
  font-weight: bold;
  text-shadow: rgba(255, 255, 255, 0.5) 0 1px 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;

  /* layout */
  padding: 0.5em 0.6em 0.4em 0.6em;
  margin: 0.5em;
  margin-left: 700px;
  display: inline-block;
  position: relative;


  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;

  /* effects */
  border-top: 1px solid rgba(255, 255, 255, 0.8);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  -webkit-transition: background 0.2s ease-in-out;
  -moz-transition: background 0.2s ease-in-out;
  transition: background 0.2s ease-in-out;

  /* color */
  color: hsl(0, 0%, 40%) !important;
  background-color: hsl(0, 0%, 75%);

  -webkit-box-shadow: inset rgba(255, 254, 255, 0.6) 0 0.3em 0.3em,
    inset rgba(0, 0, 0, 0.15) 0 -0.1em 0.3em,
    /* inner shadow */ hsl(0, 0%, 60%) 0 0.1em 3px, hsl(0, 0%, 45%) 0 0.3em 1px,
    /* color border */ rgba(0, 0, 0, 0.2) 0 0.5em 5px; /* drop shadow */
  -moz-box-shadow: inset rgba(255, 254, 255, 0.6) 0 0.3em 0.3em,
    inset rgba(0, 0, 0, 0.15) 0 -0.1em 0.3em,
    /* inner shadow */ hsl(0, 0%, 60%) 0 0.1em 3px, hsl(0, 0%, 45%) 0 0.3em 1px,
    /* color border */ rgba(0, 0, 0, 0.2) 0 0.5em 5px; /* drop shadow */
  box-shadow: inset rgba(255, 254, 255, 0.6) 0 0.3em 0.3em,
    inset rgba(0, 0, 0, 0.15) 0 -0.1em 0.3em,
    /* inner shadow */ hsl(0, 0%, 60%) 0 0.1em 3px, hsl(0, 0%, 45%) 0 0.3em 1px,
    /* color border */ rgba(0, 0, 0, 0.2) 0 0.5em 5px; /* drop shadow */
}

/* -------------- button (tag) -------------- */

button.button {
  border-left: none;
  border-right: none;
}
button.button:hover {
  cursor: pointer;
}

/* -------------- icon -------------- */
.button:before {
  font: 1.2em/0 "Pictos", sans-serif;
  content: attr(
    data-icon
  ); /* gets the icon value from the custom data attribute and puts it infront of the button label */
  margin-right: 0.4em;
}

/* -------------- colours -------------- */

.button.blue {
  color: hsl(208, 50%, 40%) !important;
  background-color: hsl(208, 100%, 75%);

  -webkit-box-shadow: inset rgba(255, 254, 255, 0.6) 0 0.3em 0.3em,
    inset rgba(0, 0, 0, 0.15) 0 -0.1em 0.3em,
    /* inner shadow */ hsl(208, 50%, 55%) 0 0.1em 3px,
    hsl(208, 50%, 40%) 0 0.3em 1px,
    /* color border */ rgba(0, 0, 0, 0.2) 0 0.5em 5px; /* drop shadow */
  -moz-box-shadow: inset rgba(255, 254, 255, 0.6) 0 0.3em 0.3em,
    inset rgba(0, 0, 0, 0.15) 0 -0.1em 0.3em,
    /* inner shadow */ hsl(208, 50%, 55%) 0 0.1em 3px,
    hsl(208, 50%, 40%) 0 0.3em 1px,
    /* color border */ rgba(0, 0, 0, 0.2) 0 0.5em 5px; /* drop shadow */
  box-shadow: inset rgba(255, 254, 255, 0.6) 0 0.3em 0.3em,
    inset rgba(0, 0, 0, 0.15) 0 -0.1em 0.3em,
    /* inner shadow */ hsl(208, 50%, 55%) 0 0.1em 3px,
    hsl(208, 50%, 40%) 0 0.3em 1px,
    /* color border */ rgba(0, 0, 0, 0.2) 0 0.5em 5px; /* drop shadow */
}
.button.blue:hover {
  background-color: hsl(208, 100%, 83%);
}

/* -------------- States -------------- */

.button:hover {
  background-color: hsl(0, 0%, 83%);
}

.button:active {
  -webkit-box-shadow: inset rgba(255, 255, 255, 0.6) 0 0.3em 0.3em,
    inset rgba(0, 0, 0, 0.2) 0 -0.1em 0.3em,
    /* inner shadow */ rgba(0, 0, 0, 0.4) 0 0.1em 1px,
    /* border */ rgba(0, 0, 0, 0.2) 0 0.2em 6px; /* drop shadow */
  -moz-box-shadow: inset rgba(255, 255, 255, 0.6) 0 0.3em 0.3em,
    inset rgba(0, 0, 0, 0.2) 0 -0.1em 0.3em,
    /* inner shadow */ rgba(0, 0, 0, 0.4) 0 0.1em 1px,
    /* border */ rgba(0, 0, 0, 0.2) 0 0.2em 6px; /* drop shadow */
  box-shadow: inset rgba(255, 255, 255, 0.6) 0 0.3em 0.3em,
    inset rgba(0, 0, 0, 0.2) 0 -0.1em 0.3em,
    /* inner shadow */ rgba(0, 0, 0, 0.4) 0 0.1em 1px,
    /* border */ rgba(0, 0, 0, 0.2) 0 0.2em 6px; /* drop shadow */

  -webkit-transform: translateY(0.2em);
  -moz-transform: translateY(0.2em);
  transform: translateY(0.2em);
}

.button:focus {
  outline: none;
  color: rgba(254, 255, 255, 0.9) !important;
  text-shadow: rgba(0, 0, 0, 0.2) 0 1px 2px;
}
/* -------------- Shapes -------------- */
/* skew */
.skew {
  border-top: none;
  padding-right: 1.2em;
  padding-left: 0.8em;
  -webkit-border-radius: 5em 1em / 5em 1em;
  -moz-border-radius: 5em 1em / 5em 1em;
  border-radius: 5em 1em / 5em 1em;
}
</style>
