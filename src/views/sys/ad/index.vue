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
        <template v-if="column.dataIndex === 'beginTime'">
          <span>{{ record.beginTime }} - {{ record.overTime }}</span>
        </template>
        <template v-if="column.dataIndex === 'option'">
          <a-space>
            <a>编辑</a>
            <a-popconfirm
              title="是否确定删除? "
              ok-text="确定"
              cancel-text="取消"
              @confirm="confirm(record.id)"
            >
              <a>删除</a>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script>
  import { message } from 'ant-design-vue'
  import { getList, deleteAd } from '@/api/ad'
  const columns = [
    {
      title: '广告位置',
      dataIndex: 'coordinate',
      width: 88,
    },
    {
      title: '图片尺寸',
      dataIndex: 'imageSize',
    },
    {
      title: '广告跳转链接',
      dataIndex: 'aLine',
      ellipsis: true,
    },
    {
      title: '广告预览',
      dataIndex: 'image',
      ellipsis: true,
    },
    {
      title: '有效时间',
      dataIndex: 'beginTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      width: 110,
    },
  ]

  export default {
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
        await deleteAd(id)
        message.success('删除成功')
        this.fetch()
      },
    },
  }
</script>
