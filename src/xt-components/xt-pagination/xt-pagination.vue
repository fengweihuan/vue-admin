<template lang="pug">
  el-pagination.xt-pagination(
    :background="true"
    :total="total"
    :page-size="pageSize"
    :current-page="currentPage"
    layout="total,sizes, prev, pager, next, jumper"
    @prev-click="handlePrevClick"
    @next-click="handleNextClick"
    @size-change="handleSizeChange"
    @current-change="handleCurrChange"
  )
</template>

<script>
export default {
  name: 'xt-pagination',
  props: {
    total: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      defualt: 1
    },
    size: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      pageSize: 10,
      currentPage: 1
    }
  },
  created () {
    this.currentPage = this.page
    this.pageSize = this.size
  },
  methods: {
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      this.change(this.currentPage)
    },
    handlePrevClick (currentPage) {
      this.change(currentPage)
    },
    handleNextClick (currentPage) {
      this.change(currentPage)
    },
    handleCurrChange (currentPage) {
      this.change(currentPage)
    },
    change (currentPage) {
      if (this.total && this.pageSize && currentPage) {
        if (Math.ceil(this.total / this.pageSize)  < currentPage) return false
      }
      this.currentPage = currentPage
      this.$emit('change', { page: this.currentPage, pageSize: this.pageSize })
    }
  }
}
</script>

<style lang="scss">
.xt-pagination {
  margin: 10px;
  text-align: right;
}
</style>