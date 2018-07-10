<template>
  <div class='echarts'>
    <h2><router-link to="/">Go Back</router-link></h2>
    <IEcharts
      :option='option'
    />
  </div>
</template>

<script>
import IEcharts from 'vue-echarts-v3/src/lite.js'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/toolbox'

export default {
  name: 'Demo06',
  components: {
    IEcharts
  },
  data () {
    return {
      option: {
        title: {
          text: '大规模散点图'
        },
        tooltip: {
          trigger: 'axis',
          showDelay: 0,
          axisPointer: {
            show: true,
            type: 'cross',
            lineStyle: {
              type: 'dashed',
              width: 1
            }
          },
          zlevel: 1
        },
        legend: {
          data: ['sin', 'cos']
        },
        toolbox: {
          show: true,
          feature: {
            mark: {show: true},
            dataZoom: {show: true},
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        xAxis: [
          {
            type: 'value',
            scale: true
          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true
          }
        ],
        series: [
          {
            name: 'sin',
            type: 'scatter',
            large: true,
            symbolSize: 3,
            data: (function () {
              var d = []
              var len = 10000
              var x = 0
              while (len--) {
                x = (Math.random() * 10).toFixed(3) - 0
                d.push([
                  x, // Math.random() * 10
                  (Math.sin(x) - x * (len % 2 ? 0.1 : -0.1) * Math.random()).toFixed(3) - 0
                ])
              } // console.log(d)
              return d
            })()
          },
          {
            name: 'cos',
            type: 'scatter',
            large: true,
            symbolSize: 2,
            data: (function () {
              var d = []
              var len = 20000
              var x = 0
              while (len--) {
                x = (Math.random() * 10).toFixed(3) - 0
                d.push([
                  x, // Math.random() * 10
                  (Math.cos(x) - x * (len % 2 ? 0.1 : -0.1) * Math.random()).toFixed(3) - 0
                ])
              } // console.log(d)
              return d
            })()
          }
        ]
      }
    }
  },
  methods: {
    // beforeMount () {
    //   const that = this
    // },
    // beforeDestroy () {
    //   const that = this
    // }
  },
  mounted () {
    const elasticsearch = require('elasticsearch')

    const client = new elasticsearch.Client({
      // this is proxied to elasticsearch
      hosts: ['/ES']
    })

    client.ping({
      requestTimeout: 5000
    }, function (error) {
      // at this point, eastic search is down, please check your Elasticsearch service
      if (error) {
        console.error('elasticsearch cluster is down!')
      } else {
        console.log('Everything is ok')
      }
    })
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .echarts {
    width: 800px;
    height: 800px;
    margin: 0 auto;
  }
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
