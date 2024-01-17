<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

import { defineEmits } from 'vue';

interface Emits {
    (event: 'close'): void;
}
let username = ref<string>('')
let password = ref<string>('')
let loginbox = ref<HTMLDialogElement | null>(null);
let errorbox = ref<HTMLDialogElement | null>(null);

const emit: Emits = defineEmits()

const LoginBoxClose = () => {
    emit('close')
}


let token = ref<string | null>(null)
const handleToken = (returntoken: string) => {
    token.value = returntoken;
    // console.log(token.value)
};

onMounted(() => {
    if(localStorage.getItem("localToken") !== null)
        token.value = localStorage.getItem("localToken");
});

onBeforeUnmount(() => {
    if(token.value !== null)
        localStorage.setItem("localToken", token.value)
});

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
        username: username.value,
        password: password.value
    };
    if (loginbox.value !== null) {
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
                    handleToken(data.token);
                    // console.log(data.token)
                    LoginBoxClose();
                    location.reload();
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
    <dialog ref="loginbox">
        <el-form style="position: fixed; top: 50%; left: 50%; transform:translateY(-50%) translateX(-50%); z-index: 50">
            <div class="modal-box max-w-xs glass">
                <label class="form-control w-full max-w-xs">
                    <el-form-item >用户名</el-form-item>
                    <el-input v-model="username"/>
                    <el-form-item class="label-text">密码</el-form-item>
                    <el-input  v-model="password" type="password"/>
                    <el-form-item class="text-label-alt mb-3"><a>没有帐号？</a></el-form-item>
                    <div class="flex flex-row justify-end">
                        <el-button @click="LoginBoxClose"
                        >
                            关闭
                        </el-button>
                        <el-button @click="login"
                                style="margin-left: 12px; margin-right: 12px;"
                        >
                            登录
                        </el-button>
                    </div>
                </label>
            </div>
        </el-form>
    </dialog>
</template>