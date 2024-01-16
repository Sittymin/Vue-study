<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { defineEmits } from 'vue';

interface Emits {
    (event: 'ReturnToken', returntoken: string): void;
    (event: 'close'): void;
}

let loginbox = ref<HTMLDialogElement | null>(null);
let errorbox = ref<HTMLDialogElement | null>(null);

const emit: Emits = defineEmits()

const LoginBoxClose = () => {
    emit('close')
}

function returnToken(token: string) {
    emit("ReturnToken", token)
}

function showErrorBox() {
    if (errorbox.value) {
        errorbox.value.showModal();
    } else {
        alert("错误框加载错误");
    }
}


function login() {
    // 定义登录提交数据
    let loginsubmitdata: {
        username: string,   // 用户名
        password: string    // 密码
    } = {
        username: '',
        password: ''
    };
    if (loginbox.value !== null) {
        // 获取表单数据
        const formdata = loginbox.value.querySelectorAll('input');
        // 遍历表单数据
        formdata.forEach((input: HTMLInputElement) => {
            loginsubmitdata[input.name as keyof typeof loginsubmitdata] = input.value;
        });
        // 发送请求
        if (loginsubmitdata.username !== '' &&
            loginsubmitdata.password !== '') {
            fetch('http://172.30.179.248:10001/prod-api/api/login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(loginsubmitdata)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.token != null) {
                        returnToken(data.token);
                        // console.log(data.token)
                        LoginBoxClose();
                    } else {
// 有时间把错误框变成可以复用的组件
                        alert("token获取失败");
                    }
                })
                .catch(err => {
                    alert("请求失败" + JSON.stringify(err))
                })
        } else {
            showErrorBox();
        }
    } else {
        alert("登录框加载错误")
    }
}

onMounted(() => {
    if (loginbox.value !== null){
        loginbox.value.showModal();
    }
})
</script>
<template>
    <dialog ref="errorbox" class="modal">
        <div class="modal-box">
            <p class="text-center">用户名或密码不能为空</p>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
    <dialog ref="loginbox" class="modal">
        <div class="modal-box max-w-xs glass">
            <label class="form-control w-full max-w-xs">
                <span class="label-text">用户名</span>
                <input  type="text" name="username" placeholder="请输入用户名" required
                        class="input input-bordered input-sm w-full mb-3">
                <span class="label-text">密码</span>
                <input  type="password" name="password" placeholder="密码" required
                        class="input input-bordered input-sm w-full">
                <span class="text-label-alt mb-3"><a>没有帐号？</a></span>
                <div class="flex flex-row justify-end">
                    <form method="dialog">
                        <button class="btn btn-sm" @click="LoginBoxClose"
                        >
                            关闭
                        </button>
                    </form>
                    <button @click="login"
                            class="btn btn-sm mx-3"
                    >
                        登录
                    </button>
                </div>
            </label>
        </div>
    </dialog>
</template>