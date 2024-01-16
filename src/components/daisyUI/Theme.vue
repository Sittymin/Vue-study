<script setup lang="ts">
    const setTheme = (theme: string) => {
        localStorage.theme = theme;
        if (theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }
</script>

<template>
    <div class="dropdown">
        <div tabindex="0" role="button" class="btn m-1">
            DaisyUI主题
            <svg width="12px" height="12px" class="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
        </div>
        <ul tabindex="0" class="right-0 dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
            <li><input @click='()=>{setTheme("light")}' type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="亮色" value="light"/></li>
            <li><input @click='()=>{setTheme("dark")}' type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="暗色" value="dark"/></li>
        </ul>
    </div>
</template>