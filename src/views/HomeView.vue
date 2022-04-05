<template>
  <div class="FlipClock">
    <Flipper ref="flipperYear1" />
    <Flipper ref="flipperYear2" />
    <Flipper ref="flipperYear3" />
    <Flipper ref="flipperYear4" />
    <em>-</em>
    <Flipper ref="flipperMonth1" />
    <Flipper ref="flipperMonth2" />
    <em>-</em>
    <Flipper ref="flipperDay1" />
    <Flipper ref="flipperDay2" />
    <em>-</em>
    <Flipper ref="flipperHour1" />
    <Flipper ref="flipperHour2" />
    <em>:</em>
    <Flipper ref="flipperMinute1" />
    <Flipper ref="flipperMinute2" />
    <em>:</em>
    <Flipper ref="flipperSecond1" />
    <Flipper ref="flipperSecond2" />
  </div>
</template>

<script>
import Flipper from './Flipper'

export default {
  name: 'FlipClock',
  props:{
    format:{
      type: String,
      default: 'yyyymmddhhiiss'
    }
  },
  data() {
    return {
      timer: null,
      flipObjs: [],
    }
  },
  components: {
    Flipper
  },
  methods: {
    // 初始化数字
    init() {
      let now = new Date()
      let nowTimeStr = this.formatDate(new Date(now.getTime()), this.format)
       for (let i = 0; i < this.flipObjs.length; i++) {
         this.flipObjs[i].setFront(nowTimeStr[i])
       }
    },
    // 开始计时
    run() {
      this.timer = setInterval(() => {
        // 获取当前时间
        let now = new Date()
        let nowTimeStr = this.formatDate(new Date(now.getTime() - 1000), this.format)
        let nextTimeStr = this.formatDate(now, this.format)
        for (let i = 0; i < this.flipObjs.length; i++) {
          if (nowTimeStr[i] === nextTimeStr[i]) {
            continue
          }
          this.flipObjs[i].flipDown(
            nowTimeStr[i],
            nextTimeStr[i]
          )
        }
      }, 1000)
    },
    // 正则格式化日期
    formatDate(date, dateFormat) {
      /* 单独格式化年份，根据y的字符数量输出年份
     * 例如：yyyy => 2019
            yy => 19
            y => 9
     */
      if (/(y+)/.test(dateFormat)) {
        dateFormat = dateFormat.replace(
          RegExp.$1,
          (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
      }
      // 格式化月、日、时、分、秒
      let o = {
        'm+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'i+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for (let k in o) {
        if (new RegExp(`(${k})`).test(dateFormat)) {
          // 取出对应的值
          let str = o[k] + ''
          /* 根据设置的格式，输出对应的字符
           * 例如: 早上8时，hh => 08，h => 8
           * 但是，当数字>=10时，无论格式为一位还是多位，不做截取，这是与年份格式化不一致的地方
           * 例如: 下午15时，hh => 15, h => 15
           */
          dateFormat = dateFormat.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? str : this.padLeftZero(str)
          )
        }
      }
      return dateFormat
    },
    // 日期时间补零
    padLeftZero(str) {
      return ('00' + str).substr(str.length)
    }
  },
  mounted() {
    this.flipObjs = [
      this.$refs.flipperYear1,
      this.$refs.flipperYear2,
      this.$refs.flipperYear3,
      this.$refs.flipperYear4,
      this.$refs.flipperMonth1,
      this.$refs.flipperMonth2,
      this.$refs.flipperDay1,
      this.$refs.flipperDay2,
      this.$refs.flipperHour1,
      this.$refs.flipperHour2,
      this.$refs.flipperMinute1,
      this.$refs.flipperMinute2,
      this.$refs.flipperSecond1,
      this.$refs.flipperSecond2
    ]
    this.init()
    this.run()
  }
}
</script>

<style>
.FlipClock {
    text-align: center;
    line-height: 700px;
}
.FlipClock .M-Flipper {
    margin: 0 0px;
}
.FlipClock em {
    display: inline-block;
    line-height: 602px;
    font-size: 66px;
    font-style: normal;
    vertical-align: top;
}
</style>
