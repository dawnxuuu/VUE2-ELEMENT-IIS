<template>
    <div>
        <!--面包屑-->
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 学员详情查询</el-breadcrumb-item>
                <el-breadcrumb-item>{{ para }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!--查询表单-->
        <div>
            <el-form :inline="true" :model="form">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="学员姓名">
                            <el-input v-model="form.sname" placeholder="学员姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="学员号">
                            <el-input v-model="form.UserID" placeholder="学员号"></el-input>
                        </el-form-item>
                        
                        <el-form-item label="学校">
                            <el-input v-model="form.sschool" placeholder="学校"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="教师姓名">
                            <el-input v-model="form.tname" placeholder="教师姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="教师编码">
                            <el-input v-model="form.tcode" placeholder="教师编码"></el-input>
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
            <el-table-column prop="title" label="学员姓名" min-width="120"></el-table-column>
            <el-table-column prop="" label="性别" min-width="130"></el-table-column>
            <el-table-column prop="" label="学校" min-width="150"></el-table-column>
            <el-table-column prop="" label="学员号" min-width="200"></el-table-column>
            <el-table-column prop="" label="教师名称" min-width="150"></el-table-column>
            <el-table-column prop="" label="教师编码" min-width="200"></el-table-column>
            <el-table-column prop="" label="报名时间" min-width="200" sortable></el-table-column>
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
        mounted () {
	        this.getParam ()
	    },
        data() {
            return {
                tableData: [],
                data_len: 0,
                cur_page: 1,
                form: {
                    sname: '',
                    UserID: '',
                    sschool: '',
                    tname:'',
                    tcode: ''
                },
                para: this.$route.params.userId
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
                this.$axios.get('http://10.202.65.25/IIS/classInfo/getClassMsg').then((res) => {
                    console.log(res);
                    // self.tableData = res.data.data;
                    // self.data_len = res.data.data.length;
                })
            },
            getParam () {
                console.log('得到回传的数据+' + this.$route.params.classCode);
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