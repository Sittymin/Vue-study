<script setup lang="ts">
import { ref } from 'vue';

let loginbox = ref<HTMLDivElement | null>(null);
let errorbox = ref<HTMLDialogElement | null>(null);

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
                    alert("请求成功" + JSON.stringify(data))
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
    <div ref="loginbox">
        <button class="btn btn-sm" onclick="loginbox.showModal()">登录</button>
        <dialog id="loginbox" class="modal">
            <div class="modal-box max-w-xs glass">
                <label class="form-control w-full max-w-xs">
                    <span class="label-text">用户名</span>
                    <input  type="text" name="username" placeholder="请输入用户名" required
                            class="input input-bordered input-sm w-full max-w-xs">
                    <input  type="password" name="password" placeholder="密码" required
                            class="input input-bordered input-sm w-full max-w-xs">

                    <form method="dialog">
                        <button class="btn btn-sm"
                        >
                            关闭
                        </button>
                    </form>
                    <button @click="login"
                            class="btn btn-sm"
                    >
                        登录
                    </button>
                </label>
            </div>
        </dialog>
    </div>
</template>