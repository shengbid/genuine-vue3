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
      <template #bodyCell="{ column }">
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
  import { getList } from '@/api/classify'
  const columns = [
    {
      title: '大类型',
      dataIndex: 'rootName',
    },
    {
      title: '小类型',
      dataIndex: 'industryName',
    },
    {
      title: '修改时间',
      dataIndex: 'time',
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
