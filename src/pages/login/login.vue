<template>
    <div class="ytxd-login">
        <video id="v1" autoplay loop muted>
            <source src="../../../public/mp4/login-video.mp4" type="video/mp4" />
        </video>

        <div class="login-head">
            <h1>防汛作战业务化应用平台</h1>
        </div>

        <div class="login-body">
            <h3>应用平台登录</h3>
            <el-form ref="loginForm" :model="form" :rules="rules" class="login-box" @submit.native.prevent>
                <el-form-item prop="username">
                    <el-input class="login-input" type="text" prefix-icon="el-icon-user" placeholder="请输入账号"
                        v-model="form.username" @keyup.enter.native="onSubmit('loginForm')"></el-input>
                </el-form-item>
                <el-form-item prop="userpwd">
                    <el-input class="login-input" type="password" prefix-icon="el-icon-lock" placeholder="请输入密码"
                        v-model="form.userpwd" @keyup.enter.native="onSubmit('loginForm')"></el-input>
                </el-form-item>

                <el-button class="login-button" type="primary" :loading="loading" @click="onSubmit('loginForm')">登录
                </el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
import { login } from "@/api/common.api";
import { setToken, cacheSet } from "maggot-utils";
import { notifyS, notifyW, notifyE } from "@/plugins/element";

export default {
    name: "ytxd-login",
    mixins: [],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            loading: false,
            form: {
                username: "",
                userpwd: "",
            },
            // 表单验证，需要在 el-form-item 元素中增加 prop 属性
            rules: {
                username: [
                    {
                        required: true,
                        message: "账号不可为空",
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: "密码不可为空",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        onSubmit(formName) {
            this.loading = true;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    login(this.form)
                        .then((response) => {
                            const { addvcd, token, truename, departmentid, layers } =
                                response.data;

                            setToken(token);
                            cacheSet("addvcd", addvcd);
                            cacheSet("username", truename);
                            cacheSet("userid", departmentid);
                            cacheSet("userlayers", layers);

                            notifyS("登录成功!");

                            this.$router.push({ name: "home" });
                        })
                        .catch((error) => {
                            const { msg } = error;
                            notifyE(msg);
                            this.loading = false;
                        });
                } else {
                    this.loading = false;
                    notifyW("请填写完整信息!");
                }
            });
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() { },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    beforeCreate() { }, //生命周期 - 创建之前
    beforeMount() { }, //生命周期 - 挂载之前
    beforeUpdate() { }, //生命周期 - 更新之前
    updated() { }, //生命周期 - 更新之后
    beforeDestroy() { }, //生命周期 - 销毁之前
    destroyed() { }, //生命周期 - 销毁完成
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
@import "./login.scss";
</style>
