<template>
    <div>
        <!--面包屑-->
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 学员绑定关系查询</el-breadcrumb-item>
                <el-breadcrumb-item></el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!--查询表单-->
        <div>
            <el-form :inline="true" :model="form">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="学员号">
                            <el-input v-model="form.scode" placeholder="学员号"></el-input>
                        </el-form-item>
                        <el-form-item label="通行证">
                            <el-input v-model="form.UserID" placeholder="通行证UserID"></el-input>
                        </el-form-item>
                        <el-form-item label="UID">
                            <el-input v-model="form.UID" placeholder="UID"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="large" @click="onSubmit">查询</el-button>
                        </el-form-item>
                    </el-col>
                </el-row> 
            </el-form>
        </div>

        <!--结果列表-->
        <el-table :data="tableData" border stripe style="width: 100%">
            <el-table-column prop="" label="学员号" min-width="200"></el-table-column>
            <el-table-column prop="title" label="通行证UserID" min-width="250"></el-table-column>
            <el-table-column prop="" label="学校" min-width="200"></el-table-column>       
            <el-table-column prop="" min-width="200" label="修改时间"></el-table-column>
        </el-table>

        <!--分页-->
        <div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="total, prev, pager, next"
                    :total="data_len">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                data_len: 0,
                cur_page: 1,
                form: {
                    scode: '',
                    UserID: '',
                    UID:''
                }
            }
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.onSubmit();
            },
            onSubmit() {
                // this.$message.success('提交成功！');
                let self = this;
                this.$axios.get('http://cnodejs.org/api/v1/topics', {page:self.cur_page}).then((res) => {
                    self.tableData = res.data.data;
                    self.data_len = res.data.data.length;
                })
            }
        }
    }
</script>

<style scoped>
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>