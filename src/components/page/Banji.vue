<template>
    <div>
        <!--面包屑-->
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 班级查询</el-breadcrumb-item>
                <el-breadcrumb-item></el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!--查询表单-->
        <div>
            <el-form  :model="form">
                <el-row :gutter="40">
                    <el-col :span="12">
                        <el-form-item>
                            <el-input width="400px"  v-model="form.cname" placeholder="请输入班级名称或者班级编号"></el-input>
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
            <el-table-column label="班级编号" width="200">
                <template scope="scope">
                    <span>{{ scope.row.classCode }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="className" label="班级名称" min-width="200"></el-table-column>
            <el-table-column prop="schoolName" label="学校名称" min-width="130"></el-table-column>
            <el-table-column prop="projectName" label="项目" min-width="150"></el-table-column>
            <el-table-column prop="beginDate" label="开班时间" min-width="150" sortable></el-table-column>
            <!--<el-table-column label="学员详情" min-width="200"> 
                <template scope="scope">
                    <el-button size="small"  @click="getClassCode(scope.$index, scope.row)">点击查看详情</el-button>
                </template>
            </el-table-column>-->
            <!--<el-table-column prop="" label="教师姓名" width="200"></el-table-column>-->
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
                    cname: ''
                },
                classCode: '',
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

                if( !this.form.cname ){
                    this.$message('请输入关键字');
                    return false;                                     
                }

                api.getClassMsg(this.form.cname).then(res => {
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
                //     url: 'http://10.202.65.25/IIS/classInfo/getClassMsg',
                //     params: {
                //         keyWord: this.form.cname
                //     },
                //     onDownloadProgress:function (progressEvent) {
                //         self.loading = true;     
                //     }
                // }).then((res) => {
                //     self.tableData = res.data.Data;
                //     self.data_len = res.data.Data.length;
                //     self.loading = false;
                // }).catch(function(err){
                //     self.$message('请求失败');
                //     console.log(err);
                // })
            },
            getClassCode(index, row) {
                console.log(row.title);
                this.classCode = row.title;
                this.$router.push({name: 'xueyuan', params: { classCode: this.classCode }})
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