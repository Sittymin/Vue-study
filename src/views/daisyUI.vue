<script setup lang="ts">

import { ref } from 'vue';
import LoginBox from '@/components/daisyUI/LoginBox.vue'
import RegisterBox from '@/components/daisyUI/RegisterBox.vue'
import themeButton from '@/components/daisyUI/Theme.vue'    //主题按钮
import Categorys from '@/components/daisyUI/Categorys.vue'  //新闻分类
import Press from '@/components/daisyUI/Press.vue'          //新闻列表


</script>
<template>
    <div>
        <main>
            <!-- bar -->
            <div class="navbar ">
                <div class="flex-1">
                    <a class="btn btn-ghost text-xl">daisyUI</a>
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

            <!-- 新闻分类（绝对定位到右边居中） -->
            <Categorys class="absolute right-2 top-1/2 transform -translate-y-1/2"/>
            <Press/>
        </main>
    </div>
</template>