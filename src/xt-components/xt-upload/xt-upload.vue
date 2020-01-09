<template>
  <div class="upload_wrap">
    <el-button 
      v-bind="$attrs" 
      @click="clickHandle"
      type="warning"
    >外部导入</el-button>
    <el-dialog
      :title="text"
      :visible.sync="dialogVisible"
      class="upload_dialog"
      :modal="modal"
      :before-close="beforeClose"
      width="400px"
    >
      <el-upload
        class="upload-demo"
        ref="upload"
        name="fileName"
        :action="action"
        :multiple="multiple"
        :data="datas"
        :drag="drag"
        :show-file-list="showFile"
        :on-success="successHandle"
        :on-error="errorHandle"
        :limit="limit"
        :on-exceed="exceedHandle"
        :list-type="listType"
        :headers="headers">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <el-checkbox-group class="check_wrap" v-if="condition && condition.length > 0" v-model="checkList">
        <el-checkbox :label="item.value" v-for="item in condition" :key="item.value">{{item.label}}</el-checkbox>
      </el-checkbox-group>
      <!-- <span slot="footer" class="dialog-footer" v-show="showClose">
        <el-button @click="uploadCancel">取 消</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>
<script>
import { addData } from '@/utils/websoket.js'
import { mapGetters } from 'vuex'
export default {
  name: 'xt-upload',
  computed: {
    ...mapGetters(['token']),
    headers () {
      return {
        'X-Token': this.token
      }
    },
    action () {
      if (this.url && this.url.length > 0) {
        return process.env.VUE_APP_BASE_API + url
      } else {
        return process.env.VUE_APP_BASE_API + 'data/FileUpload/upload'
      }
    },
    datas () {
      let data = {
        fileType: this.fileType,
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
  data () {
    return {
      dialogVisible: false,
      showClose: false,
      percent: 0,
      checkList: [],
      currentName: ''
    }
  },
  props: {
    text: {
      type: String,
      default: '外部导入'
    },
    url: {
      type: String,
      default: '',
    },
    params: {
      type: Object,
      default: undefined
    },
    multiple: {
      type: Boolean,
      default: true
    },
    fileType: {
      type: String,
    },
    drag: {
      type: Boolean,
      default: true
    },
    limit: {
      type: Number,
      default: 20
    },
    showFile: {
      type: Boolean,
      default: true
    },
    modal: {
      type: Boolean,
      default: true
    },
    cancelTime: {
      type: Number,
      default: 1000
    },
    tips: {
      type: Boolean,
      default: true
    },
    listType: {
      type: String,
      default: 'xlsx'
    },
    beforeUpload: {
      type: Function
    },
    push: {
      type: Boolean,
      default: true
    },
    condition: {    //  {value: 'switch', label: '清空原有数据', select: false}
      type: Array,
      default: undefined
    }
  },
  created () {
    if (this.condition && this.condition.length > 0) {
      this.condition.map(item => {
        if (item.select) {
          this.checkList.push(item.value)
        }
      })
    }
  },
  methods: {
    successHandle (res, file, fileList) {
      let suss = true
      this.$emit('successList', res, file, fileList)
      if (fileList.length > 1) {
        fileList.forEach(item => {
          if (item.status !== 'success') {
            suss = false
            return false
          }
        })
      } else {
        suss = true
      }
      if (suss) {
        this.dialogVisible = false
        this.percent = 0
        if (res.code === 0) {
          if (res.data && this.push) {
            addData(res)
          }
          if (this.tips) {
            this.$message({
              type: 'success',
              message: '上传成功，后台正在解析，请稍后注意查看哦！',
              duration: 4000,
              showClose: true
            })
          }
        } else {
          this.$error(res.msg)
        }
        this.$emit('success', res, file, fileList)
        this.$refs.upload.clearFiles()
      }
    },
    done () {
      this.dialogVisible = true
    },
    clickHandle () {
      if (!this.beforeUpload) {
        this.dialogVisible = true
      } else {
        this.beforeUpload(this.done)
      }
    },
    errorHandle (err, file, fileList) {
      this.dialogVisible = false
      this.$refs.upload.clearFiles()
      this.$error('导入失败！请重试')
    },
    exceedHandle (file, fileList) {
      this.$info(`最多只能导入${this.limit}个文件哦！`)
    },
    beforeClose (done) {
      let upload = this.$refs.upload
      if (upload.uploadFiles && upload.uploadFiles.length > 0) {
        upload.abort()
        upload.clearFiles()
        this.$info('导入已取消！')
      }
      done()
    }
  }
}
</script>

<style lang="scss">
.upload_wrap {
  display: inline-block;
  & +.el-button {
    margin-left: 10px;
  }
  .el-button + &{
    margin-left: 10px;
  }
  .dialog_main{
    .tips{
      margin-bottom: 10px;
      display: inline-block;
    }
  }
  .check_wrap{
    display: flex;
    flex-wrap: wrap;
    .el-checkbox{
      margin-left: 0;
      margin-right: 40px;
      margin-top: 10px;
    }
  }
}
</style>


