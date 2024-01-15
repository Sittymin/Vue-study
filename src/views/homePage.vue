<script setup lang="ts">
    import { ref } from 'vue';
    import themeButton from '@/components/daisyUI/Theme.vue'
</script>
<template>
    <themeButton class="absolute top-2 right-2"/>
    <div class="flex justify-center items-center h-screen w-screen">
        <router-link to="/daisyui">
            <button class="btn text-2xl mx-4" style="height: 35vh; width:35vh">DaisyUI</button>
        </router-link>
        <router-link to="/elementplus">
            <el-button type="primary" style="height: 35vh; width:35vh; font-size: 1.5rem; margin: 1rem">ElementPlus</el-button>
        </router-link>
    </div>
</template>