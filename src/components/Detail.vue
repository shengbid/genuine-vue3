<template>
  <div>
    <a-modal
      v-model:visible="modalVisible"
      title="详情"
      @cancel="handleCancel"
      :footer="null"
      width="60%"
    >
      <a-descriptions>
        <template #title>
          <a-avatar :size="34">
            <template #icon><UserOutlined /></template>
          </a-avatar>
        </template>
        <a-descriptions-item label="实名">
          {{ userInfo.realName }}
        </a-descriptions-item>
        <a-descriptions-item label="身份证号">
          {{ userInfo.idNumber }}
        </a-descriptions-item>
        <a-descriptions-item label="年龄">
          {{ userInfo.age }}
        </a-descriptions-item>
        <a-descriptions-item label="性别">
          {{ userInfo.sex === '0' ? '男' : '女' }}
        </a-descriptions-item>
        <a-descriptions-item label="专业">
          {{ userInfo.major }}
        </a-descriptions-item>
        <a-descriptions-item label="技能经验">
          {{ userInfo.experience }}
        </a-descriptions-item>
        <a-descriptions-item label="介绍">
          {{ userInfo.detail }}
        </a-descriptions-item>
        <a-descriptions-item label="联系电话">
          {{ userInfo.cellPhone }}
        </a-descriptions-item>
        <a-descriptions-item label="联系手机">
          {{ userInfo.phone }}
        </a-descriptions-item>
        <a-descriptions-item label="微信">
          {{ userInfo.wechart }}
        </a-descriptions-item>
        <a-descriptions-item label="qq">{{ userInfo.qq }}</a-descriptions-item>
        <a-descriptions-item label="邮箱">
          {{ userInfo.email }}
        </a-descriptions-item>
        <a-descriptions-item label="其他号">
          {{ userInfo.other }}
        </a-descriptions-item>
        <a-descriptions-item label="广告网址">
          {{ userInfo.website }}
        </a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>
<script>
  import { defineComponent, watch, ref, toRefs, reactive } from 'vue'
  import { getUserInfo } from '@/api/userlist'
  import { UserOutlined } from '@ant-design/icons-vue'
  export default defineComponent({
    props: {
      visible: Boolean,
      id: String,
    },
    components: {
      UserOutlined,
    },
    setup(props, context) {
      let modalVisible = ref(false)

      watch(
        () => props.visible,
        (newVal) => {
          modalVisible.value = newVal
        }
      )
      watch(
        () => props.id,
        (newVal) => {
          if (newVal) {
            getDetail(newVal)
          }
        }
      )

      let info = reactive({
        userInfo: {},
      })

      const getDetail = async (id) => {
        const { data } = await getUserInfo(id)
        info.userInfo = data
      }
      const handleCancel = () => {
        context.emit('handleCancel')
      }
      return {
        ...props,
        modalVisible,
        handleCancel,
        ...toRefs(info),
      }
    },
  })
</script>
