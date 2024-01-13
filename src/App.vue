<script setup lang="ts">

import { ref } from 'vue';

let formbox = ref(null);
let loginbox = ref(null);
let registerbox = ref(null);

function toregister() {
}
function tologin() {
}

function login() {
    let submitdata = {};
    const formdata = loginbox.value.querySelectorAll('input');
    formdata.forEach(input => {
        if (input.type === 'radio') {
            if (input.checked) {
                submitdata[input.name] = input.value;
            }
        } else {
            submitdata[input.name] = input.value;
        }
    });
    fetch('http://172.30.179.248:10001/prod-api/api/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(submitdata)
    })
    .then(res => res.json())
    .then(data => {
        alert("请求成功" + JSON.stringify(data))
    })
    .catch(err => {
        alert("请求失败" + JSON.stringify(err))
    })
}
function register() {
    let submitdata:{
        avatar?: string,
        userName: string,
        nickName?: string,
        password: string,
        phonenumber: string,
        sex: string,
        email?: string,
        idCard?: string
    } = {
        userName: '',
        password: '',
        phonenumber: '',
        sex: '',
    }
    const formdata = registerbox.value.querySelectorAll('input');
    formdata.forEach(input => {
        submitdata[input.name] = input.value;
    });
    fetch('http://172.30.179.248:10001/prod-api/api/register', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(submitdata)
    })
    .then(res => res.json())
    .then(data => {
        alert("请求成功" + JSON.stringify(data))
    })
    .catch(err => {
        alert("请求失败" + JSON.stringify(err))
    })
}

</script>
<template>
    <div>
        <main>
            <div>
                <div ref="formbox">
                    <div ref="registerbox">
                        <h1>注册</h1>
                        <input type="text" name="userName" placeholder="用户名" required>
                        <input type="text" name="nickName" placeholder="昵称">
                        <input type="password" name="password" placeholder="密码" required>
                        <input type="tel" name="phonenumber" placeholder="电话号码" required>
                        <div>
                            <label >性别：</label>
                            <input type="radio" name="sex" id="man" value="0" required>
                            <label for="man">男</label>
                            <input type="radio" name="sex" id="woman" value="1" required>
                            <label for="woman">女</label>
                        </div>
                        <input type="email" name="email" placeholder="邮箱">
                        <input type="text" name="idCard" placeholder="身份证">
                        <button @click="register">注册</button>
                    </div>
                    <div ref="loginbox">
                        <h1>登录</h1>
                        <input type="text" name="username" placeholder="用户名" required>
                        <input type="password" name="password" placeholder="密码" required>
                        <button @click="login">登录</button>
                    </div>
                </div>
                <div>
                    <h2>欢迎来到智慧城市管理系统</h2>
                    <button id="login" @click="tologin">去登录</button>
                </div>
                <div>
                    <h2>欢迎回到智慧城市管理系统</h2>
                    <button id="register" @click="toregister">去注册</button>
                </div>
            </div>
        </main>
    </div>
</template>