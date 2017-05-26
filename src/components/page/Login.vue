<template>
    <div class="login-wrap">
        <div class="ms-title">留学考试APP运营后台</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="userName">
                    <el-input v-model="ruleForm.userName" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm(ruleForm)">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码必须填写。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
import api from '../../fetch/api.js'
import Base64 from 'js-base64';
import Cookies from 'js-cookie';
    export default {
        data: function(){
            return {
                ruleForm: {
                    userName: '',
                    password: ''
                },
                rules: {
                    userName: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(ruleForm) {
                const self = this;
                api.Login(this.ruleForm).then(res => {
                   if(res.Data == 1) {
                        Cookies.set('webToken', this.ruleForm.userName,{ expires: 1 });
                        this.$router.replace('index')
                    }else{
                        this.$message('登录失败！');                        
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.$message('登录失败！');

                })
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>