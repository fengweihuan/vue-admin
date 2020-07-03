<template lang="pug">
  .xt-editTable
    .header(v-show="!disabled")
      el-button(type="primary" size="small" icon="el-icon-plus" @click="addHandle('row')") 添加行
      el-button(type="primary" size="small" icon="el-icon-plus" @click="addHandle('column')") 添加列
      el-button(type="danger" size="small" icon="el-icon-delete" @click="deleteHandle('row')") 删除行
      el-button(type="danger" size="small" icon="el-icon-delete" @click="deleteHandle('column')") 删除列
      slot(name="header")
    .banner(v-if="data.length > 0")
      el-table(
        ref="table"
        :data="data"
        border
        :show-summary="amountArr.length > 0"
        :summary-method="getSummaries"
        v-bind="$attrs"
        :fit="true"
        @selection-change="handleSelectionChange"
      )
        el-table-column(v-if="!disabled" type="selection" :selectable="selectableFun" width="60px")
        el-table-column(width="80px" :render-header="renderHeader" align="center")
          template(slot-scope="scope")
            .header_check
              span 
              span {{ scope.$index + 1 }}
        el-table-column(v-for="item in columnArr" :key="item" :labe="item" :prop="item" :render-header="renderHeader" align="center" min-width="100px")
          template(slot-scope="scope")
            el-input(v-if="!disabled" size="mini" placeholder="请输入" suffix-icon="el-icon-edit" clearable style="width: 100%;max-width: 100%;" :type="amountArr.includes(item) ? 'number' : ''" :value="scope.row[item]" @change="changeHandle(scope.row, item, arguments)")
            span(v-else) {{ scope.row[item] }}
    .tips(v-else) 暂无数据
</template>
<script>
export default {
  name: 'xt-editTable',
  computed: {
    changelessArr() {
      if (!this.changeless) {
        return []
      }
      if (Object.prototype.toString.call(this.changeless) === '[object Array]') {
        return this.changeless
      } else {
        return this.changeless.split(',')
      }
    },
    amountArr() {
      if (!this.amount) {
        return []
      }
      if (Object.prototype.toString.call(this.amount) === '[object Array]') {
        return this.amount
      } else {
        return this.amount.split(',')
      }
    },
    columnArr () {
      if (this.data.length > 0) {
        let arr = Object.keys(this.data[0])
        if (this.changeless) {
          let attrArr = Object.prototype.toString.call(this.changeless) === '[object Array]' ? this.changeless : this.changeless.split(',')
          attrArr.map(item => {
            if (arr.includes(item)) {
              arr.splice(arr.indexOf(item), 1)
              arr.push(item)
            }
          })
          return arr
        }
      } else {
        return []
      }
    }
  },
  data () {
    return {
      multipleSelection: [],
      selectRow: []
    }
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 不能删除的元素
    changeless: {
      type: [String, Number],
    },
    // 需要合计的元素
    amount: {
      type: [String, Number]
    },
    // 最多多少列
    maxColumn: {
      type: Number
    }
  },
  methods: {
    changeHandle (row, attr, arg) {
      row[attr] = arg[0]
    },
    // 添加操作
    addHandle (type) {
      if (type === 'column') {
        if (this.maxColumn && (this.columnArr.length === this.maxColumn || this.columnArr.length > this.maxColumn) ) {
          this.$message.warning('最多只能添加' + this.maxColumn + '列!')
          return false
        }
        this.$prompt('请输入列名称', '提示',).then((val) => {
          if (this.data.length > 0) {
            let attrArr = Object.keys(this.data[0])
            if (attrArr.includes(val.value)) {
              this.$message.error('列名已存在!')
              return false
            }
          }
          let data = []
          this.data.map(item => {
            let json = {...item}
            json[val.value] = ''
            data.push(json)
          })
          this.$emit('update:data', data)
        })
      } else {
        if (this.data.length > 0) {
          let data = JSON.parse(JSON.stringify(this.data))
          let json = {}
          for (let i in this.data[0]) {
            json[i] = ''
          }
          data.push(json)
          this.$emit('update:data', data)
        } else {
          this.$message.error('请先添加列数据!')
        }
      }
    },
    // 删除操作
    async deleteHandle (type) {
      if (type === 'column') {
        if (this.selectRow.length > 0) {
          await this.$confirm('确定要删除选择的列?', '提示', { type: 'warning' })
          let data = JSON.parse(JSON.stringify(this.data))
          data.map(item => {
            this.selectRow.map(list => {
              delete item[list]
            })
          })
          this.selectRow= []
          // 解决删除后有checkbox组件被选中问题
          this.$emit('update:data', [])
          this.$nextTick(() => {
            this.$emit('update:data', data)
          })
        } else {
          this.$message.warning('请至少选择一列!')
        }
      } else {
        if (this.multipleSelection.length > 0) {
          await this.$confirm('确定要删除选择的行?', '提示', { type: 'warning' })
          let arr = this.data.filter(item => !this.multipleSelection.includes(item) )
          this.multipleSelection = []
          this.$emit('update:data', arr)
        } else {
          this.$message.warning('请至少选择一行!')
        }
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    selectableFun (row, index) {
      return index !== 0
    },
    // render表头
    renderHeader (h, { column, $index }) {
      const { toggleSelectColumn, disabled } = this
      const attr = column.property
      const opacity = {
        opacity: this.disabled ? 0 : 1
      }
      if (this.changelessArr.includes(column.property) || $index === 1) {
        return (<div class="header_check">
              <span style="height: 14px;"> </span>
              <span style="white-space: pre-wrap;">{ $index === 1 ?'序号' : attr }</span>
            </div>)
      } else {
        return (<div class="header_check">
            <el-checkbox style={ opacity } onChange={ toggleSelectColumn.bind(this, attr) } disabled={ disabled } ></el-checkbox>
            <span style="white-space: pre-wrap;margin-top:10px;">{ attr }</span>
          </div>)
      }
      
    },
    // 切换选中
    toggleSelectColumn(name, val) {
      if (val) {
        this.selectRow.push(name)
      } else {
        if (this.selectRow.includes(name)) {
          this.selectRow.splice(this.selectRow.indexOf(name), 1)
        }
      }
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
        if (this.amountArr.includes(column.property)) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] = sums[index].toFixed(2) - 0
          sums[index] += ' 元'
        } else {
          sums[index] = ''
        }
      })
      return sums
    }
  }
}
</script>

<style lang="scss">
.xt-editTable {
  padding:  0;
  .banner{
    margin-top: 10px;
  }
  .header_check{
    display: flex;
    flex-direction: column;
    line-height: 1.2;
    justify-content: space-around;
  }
  ::v-deep thead .el-table-column--selection {
    .cell{
      top: 15px;
    }
  }
  ::v-deep .el-input {
    .el-input__icon{
      color: #409EFF;
    }
    input {
      border: 1px solid #fff;
      text-align: center;
      padding-right: 16px;
      &:focus, &:hover{
        border-color: #409EFF;
        outline: 0;
      }
    }
  }
  .tips{
    color: #666;
    text-align: center;
    margin: 30px auto;
  }
  /deee/ {
    .el-input__suffix{
      right: -3px
    }
  }
}
</style>


