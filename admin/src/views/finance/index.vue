<template>
  <div>
    <el-form :inline="true" :model="formInline" size="mini" >
      <el-row>
        <el-col :lg="24" >
          <el-form-item label="日期">
            <el-date-picker
              v-model="formInline.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :lg="24" >
          <el-form-item label="产品名称">
            <el-input v-model="formInline.user" placeholder="产品名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="onSubmit">重置</el-button>
            <el-button type="primary" @click="onSubmit">导出</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="">
      <el-row>
        <el-col :lg="24" >
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formInline: {
        user: '',
        region: '',
        date: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>
