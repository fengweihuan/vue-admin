<template lang='pug'>
  .material
    xt-table(
      :columns="columns"
      :searchList="searchList"
      :editFormList="editFormList"
      dialogTitle="材料"
      height="calc(100vh - 190px)"
      getUrl="getMaterialData"
      createUrl="createMaterialData"
      editUrl="editMaterialData"
      deleteUrl="deleteMaterialData"
      :summary="['数量']"
      border
      @row-click="rowClick"
    )
      template(slot="button")
        xt-upload(size="small" :condition="condition")
        el-button(type="danger" size="small") 按钮插槽
</template>

<script>
export default {
  name: 'Material',
  data() {
    return {
      searchList: [
        {
          title: '',
          type: 'input',
          key: '关键字',
          props: {
            placeholder: '请输入关键字'
          }
        },
        {
          title: '',
          type: 'select',
          isShow: true,
          key: '材料类别',
          props: {
            placeholder: '请选择入材料类别',
            filterable: true
          },
          options: [
            {
              text: '材料A',
              value: 'aaaa'
            },
            {
              text: '材料B',
              value: 'bbbb'
            }
          ]
        }
      ],
      editFormList: [
        {
          title: '材料名称',
          type: 'input',
          key: 'name',
          rule: { required: true, message: '请输入材料名称', trigger: 'blur' },
          props: {
            'placeholder': '请输入材料名称'
          }
        },
        {
          title: '材料类型',
          type: 'select',
          key: 'type',
          rule: { required: true, message: '请选择材料类型', trigger: 'change' },
          props: {
            'placeholder': '请输入材料类型'
          },
          options: [
            {
              text: '材料A',
              value: 'aaaa'
            },
            {
              text: '材料B',
              value: 'bbbb'
            }
          ]
        },
        {
          title: '数量',
          type: 'input',
          key: 'number',
          rule: { required: true, message: '请输入数量', trigger: 'blur' },
          props: {
            'placeholder': '请输入数量',
            type: 'number',
            min: 0,
            max: Infinity
          }
        },
        {
          title: '单位',
          type: 'input',
          key: 'unit',
          rule: { required: true, message: '请输入单位', trigger: 'blur' },
          props: {
            'placeholder': '请输入单位'
          }
        },
        {
          title: '备注',
          type: 'input',
          key: 'desc',
          props: {
            'placeholder': '请输入备注',
            type: 'textarea'
          }
        }
      ],
      columns: [
        {
          type: 'index',
          label: '序号',
          width: '60'
        },
        {
          prop: 'name',
          label: '材料名称',
          html({ row, $index }, prop) {
            return `<span>${row[prop]}</span>`
          }
        },
        {
          prop: 'type',
          label: '材料类型'
        },
        {
          prop: 'number',
          label: '数量'
        },
        {
          prop: 'unit',
          label: '单位'
        },
        {
          prop: 'desc',
          label: '备注'
        }
      ],
      condition: [
        { value: 'switch', label: '清空原有数据', select: false }
      ]
    }
  },
  methods: {
    rowClick(row, event, column) {
      console.log(arguments)
    }
  }
}
</script>

<style scoped lang="scss">
.material{
  padding: 0;
  .header{
    display: flex;
    justify-content: space-between;
    .btn{
      display: flex;
    }
  }
}
</style>
