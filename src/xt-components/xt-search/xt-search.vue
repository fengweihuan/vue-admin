<script>
export default {
  name: 'xt-search',
  props: {
    searchList: {
      type: Array,
      default: () => []
    },
    enterSubmit: {
      type: Boolean,
      default: false
    },
    hasResetBtn: {
      type: Boolean,
      default: false
    }
  },
  render () {
    return (
      <div class="xt-search row">
        {
          <div class="xt-search-row">
            <div class="xt-search-content">{this.renderForm(this.searchList)}</div>
          </div>
        }
      </div>
    )
  },
  methods: {
    renderForm (searchList) {
      let options = {
        inline: true,
      }
      if (this.hasResetBtn) {
        return <div>
        <xt-form formList={searchList} options={options} enterSubmit={this.enterSubmit} contentWidth={'auto'} ref="form"></xt-form>
        <el-button onClick={() => this.handleSubmit()} type="primary" size="small" icon="el-icon-search">查询</el-button>
        <el-button  onClick={() => this.resetSubmit()} type="info" plain size="small">清空</el-button>
        {this.$slots.default}
      </div>
      } else {
        return <div>
        <xt-form formList={searchList} options={options} enterSubmit={this.enterSubmit} contentWidth={'auto'} ref="form"></xt-form>
        <el-button onClick={() => this.handleSubmit()} type="primary" size="small" icon="el-icon-search">查询</el-button>
        {this.$slots.default}
      </div>
      }
    },
    getForm () {
      return {
        ...this.$refs.form.getForm()
      }
    },
    getParams () {
      let params = {
        ...this.$refs.form.getForm()
      }
      return params
    },
    resetForm () {
      this.$refs.form.reset()
    },
    handleSubmit () {
      this.$emit('submit', this.getParams())
    },
    resetSubmit () {
      this.$refs.form.reset()
      this.$emit('reset')
      this.$emit('submit', this.getParams())
    }
  }
}
</script>

<style lang="scss">
@import "./xt-search";
</style>