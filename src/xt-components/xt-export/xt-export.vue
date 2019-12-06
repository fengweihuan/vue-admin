<template lang="pug"> 
  .xt-export
    el-button.export-btn(
      :size="size"
      :type="type"
      v-bind="$attrs"
      @click="handleClick")
      i.iconfont.icon-Icon-daochu
</template>
<script>
import qs from 'qs'
import store from '@/store'
import request from '@/utils/request'
export default {
  name: 'xt-export',
  props: {
    path: {
      type: String,
      default: ''
    },
    params: {
      type: Object,
      default: () => {
        return {}
      }
    },
    text: {
      type: String,
      default: '导出'
    },
    type: {
      type: String,
      default: 'success'
    },
    size: {
      type: String,
      default: 'small'
    },
    beforeExoprt: {
      type: Function
    }
  },
  methods: {
    handleClick () {
      if (!this.beforeExoprt) {
        this.done()
      } else {
        this.beforeExoprt(this.done)
      }
    },
    done (data = {}) {
      console.log(this)
      // const loading = this.$loading({
      //   lock: true,
      //   text: '导出中...',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.7)'
      // })
      let token = store.getters.token
      let params = {
        ...this.params,
        ...data,
        token
      }
      console.log(params)
      const type = this.path.split('!')[0]
      const url = this.path.split('!')[1]
      const queryStr = qs.stringify(params)
      this.$message.success('开始导出')
      if (type === 'data') {        
        request({
          url: this.path,
          methods: 'get',
          params: params
        }).then(res => {
          if (res.code === 0 && res.result.url.length > 0) {
            let src = process.env.VUE_APP_BASE_FILE_URL + res.result.url
            this.clickLink(src, params)
          }
          // loading.close()
        }).catch(() => {
          // loading.close()
        })
      } else {
        const src = process.env.VUE_APP_BASE_API + url + '?' + queryStr
        this.clickLink(src, params)
        // loading.close()
      }
    },
    clickLink (src, p) {
      console.log('下载地址', src)
      console.log('导出参数', p)
      const oA = document.createElement('a')
      oA.href = src
      oA.target = '_blank'
      oA.click()
    }
  }
}
</script>
<style lang="scss" scoped>
.xt-export{
  & +.el-button {
    margin-left: 10px;
  }
  .el-button + &{
    margin-left: 10px;
  }
  .iconfont {
    font-size: 13px;
  }
}
</style>

