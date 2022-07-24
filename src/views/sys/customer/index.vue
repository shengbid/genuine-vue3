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
        <template v-if="column.dataIndex === 'sex'">
          <span v-if="Number(record.sex) === 0">男</span>
          <span v-else>女</span>
        </template>
        <template v-if="column.dataIndex === 'option'">
          <a-space>
            <a @click="toDetail(record.id)">详情</a>
            <a-popconfirm
              :title="
                record.isFreeze === '0' ? '是否确定冻结?' : '是否确定解冻?'
              "
              ok-text="确定"
              cancel-text="取消"
              @confirm="confirm(record)"
            >
              <a>
                {{ record.isFreeze === '0' ? '冻结' : '解冻' }}
              </a>
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
  import { getList, toFreeze } from '@/api/userlist'
  import BroadCast from '@/components/broadcast.vue'
  import Detail from '@/components/Detail.vue'
  const columns = [
    {
      title: '商户名称',
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
      title: '公司名称',
      dataIndex: 'realName',
    },
    {
      title: '入驻时间',
      dataIndex: 'creatTime',
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
      async confirm(item) {
        const text = item.isFreeze === '0' ? '冻结成功!' : '解冻成功!'
        await toFreeze(item.id, item.isFreeze === '0' ? 1 : 0)
        message.success(text)
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
    },
  }
</script>
