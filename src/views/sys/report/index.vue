<template>
  <div>
    <a-table
      :columns="columns"
      :row-key="(record) => record.id"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'status'">
          {{ handleStatus(record.status) }}
        </template>
        <template v-if="column.dataIndex === 'option'">
          <a-space>
            <a @click="toDetail(record.id)">详情</a>
            <a-popconfirm
              title="是否确定标记为已处理? "
              ok-text="确定"
              cancel-text="取消"
              @confirm="confirm(record.id)"
            >
              <a v-if="Number(record.status) === 0">标记处理</a>
            </a-popconfirm>
            <a @click="openBroad(record.id)">广播</a>
          </a-space>
        </template>
      </template>
    </a-table>

    <BroadCast :visible="visible" :ids="ids" @handleCancel="handleCancel" />
    <Detail
      :visible="detailVisible"
      :id="detailId"
      @handleCancel="detailCancel"
    />
  </div>
</template>
<script>
  import { message } from 'ant-design-vue'
  import { getList, setSugestionStatus } from '@/api/report'
  import BroadCast from '@/components/broadcast.vue'
  import Detail from '@/components/Detail.vue'
  const columns = [
    {
      title: '用户类型',
      dataIndex: 'name',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '举报时间',
      dataIndex: 'time',
    },
    {
      title: '举报内容',
      dataIndex: 'desc',
    },
    {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
    },
  ]

  export default {
    components: {
      BroadCast,
      Detail,
    },
    data() {
      return {
        data: [],
        pagination: {
          showLessItems: true,
          showQuickJumper: true,
          showSizeChanger: true,
          current: 1,
          pageSize: 10,
        },
        query: {},
        loading: false,
        columns,
        visible: false,
        detailVisible: false,
        ids: [],
        detailId: null,
      }
    },
    mounted() {
      this.fetch()
    },
    methods: {
      handleTableChange(pagination) {
        this.pagination = pagination
        this.fetch()
      },
      fetch() {
        this.loading = true
        getList(this.pagination, 1).then(({ data }) => {
          const pagination = { ...this.pagination }
          pagination.total = Number(data.total)
          this.loading = false
          this.data = data.records
          this.pagination = pagination
        })
      },
      async confirm(id) {
        await setSugestionStatus(id)
        message.success('标记成功')
        this.fetch()
      },
      toDetail(id) {
        this.detailVisible = true
        this.detailId = id
      },
      openBroad(id) {
        this.visible = true
        this.ids = [id]
      },
      handleCancel(isSuccess) {
        this.visible = false
        if (isSuccess) {
          message.success('留言成功')
        }
      },
      detailCancel() {
        this.detailVisible = false
      },
      handleStatus(status) {
        let text = '-'
        switch (status) {
          case 'error':
            text = '冻结'
            break
          case 'default':
            text = '正常'
            break
          case 'Processing':
            text = '审批中'
            break
          case 'Success':
            text = '已处理'
            break

          default:
            break
        }
        return text
      },
    },
  }
</script>
