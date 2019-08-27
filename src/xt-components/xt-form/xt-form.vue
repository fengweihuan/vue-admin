<template lang="pug">
  iViewForm(
    ref="form"
    lib="elememt"
    v-bind="$attrs"
    :notCtrl="notCtrl"
    :formList="formList"
    :options="currOption"
    @submit="handleSubmit"
  )
</template>
<script>
import iViewForm from '../iview-form'
export default {
  name: 'xt-form',
  components: {
    iViewForm
  },
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    },
    formList: {
      type: Array,
      default: () => {
        return []
      }
    },
    notCtrl: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    currOption() {
      const options = {
        size: 'small'
      }
      return Object.assign(options, this.options)
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', ...arguments)
    },
    getFormBykey() {
      return this.$refs.form.getFormBykey(...arguments)
    },
    clear() {
      return this.$refs.form.clear()
    },
    reset() {
      return this.$refs.form.reset()
    },
    getForm() {
      return this.$refs.form.getForm()
    },
    setForm() {
      this.$refs.form.setForm(...arguments)
      this.$refs.form.clear()
    },
    submit() {
      return this.$refs.form.submit()
    }
  }
}
</script>

<style lang="scss">
.search {
  display: inline-block;
  vertical-align: middle;
  .el-form-item__label {
    width: auto !important;
  }
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
