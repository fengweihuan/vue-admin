<template lang='pug'>
  .xt-table
    .header
      xt-search(v-if="searchList.length > 0" :hasResetBtn="hasResetBtn" @reset="$emit('reset')" :searchList="searchList" ref="search" @submit="searchHandle")
      .btn_wrap
        el-button(v-if="create" type="primary" icon="el-icon-plus" size="small" @click="$refs.editDialog.open()") 新增
        el-button(v-if="deleteBatch" type="danger" icon="el-icon-delete" size="small" @click="deleteHandle('batch')") 批量删除
        slot(name="button")
    el-table(
      :height="height"
      v-loading="loading"
      :data="tableData"
      @selection-change="handleSelectionChange"
      :show-summary="summary.length > 0"
      :summary-method="getSummaries"
      border
    )
      el-table-column(v-if="selection || deleteBatch" type="selection" width="60px" align="center")
      el-table-column(
        v-for="item in columns"
        :key="item.prop"
        :type="item.type"
        :label="item.label ? item.label : ''"
        :prop="item.prop ? item.prop : ''"
        :width="item.width ? item.width : ''"
        :fixed="item.fixed ? item.fixed : ''"
        :formatter="item.formatter ? item.formatter : null"
        :align="item.align ? item.align : 'center'"
      )
        template(slot-scope="scope")
          .div(v-if="item.html" v-html="item.html(scope, item.prop)")
          .div(v-else) {{ item.type === 'index' ? scope.$index + 1 : scope.row[item.prop] }}
      el-table-column(label="操作" align="center" width="100px" v-if="edit || deleted")
        template(slot-scope="scope")
          .edit_main
            span.el-icon-edit-outline(v-if="edit" style="color: #409EFF; " @click="$refs.editDialog.open(scope.row)")
            span.el-icon-delete(v-if="deleted" style="color: #F56C6C;margin-left: 10px" @click="deleteHandle(scope.row)")
    xt-pagination(v-if="hasPagination" ref="pagination" :total="total" @change="changePage")
    xt-editDialog(
      ref="editDialog"
      :title="dialogTitle"
      :label-width="labelWidth"
      :formList="editFormList"
      @submit="editSubmit"
    )
</template>

<script>
export default {
  name: 'xt-table',
  props: {
    // 序号
    index: {
      type: Boolean,
      default: true
    },
    columns: {
      required: true,
      type: Array,
      default: () => []
    },
    dialogTitle: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: Number,
      default: 120
    },
    height: {
      type: String,
    },
    searchList: {
      type: Array,
      default: () => []
    },
    editFormList: {
      type: Array,
      default: () => []
    },
    getUrl: {
      type: String
    },
    createUrl: {
      type: String
    },
    editUrl: {
      type: String
    },
    deleteUrl: {
      type: String
    },
    // 新增
    create: {
      type: Boolean,
      default: true
    },
    // 编辑
    edit: {
      type: Boolean,
      default: true
    },
    // 删除
    deleted: {
      type: Boolean,
      default: true
    },
    // 批量删除
    deleteBatch: {
      type: Boolean,
      default: true
    },
    // 是否分页
    hasPagination: {
      type: Boolean,
      default: true
    },
    // 多选
    selection: {
      type: Boolean,
      default: true
    },
    // 删除数据关键参数code
    deleteId: {
      type: String,
      default: '_id'
    },
    // 合计
    summary: {
      type: Array,
      default: () => []
    },
    hasResetBtn: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loading: false,
      tableData: [],
      multipleSelection: [],
      total: 1,
      pageParams: {
        page: 1,
        pageSize: 10
      },
      searchParams: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      const params = {
        ...this.searchParams,
        ...this.pageParams
      }
      this.$api[this.getUrl](params).then(res => {
        this.total = res.result.total
        this.tableData = res.result.data
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 确认提交
    async editSubmit(type, params) {
      if (type === 'create') {
        await this.$api[this.createUrl](params)
      } else {
        await this.$api[this.editUrl](params)
      }
      this.$success(`${type === 'create' ? '新增' : '编辑'}成功`)
      this.$refs.editDialog.handleClose()
      this.getData()
    },
    changePage(params) {
      this.pageParams = params
      this.getData()
    },
    async deleteHandle(row) {
      if (row === 'batch') {
        if (this.multipleSelection.length > 0) {
          await this.$confirm('确定要删除?')
          const arr = this.multipleSelection.map(item => item[this.deleteId])
          await this.$api[this.deleteUrl](arr.toString())
          this.$success('删除成功!')
          this.getData()
        } else {
          this.$message.warning('请至少选择一条数据!')
        }
      } else {
        await this.$confirm('确定要删除?')
        await this.$api[this.deleteUrl](row[this.deleteId])
        this.$success('删除成功!')
        this.getData()
      }
    },
    searchHandle(params) {
      this.searchParams = params
      this.$refs.pagination.reset()
    },
    // 设置合计
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (this.summary.includes(column.property)) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] = sums[index].toFixed(2) - 0
        } else {
          sums[index] = ''
        }
      })
      return sums
    },
  }
}
</script>

<style scoped lang="scss">
.xt-table{
  padding: 0;
  .header{
    display: flex;
    justify-content: space-between;
    .btn{
      display: flex;
    }
  }
  .edit_main{
    display: flex;
    justify-content: center;
    span{
      cursor: pointer;
    }
  }
}
</style>
