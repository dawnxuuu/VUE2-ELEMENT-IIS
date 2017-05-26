<template>
    <div>
        <!--面包屑-->
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 教师查询</el-breadcrumb-item>
                <el-breadcrumb-item></el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!--查询表单-->
        <div>
            <el-form :model="form">
                <el-row :gutter="40">
                    <el-col :span="12">
                        <el-form-item>
                            <el-input width="400px" v-model="form.tname" placeholder="请输入教师姓名或者教师编码"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item >
                            <el-button type="primary" size="large" @click="onSubmit">查询</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <!--结果列表-->
        <el-table :data="tableData" border stripe style="width: 100%" v-loading.body="loading" element-loading-text="拼命加载中">
            <el-table-column prop="teacherName" label="教师姓名" min-width="150"></el-table-column>
            <el-table-column prop="teacherCode" label="教师编码" min-width="200"></el-table-column>
            <el-table-column prop="schoolName" label="学校" min-width="200"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" min-width="150" sortable></el-table-column>
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
    import api from '../../fetch/api.js'

    export default {
        data() {
            return {
                tableData: [],
                data_len: 0,
                cur_page: 1,
                form: {
                    tname: ''
                },
                loading: null
            }
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.onSubmit();
            },
            onSubmit() {
                let self = this;

                if( !this.form.tname ){
                    this.$message('请输入关键字');
                    return false;                                     
                }

                api.getTeacherMsg(this.form.tname).then(res => {
                    if( res.Data.length === 0 ){
                        this.$message('未查询到数据，请准确输入查询信息');
                    }
                    self.tableData = res.Data;
                    self.data_len = res.Data.length;
                    self.loading = false;
                })
                .catch(error => {
                    self.$message('请求失败');
                    console.log(error);
                })

               /* this.$axios({
                    method: 'get',
                    url: 'http://10.202.65.25/IIS/classInfo/getTeacherMsg',
                    params: {
                        keyWord: this.form.tname
                    },
                    onDownloadProgress:function (progressEvent) {
                        self.loading = true;     
                    }
                }).then((res) => {
                    self.tableData = res.data.Data;
                    self.data_len = res.data.Data.length;
                    self.loading = false;
                }).catch(function(err){
                    self.$message('请求失败');
                    console.log(err);
                })*/
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