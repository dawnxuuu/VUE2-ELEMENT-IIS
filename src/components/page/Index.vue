<template>
    <div>
        <div class="ms-doc">
            <h3>关于本后台</h3>
            <article>
                <h2>前言</h2>
                <p>本系统用于向测试、开发、运营人员提供查询用户数据的功能。</p>
                <span style="font-size:12px;margin-top:20px">本系统基于vue2.js + Element UI组件库。</span>
                <h2>功能</h2>
                <el-checkbox disabled checked>通行证查询</el-checkbox>
                <br>
                <!--<el-checkbox disabled checked>学员绑定关系查询</el-checkbox>-->
                <br>
                <el-checkbox disabled checked>班级查询</el-checkbox>
                <br>
                <!--<el-checkbox disabled checked>学员详情查询</el-checkbox>-->
                <br>
                <el-checkbox disabled checked>教师查询</el-checkbox>
            </article>
        </div>

    </div>
</template>

<script>
    export default {
        data: function(){
            return {}
        }
    }
</script>

<style scoped>
    .ms-doc{
        width:100%;
        max-width: 980px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    .ms-doc h3{
        padding: 9px 10px 10px;
        margin: 0;
        font-size: 14px;
        line-height: 17px;
        background-color: #f5f5f5;
        border: 1px solid #d8d8d8;
        border-bottom: 0;
        border-radius: 3px 3px 0 0;
    }
    .ms-doc article{
        padding: 45px;
        word-wrap: break-word;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .ms-doc article h1{
        font-size:32px;
        padding-bottom: 10px;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
    }
    .ms-doc article h2 {
        margin: 24px 0 16px;
        font-weight: 600;
        line-height: 1.25;
        padding-bottom: 7px;
        font-size: 24px;
        border-bottom: 1px solid #eee;
    }
    .ms-doc article p{
        margin-bottom: 15px;
        line-height: 1.5;
    }
    .ms-doc article .el-checkbox{
        margin-bottom: 5px;
    }
</style>