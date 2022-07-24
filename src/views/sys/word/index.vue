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
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script>
  import { getList } from '@/api/word'
  const columns = [
    {
      title: '文字位置',
      dataIndex: 'name',
      width: 88,
    },
    {
      title: '文字内容',
      dataIndex: 'remark',
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
    },
  }
</script>
