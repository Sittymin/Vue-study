<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Login from '../../components/elementPlus/LoginBox.vue'      //登录框
import Register from '../../components/elementPlus/RegisterBox.vue'

let token = ref<string | null>(null)

const isLoginBox = ref(false);
const isRegisterBox = ref(false);


const LoginClicked = () => {
    isLoginBox.value = true;
    console.log("click触发")
}
const LoginClosed = () => {
    isLoginBox.value = false;
    console.log("close触发")
}

const RegisterClicked = () => {
    isRegisterBox.value = true;
}

const RegisterClose = () => {
    isRegisterBox.value = false;
}

const Layout = () => {
    token.value = null;
    localStorage.removeItem("localToken");
    location.reload()
}
onMounted(() => {
    if(localStorage.getItem("localToken") !== null)
        token.value = localStorage.getItem("localToken");
});


</script>

<template>
    <el-header style="display: flex; justify-content: space-between; background-color: #808080">
        <div style="display: flex; flex-direction:column; justify-content: center">
            <RouterLink to="/" ><el-button>主页</el-button></RouterLink>
        </div>
        <div style="display: flex; flex-direction:column; justify-content: center">
            <el-dropdown>
                <div style="position: relative;display: inline-flex;border-radius: 9999px;padding: 0px;">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10" >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item v-if="token !== null"><a>个人信息</a></el-dropdown-item>
                        <el-dropdown-item v-if="token !== null"><a @click="Layout">退出登录</a></el-dropdown-item>
                        <el-dropdown-item v-if="token === null"><a @click="LoginClicked">登录</a></el-dropdown-item>
                        <Login v-if="isLoginBox" @close="LoginClosed"></Login>
                        <el-dropdown-item v-if="token === null"><a @click="RegisterClicked">注册</a></el-dropdown-item>
                        <Register v-if="isRegisterBox" @close="RegisterClose"></Register>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template>