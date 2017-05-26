<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i class="el-icon-menu"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i class="el-icon-setting"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        index: 'index',
                        title: '首页'
                    },
                    {
                        index: 'tongxingzheng',
                        title: '通行证查询'
                    },
                    // {
                    //     index: 'bangding',
                    //     title: '学员绑定关系查询'
                    // },
                    {
                        index: 'banji',
                        title: '班级查询'
                    },
                    // {
                    //     index: 'xueyuan',
                    //     title: '学员详情查询'
                    // },
                    {
                        index: 'jiaoshi',
                        title: '教师查询'
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
