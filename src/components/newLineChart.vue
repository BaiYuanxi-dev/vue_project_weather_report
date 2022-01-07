<template>
    <div id="newChart"></div>
</template>

<script>
export default {
  name: 'chart',
  data(){
    return{
      // dates:[1, 2, 3, 4, 5, 6, 7],
      dayRegist:[0, 0, 0, 0, 0, 0],
      dayActive:[0, 0, 0, 0, 0, 0],
      
      
      allRegist:[0, 0, 0, 0, 0, 0],
      allActive:[0, 0, 0, 0, 0, 0],
    }
  },
  methods: {
    drawChart (id) {
      let echarts = require('echarts')
      let chartDom = document.getElementById('newChart')
      let myChart = echarts.init(chartDom)
      let option = {
        title: {
          text: '活跃展示'
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
          data: ['日注册量', '日活跃量', '总注册量', '总活跃量']
        },
        // grid: {
        //   left: '3%',
        //   right: '4%',
        //   bottom: '3%',
        //   containLabel: true
        // },
        toolbox: {
          show: true,
          feature: {
            // dataZoom: {
            //   yAxisIndex: 'none'
            // },
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        xAxis: {
          type: 'category',
          // boundaryGap: false,
          data: ['2021-07-25', '2021-07-26', '2021-07-27', '2021-07-28', '2021-07-29', '2021-07-30'],
          axisPointer: {
            type: 'shadow'
          }
        },
        yAxis: [
          {
            type: 'value',
            name: '流量',
            // min: 0,
            // max: 250,
            // interval: 50,
            axisLabel: {
              formatter: '{value} 次'
            }
          },
          // {
          //   type: 'value',
          //   name: '温度',
          //   min: 0,
          //   max: 25,
          //   interval: 5,
          //   axisLabel: {
          //     formatter: '{value} °C'
          //   }
          // }
        ],
        series: [
          {
            name: '日注册量',
            type: 'line',
            data: this.dayRegist,
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          },
          {
            name: '日活跃量',
            type: 'line',
            data: this.dayActive,
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'},
                [{
                  symbol: 'none',
                  x: '90%',
                  yAxis: 'max'
                }, {
                  symbol: 'circle',
                  label: {
                    position: 'start',
                    formatter: '最大值'
                  },
                  type: 'max',
                  name: '最高点'
                }]
              ]
            }
          },
          {
            name: '总注册量',
            barWidth: 30,
            type: 'line',
            data: this.allRegist
          },
          {
            name: '总活跃量',
            type: 'line',
            stack: '总量',
            data: this.allActive
          }
        ]
      }
      myChart.setOption(option)
    },

    init(datas){
      // let myDatas = datas._ob_;
      // console.log(datas);
      // console.log(typeof(datas));


      // for(let i in datas){
      //   console.log(datas[i]);
      // }
      for(let i = 0; i < 6; i ++ ){
        this.dayRegist[i]=datas[i * 2];
        // this.allRegist.push(parseInt(datas[i * 2]))
        this.dayActive[i]=datas[i * 2 + 1];
      }

      let sum1 = 0;
      let sum2 = 0;
      for(let i = 0; i < 6; i ++){
        sum1 +=this.dayRegist[i];
        this.allRegist[i]=sum1;
        sum2 +=this.dayActive[i]
        this.allActive[i]=sum2;
      }
      // console.log(this.dayRegist)
      // console.log(this.dayActive)
      // console.log(this.allRegist)
      // console.log(this.allActive)
      this.drawChart();
    }
    


  },



  mounted () {
        //  this.drawChart();
  }
}
</script scope>

<style scoped>
</style>
