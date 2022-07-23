<template>
  <a-table
    :columns="columns"
    :row-key="(record) => record.id"
    :data-source="data"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
    <template #bodyCell="{ column, recored }">
      <template v-if="column.key === 'sex'">
        <span v-if="Number(recored.sex) === 0">
          男
        </span>
        <span v-else>女</span>
      </template>
    </template>
  </a-table>
</template>
<script>
  import { getList } from '@/api/userlist'
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '性别',
      dataIndex: 'sex',
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: '手机',
      dataIndex: 'phone',
    },
    {
      title: '微信',
      dataIndex: 'wechart',
    },
    {
      title: '实名',
      dataIndex: 'realName',
    },
    {
      title: '注册时间',
      dataIndex: 'creatTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
    }
  ]

  export default {
    data() {
      return {
        data: [],
        pagination: {
          showLessItems: true,
          showQuickJumper: true,
          showSizeChanger: true,
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
        const pager = { ...this.pagination }
        pager.current = pagination.current
        this.pagination = pager
        this.fetch()
      },
      fetch() {
        this.loading = true
        getList(this.pagination).then(({ data }) => {
          const pagination = { ...this.pagination }
          pagination.total = data.total
          this.loading = false
          this.data = data.records
          this.pagination = pagination
        })
      },
    },
  }
</script>
