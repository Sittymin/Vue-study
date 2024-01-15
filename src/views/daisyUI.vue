<script setup lang="ts">

import { ref } from 'vue';
import LoginBox from '@/components/daisyUI/LoginBox.vue'
import RegisterBox from '@/components/daisyUI/RegisterBox.vue'
import Categorys from '@/components/daisyUI/Categorys.vue'  //新闻分类
import Press from '@/components/daisyUI/Press.vue'          //新闻列表
import Bar from '@/components/daisyUI/Bar.vue'


</script>
<template>
    <div>
        <main>
            <!-- bar -->
            <Bar></Bar>

            <!-- 新闻分类 -->
            <Categorys class="z-50 fixed right-4 top-1/2 transform -translate-y-1/2"/>
            <Press/>
        </main>
    </div>
</template>