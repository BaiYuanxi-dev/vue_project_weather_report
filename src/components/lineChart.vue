<template>
  <div id="main"></div>
</template>

<script>
export default {
  name: "chart",
  // props:["tempDatas"],
  // watch: {
  //   data(tempDatas) {
  //       console.log(tempDatas)
  //   }
  // },
  data() {
    return {
      dates: [1, 2, 3, 4, 5, 6, 7],
      minDatas: [2, 2, 2, 2, 2, 2, 2],
      maxDatas: [3, 4, 5, 6, 7, 8, 9],
      avgDatas: [2, 3, 4, 5, 6, 6, 7],
      rainfor: [9, 12, 10, 13, 9, 8, 100],
    };
  },
  methods: {
    drawChart(dates, minDatas, maxDatas, avgDatas, rainfor) {
      let echarts = require("echarts");
      let chartDom = document.getElementById("main");
      let myChart = echarts.init(chartDom);
      let option = {
        title: {
          text: "未来天气变化",
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data: ['最高气温', '最低气温', '降雨量', '平均气温']
        },

        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        xAxis: {
          type: "category",
          data: this.dates,
          axisPointer: {
            type: 'shadow'
          }
        },
        yAxis: [
          {
            type: 'value',
            name: '水量',
            // min: 0,
            // max: 25,
            // interval: 5,
            axisLabel: {
              formatter: '{value} ml'
            }
          },
          {
            type: "value",
            // min: -20,
            // max: 40,
            // interval: 5,
            axisLabel: {
              formatter: "{value} °C",
            },
        }],
        series: [
          {
            yAxisIndex: 1,
            name: "最高气温",
            type: "line",
            data: this.maxDatas,
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" },
              ],
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }],
            },
          },
          {
            yAxisIndex: 1,
            name: "最低气温",
            type: "line",
            data: this.minDatas,
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" },
              ],
            },
            markLine: {
              data: [
                { type: "average", name: "平均值" },
                [
                  {
                    symbol: "none",
                    x: "90%",
                    yAxis: "max",
                  },
                  {
                    symbol: "circle",
                    label: {
                      position: "start",
                      formatter: "最大值",
                    },
                    type: "max",
                    name: "最高点",
                  },
                ],
              ],
            },
          },
          {
            name: '降雨量',
            // barWidth: 30,
            type: 'line',
            data: this.rainfor,
          },
          {
            yAxisIndex: 1,
            name: '平均气温',
            type: 'line',
            stack: '总量',
            data: this.avgDatas
          }
        ],
      };
      myChart.setOption(option);
    },

    AddDays(date, days) {
      let nd = date;
      nd = nd.valueOf();
      nd = nd + days * 24 * 60 * 60 * 1000;
      nd = new Date(nd);
      let y = nd.getFullYear();
      let m = nd.getMonth() + 1;
      let d = nd.getDate();
      if (m <= 9) m = "0" + m;
      if (d <= 9) d = "0" + d;
      let cdate = y + "-" + m + "-" + d;
      return cdate;
    },

    changeFormat(dates, datas){
      let date1 = new Date(dates[0].replace(/-/g, "/"));
      let date2 = new Date(dates[1].replace(/-/g, "/"));
      let subDays = (date2 - date1) / (1 * 24 * 60 * 60 * 1000);
      let xAxisDates = [];
      let min = [];
      let max = [];
      let avg = [];
      let rain = [];



      for (let i = 0; i <= subDays; i++) {
        xAxisDates.push(this.AddDays(date1, i));
      }
      for (let i = 0; i <= subDays; i++) {
        avg.push(datas[i * 4]);
        max.push(datas[i * 4 + 1]);
        min.push(datas[i * 4 + 2]);
        rain.push(datas[i * 4 + 3]*100 );

      }
      // console.log(xAxisDates)
      this.dates = xAxisDates;
      this.avgDatas = avg;
      this.maxDatas = max;
      this.minDatas = min;
      this.rainfor = rain;
    },

    getData(dates, datas) {

      this.changeFormat(dates, datas);
      // this.minDatas = datas;
      this.drawChart(this.dates, this.minDatas, this.maxDatas, this.avgDatas, this.rainfor);
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
      return cityName;
    },


    init(city) {
      let cityName = this.update(city);
      let send_date1 = new Date("2021-07-30");
      let send_date2 = new Date("2021-08-05");
      let datas = [];
      let dates = [];
      dates.push(this.AddDays(send_date1, 0));
      dates.push(this.AddDays(send_date2, 0));
      let params = {
        name: cityName,
        date1: send_date1,
        date2: send_date2,
      };

      this.$api.initDatas(params, { type: "json" }).then((res) => {
          // console.log(res);
          datas=eval(res);
          for(let i in datas){
            datas[i] = datas[i].toFixed(2);
            this.changeFormat(dates, datas);
            this.drawChart(this.dates, this.minDatas, this.maxDatas, this.avgDatas, this.rainfor);
          }
        });
      
    }
  },
  mounted() {
    // this.$api.initDatas
    // this.init();
    // this.drawChart(this.dates, this.minDatas, this.maxDatas, this.avgDatas, this.rainfor);
  },
};
</script>

<style scoped>
</style>
