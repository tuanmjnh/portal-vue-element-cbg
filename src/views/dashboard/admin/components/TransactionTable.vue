<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="Order_No" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.order_no | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column label="Price" width="195" align="center">
      <template slot-scope="scope">
        ¥{{ scope.row.price | toThousandFilter }}
      </template>
    </el-table-column>
    <el-table-column label="Status" width="100" align="center">
      <template slot-scope="{row}">
        <el-tag :type="row.status | statusFilter">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { NewGuid, RandomDate } from '@/utils'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.list = []
      for (let index = 0; index < 8; index++) {
        this.list.push({
          order_no: NewGuid().substr(0, 18),
          timestamp: RandomDate(new Date(2012, 0, 1), new Date()),
          username: 'name',
          price: (Math.random() * (0.120 - 0.0200) + 0.0200).toFixed(4),
          status: Math.random() % 2 === 0 ? 'success' : 'pending'
        })
      }
    }
  }
}
</script>
