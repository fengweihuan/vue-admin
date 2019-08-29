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
      deleteId="材料编号"
    )
      template(slot="button")
        el-button(type="primary" size="small") solt button
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
          title: '材料编号',
          type: 'input',
          key: '材料编号',
          rule: { required: true, message: '请输入材料编号', trigger: 'blur' },
          props: {
            'placeholder': '请输入材料编号'
          }
        },
        {
          title: '材料名称',
          type: 'input',
          key: '材料名称',
          rule: { required: true, message: '请输入材料名称', trigger: 'blur' },
          props: {
            'placeholder': '请输入材料名称'
          }
        },
        {
          title: '材料规格',
          type: 'input',
          key: '材料规格',
          rule: { required: true, message: '请输入材料规格', trigger: 'blur' },
          props: {
            'placeholder': '请输入材料规格'
          }
        },
        {
          title: '材料类别',
          type: 'select',
          key: '材料类别',
          rule: { required: true, message: '请选择材料类别', trigger: 'change' },
          props: {
            'placeholder': '请选择材料类别',
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
        },
        
        {
          title: '数量',
          type: 'input',
          key: '数量',
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
          key: '单位',
          rule: { required: true, message: '请输入单位', trigger: 'blur' },
          props: {
            'placeholder': '请输入单位'
          }
        },
        {
          title: '预计损耗比例',
          type: 'input',
          key: '预计损耗比例',
          rule: { required: true, message: '请输入预计损耗比例', trigger: 'blur' },
          props: {
            'placeholder': '请输入预计损耗比例'
          }
        },
        {
          title: '备注',
          type: 'input',
          key: '备注',
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
          prop: '材料编号',
          label: '材料编号'
        },
        {
          prop: '材料名称',
          label: '材料名称',
          html({ row, $index }, prop) {
            return `<span>${row[prop]}</span>`
          }
        },
        {
          prop: '材料规格',
          label: '材料规格'
        },
        {
          prop: '数量',
          label: '数量'
        },
        {
          prop: '单位',
          label: '单位'
        },
        {
          prop: '预计损耗比例',
          label: '预计损耗比例'
        },
        {
          prop: '备注',
          label: '备注'
        }
      ]
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
