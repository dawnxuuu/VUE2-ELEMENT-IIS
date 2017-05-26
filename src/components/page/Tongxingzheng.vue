<template>
    <div>
        <!--面包屑-->
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 通行证查询</el-breadcrumb-item>
                <el-breadcrumb-item></el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!--查询表单-->
        <div>
            <el-form :inline="true" :model="form">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="通行证">
                            <el-input v-model="form.userId" placeholder="通行证UserID"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名">
                            <el-input v-model="form.name" placeholder="姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="手机">
                            <el-input v-model="form.mobile" placeholder="手机号"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="学员号">
                            <el-input v-model="form.sCode" placeholder="学员号"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱">
                            <el-input v-model="form.email" placeholder="邮箱"></el-input>
                        </el-form-item>
                        <el-form-item label="角色">
                            <!--<el-input v-model="form.roleId" placeholder="角色"></el-input>-->
                            <el-select v-model="form.roleId">
                                <el-option label="学生" value="3"></el-option>
                                <el-option label="教师" value="2"></el-option>
                                <!--<el-option label="集团" value="1"></el-option>-->
                            </el-select>
                        </el-form-item>
                        <el-form-item >
                            <el-button type="primary" size="large" @click="onSubmit">查询</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>  
            </el-form>
        </div>

        <!--结果列表-->
        <el-table :data="tableData" border stripe style="width: 100%">
            <el-table-column prop="Account" label="通行证UserID" min-width="160"></el-table-column>
            <el-table-column prop="realName" label="姓名" min-width="130"></el-table-column>
            <el-table-column prop="phone" label="手机号" min-width="150"></el-table-column>
            <el-table-column prop="sCode" label="学员号" min-width="200"></el-table-column>
            <el-table-column prop="email" label="邮箱" min-width="200"></el-table-column>
            <!--<el-table-column prop="roleId" label="角色ID" min-width="200"></el-table-column>-->
            <el-table-column prop="sClassID" label="班级编号" min-width="200"></el-table-column>
            <!--<el-table-column prop="" label="创建时间" min-width="200" sortable></el-table-column>-->
        </el-table>

        <!--分页-->
        <div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="total"
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
                    userId: '',
                    name: '',
                    mobile: '',
                    sCode: '',
                    email: '',
                    roleId: '3'
                }
            }
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.onSubmit();
            },
            onSubmit() {
                let self = this;
                if( !this.form.userId & !this.form.name & !this.form.mobile  & !this.form.sCode & !this.form.email ){
                    this.$message('请输入查询信息！');
                    return false;                                     
                }
                api.getuserInfo(this.form).then(res => {
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

                // this.$axios({
                //     method: 'get',
                //     url: 'http://localhost/IIS/userInfo/getUserInfo',
                //     params: self.form,
                //     onDownloadProgress:function (progressEvent) {
                //         self.loading = true;     
                //     }
                // }).then((res) => {
                //     console.log(res.data);
                //     self.tableData = res.data.Data;
                //     self.data_len = res.data.Data.length;
                //     self.loading = false;
                // }).catch(function(err){
                //     self.$message('请求失败');
                //     console.log(err);
                // })
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