<script setup lang="ts">
    import { ref } from 'vue';
    let registerbox = ref<HTMLDivElement | null>(null);
    function register() {
        let registersubmitdata: {
            avatar?: string,    // 头像(可选)
            userName: string,   // 用户名
            nickName?: string,  // 昵称(可选)
            password: string,   // 密码
            phonenumber: string,    // 手机号
            sex: string,        // 性别
            email?: string,     // 邮箱(可选)
            idCard?: string     // 身份证(可选)
        } = {
            userName: '',
            password: '',
            phonenumber: '',
            sex: ''
        }
        if(registerbox.value !== null) {
            const formdata = registerbox.value.querySelectorAll('input');
            // 遍历表单数据
            formdata.forEach((input: HTMLInputElement) => {
                // 判断是否为单选框
                if (input.type === 'radio') {
                    if (input.checked) {
                        registersubmitdata[input.name as keyof typeof registersubmitdata] = input.value;
                    }
                } else {
                    registersubmitdata[input.name as keyof typeof registersubmitdata] = input.value;
                }
            });
            // 发送请求
            if( registersubmitdata.userName !== '' &&
                registersubmitdata.password !== '' &&
                registersubmitdata.phonenumber !== '' &&
                registersubmitdata.sex !== ''
                ) {
                fetch('http://172.30.179.248:10001/prod-api/api/register', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(registersubmitdata)
                })
                .then(res => res.json())
                .then(data => {
                    alert("请求成功" + JSON.stringify(data))
                })
                .catch(err => {
                    alert("请求失败" + JSON.stringify(err))
                })
            } else {
                alert("用户名、密码、手机号、性别不能为空")
            }
        } else {
            alert("注册框加载错误")
        }
    }
</script>
<template>
    <div ref="registerbox">
        <h1>注册</h1>
        <input type="text" name="userName" placeholder="用户名" required>
        <input type="text" name="nickName" placeholder="昵称">
        <input type="password" name="password" placeholder="密码" required>
        <input type="tel" name="phonenumber" placeholder="电话号码" required>
        <div>
            <label>性别：</label>
            <input type="radio" name="sex" id="man" value="0" required>
            <label for="man">男</label>
            <input type="radio" name="sex" id="woman" value="1" required>
            <label for="woman">女</label>
        </div>
        <input type="email" name="email" placeholder="邮箱">
        <input type="text" name="idCard" placeholder="身份证">
        <button @click="register">注册</button>
    </div>
</template>