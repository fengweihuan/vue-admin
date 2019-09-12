<template lang="pug">
  xt-dialog.file_dialog(
    title="文件查看"
    ref="file" v-bind="$attrs" 
    :autoclose="true"
    :showfooter="false"
    width="1040px"
    :beforeClose="beforeClose"
    :close-on-click-modal="false"
  )
    el-button(v-if="!isImage(fileUrl)" size="mini" type="success" slot="title" @click="downHandle")
      i.iconfont.icon-Icon-daochu
    .file_mian(style="text-align:center")
      iframe(
        v-if="fileType === 'pdf' || fileType === 'word'"
        width="1000px"
        height="600px"
        :src="iframeUrl"
        frameborder="0"
        class="pdf-window"
      )
      img(v-else-if="fileType === 'img'" :src="iframeUrl" style="max-width: 1000px;")
      video(
        v-else-if="fileType === 'video'"
        :src="iframeUrl"
        width="1000px"
        controls="controls"
      )
      audio(
        v-else-if="fileType === 'audio'"
        :src="iframeUrl"
        width="1000px"
        controls="controls"
      )
      .tips(v-else) 暂不支持该类型文件查看!
</template>
<script>
import xtDialog from '../xt-dialog'
import xtExport from '../xt-export'
import server from '@/server'
import request from '@/utils/request'
import qs from 'qs'
import store from '@/store'
export default {
  name: 'xt-file',
  components: {
    xtDialog,
    xtExport
  },
  computed: {
    iframeUrl () {
      // let baseUrl = 'http://bim10.xatasoft.com'
      let baseUrl = server.fileUrl
      let url = ''
      if (this.fileType === 'pdf') {
        // url = `/static/pdfjs/web/viewer.html?file=${baseUrl + this.fileUrl}`
        url = `${baseUrl + this.fileUrl}`
      } else if (this.fileType === 'word') {
        url = `https://view.officeapps.live.com/op/embed.aspx?src=${baseUrl + this.fileUrl}&wdAllowInteractivity=False&wdHideGridlines=True&wdDownloadButton=True&wdInConfigurator=True`
      } else {
        url = baseUrl + this.fileUrl
      }
      return url
    }
  },
  data () {
    return {
      server: server,
      fileType: '',
      typeData: {
        img: ['jpg', 'jpeg', 'gif', 'png', 'bmp'],
        pdf: ['pdf'],
        word: ['xlsx', 'xls', 'docx', 'doc', 'rtf'],
        text: ['txt'],
        video: ['mp4', 'ogg', 'MP4'],
        audio: ['mp3', 'MP3']
      },
      fileUrl: ''
    }
  },
  methods: {
    open (fileUrl) {
      this.fileUrl = fileUrl
      this.computedType()
      this.$refs.file.open()
    },
    computedType () {
      const typeArr = this.fileUrl.split('.') || []
      const type = typeArr[typeArr.length - 1]
      let fileType = ''
      for(let i in this.typeData) {
        if (this.typeData[i].includes(type)) {
          fileType = i
        }
      }
      this.fileType = fileType
    },
    isImage (url) {
      const imgArr = ['jpg', 'jpeg', 'gif', 'png', 'bmp']
      let arr = url.split('.') || []
      return imgArr.includes(arr[arr.length - 1])
    },
    downHandle () {
      if (this.fileUrl) {
        if (this.isImage(this.fileUrl)) {
          return false
        }
        const token = store.getters.token
        const params = {
          ...this.params,
          token
        }
        const queryStr = qs.stringify(params)
        const src = server.fileUrl + this.fileUrl + '?' + queryStr
        this.clickLink(src, params)
      } else {
        this.$warning('url不存在')
      }
    },
    beforeClose (done) {
      if (this.fileType === 'video') {
        let videoDom = document.querySelector('.file_mian video')
        videoDom && videoDom.pause()
        done()
      } else if (this.fileType === 'audio') {
        let videoDom = document.querySelector('.file_mian audio')
        videoDom && videoDom.pause()
        done()
      } else {
        done()
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
.file_dialog{
  /deep/ .el-dialog__body{
    overflow: hidden;
  }
}
</style>
