<template>
  <div>
    <a-modal
      v-model:visible="modalVisible"
      title="留言"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form
        :model="form"
        ref="formRef"
        name="basic"
        :wrapper-col="{ span: 20 }"
        autocomplete="off"
      >
        <a-form-item
          name="message"
          :rules="[{ required: true, message: '请输入留言内容' }]"
        >
          <a-input v-model:value="form.message" placeholder="请输入留言内容" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
  import { defineComponent, watch, ref, reactive } from 'vue'
  import { toBatchMassage } from '@/api/userlist'
  export default defineComponent({
    props: {
      visible: Boolean,
      ids: Array,
    },
    setup(props, context) {
      let modalVisible = ref(false)
      const formRef = ref()
      watch(
        () => props.visible,
        (newVal) => {
          modalVisible.value = newVal
        }
      )
      const form = reactive({
        message: '',
      })
      const handleOk = async () => {
        await formRef.value.validateFields()
        await toBatchMassage({ ids: props.ids, message: form.message })
        context.emit('handleCancel', 1)
        formRef.value.resetFields()
      }
      const handleCancel = () => {
        context.emit('handleCancel')
      }
      return {
        ...props,
        handleOk,
        form,
        modalVisible,
        handleCancel,
        formRef,
      }
    },
  })
</script>
