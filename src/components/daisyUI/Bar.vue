<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import themeButton from '@/components/daisyUI/Theme.vue'    //主题按钮
import Login from '@/components/daisyUI/LoginBox.vue'      //登录框
import Register from '@/components/daisyUI/RegisterBox.vue'


const isLoginBox = ref(false);
const isRegisterBox = ref(false);
let token = ref<string | null>(null)

const LoginClicked = () => {
    isLoginBox.value = true;
}
const LoginClosed = () => {
    isLoginBox.value = false;
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

const handleToken = (returntoken: string) => {
    token.value = returntoken;
    // console.log("可以了" + token.value);
};

onMounted(() => {
    if(localStorage.getItem("localToken") !== null)
        token.value = localStorage.getItem("localToken");
});

onBeforeUnmount(() => {
    if(token.value !== null)
        localStorage.setItem("localToken", token.value)
});

</script>

<template>
    <div class="navbar sticky top-0 bg-slate-300 dark:bg-slate-800 z-50">
        <div class="flex-1">
            <RouterLink to="/" class="btn btn-ghost text-xl">主页</RouterLink>
        </div>
        <themeButton/>
        <div class="flex-none">
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li v-if="token !== null"><a>个人信息</a></li>
                    <li v-if="token !== null"><a @click="Layout">退出登录</a></li>
                    <li v-if="token === null"><a @click="LoginClicked">登录</a></li>
                    <Login v-if="isLoginBox" @close="LoginClosed" @ReturnToken="handleToken"></Login>
                    <li v-if="token === null"><a @click="RegisterClicked">注册</a></li>
                    <Register v-if="isRegisterBox" @close="RegisterClose"></Register>
                </ul>
            </div>
        </div>
    </div>
</template>