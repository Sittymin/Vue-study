<script setup lang="ts">
import themeButton from '@/components/daisyUI/Theme.vue'    //主题按钮
</script>

<template>
    <div class="navbar sticky top-0 bg-slate-300 dark:bg-slate-800 z-50">
        <div class="flex-1">
            <RouterLink to="/" class="btn btn-ghost text-xl">daisyUI</RouterLink>
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
                    <li><a>个人信息</a></li>
                    <li><a>登录</a></li>
                    <li><a>注册</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>