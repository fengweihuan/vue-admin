<template lang="pug">
  el-upload.new_unpload(
    class="upload-demo"
    :action="action"
    name="fileName"
    :style="{width: width}"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :on-error="handleError"
    :before-remove="beforeRemove"
    multiple
    :on-exceed="handleExceed"
    :file-list="fileList"
    :data="datas"
    :disabled="disabled"
    :headers="headers"
  )
    el-button(size="small" :disabled="disabled" type="primary") 点击上传
      i.el-icon-upload.el-icon--right
</template>

<script>
import { addData } from '@/utils/websoket.js'
import { mapGetters } from 'vuex'
import server from '@/server'
import request from '@/utils/request'
export default {
  name: 'xt-newUnload',
  computed: {
    ...mapGetters(['token', 'currentProject', 'server_id']),
    headers () {
      return {
        'X-Token': this.token,
        'X-Project': this.currentProject.id
      }
    },
    action () {
      if (this.url && this.url.length > 0) {
        const type = this.url.split('!')[0]
        const url = this.url.split('!')[1]
        return server[type] + url
      } else {
        return server.data + 'data/FileUpload/upload'
      }
    },
    datas () {
      let data = {
        fileType: this.fileType,
        server_id: this.server_id,
        ...this.params
      }
      if (this.condition && this.condition.length > 0) {
        this.condition.map(item => {
          data[item.value] = this.checkList.includes(item.value) ? 1 : 0
        })
      }
      return data
    }
  },
  props: {
    fileList: {
      type: Array,
      default: () => {
        return []
      }
    },
    fileType: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      required: true,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false
    },
    deleteUrl: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '400px'
    }
  },
  data () {
    return {
      checkList: [],
    }
  },
  methods: {
    handleRemove(file, fileList) {
      this.$emit('change', fileList)
    },
    handleSuccess (res, file, fileList) {
      let index = fileList.indexOf(file)
      if (res.code !== 0) {
        this.$error(res.msg)
        fileList.splice(index, 1)
      } else {
        let row = res.result.data.fileName
        fileList.splice(index, 1, row)
      }
      this.$emit('change', fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    handleError (err) {
      this.$error('上传失败')
    },
    async beforeRemove(file, fileList) {
      await this.$confirm(`确定移除 ${ file.name }？`)
      // if (this.deleteUrl && this.deleteUrl.length > 0) {
      //   const type = this.deleteUrl.split('!')[0]
      //   const url = this.deleteUrl.split('!')[1]
      //   return await request({
      //     url: this.deleteUrl,
      //     method: 'get',
      //     params: { id: file.id }
      //   })
      // }
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-upload-list{
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
}

</style>