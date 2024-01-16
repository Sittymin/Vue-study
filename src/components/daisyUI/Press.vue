<!-- 获取新闻列表 -->
<script setup lang="ts">
    import { reactive, onMounted } from 'vue';
    import { setTheme } from '@/components/daisyUI/setTheme';
    interface PressListReturn {
        code: number,
        msg: string,
        total: number,
        rows: {
            id: number,         //新闻 ID
            cover: string,      //新闻封面图片地址
            title: string,      //新闻标题
            content: string,    //新闻内容
            publishDate: string,//发布日期
            commentNum: number, //评论数
            likeNum: number,    //点赞数
            readNum: number,    //阅读数
            top: string,        //是否推荐，参见字典名：系统是否
            hot: string         //是否热点，参见字典名：系统是否
        }[]
    }

    const pressListReturn:PressListReturn = reactive({
        code: 0,
        msg: '',
        total: 0,
        rows: [{
            id: 0,
            cover: '',
            title: '',
            content: '',
            publishDate: '',
            commentNum: 0,
            likeNum: 0,
            readNum: 0,
            top: '',
            hot: ''
        }]
    })

    onMounted(() => {
        fetch("http://172.30.179.248:10001/prod-api/press/press/list", {
            method: 'GET',
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
        })
        .then(res => res.json())
        .then(data => {
            Object.assign(pressListReturn, data)
        })
        .catch(err => {
            alert("新闻列表请求失败" + JSON.stringify(err));
        });
    })
</script>

<template>
    <div class="hero h-68 flex-col" v-for="(row, index) of pressListReturn.rows" :key="index">
        <div v-if="row.title" class="hero-content border-4 border-slate-300 hover:border-indigo-300 bg-slate-200 dark:hover:border-indigo-700 dark:bg-slate-800 dark:border-slate-600 w-11/12 my-4 mr-4 p-6 rounded-lg  justify-between">
            <!-- 左部分 -->
            <div class="flex flex-row">
                <img :src="'http://172.30.179.248:10001' + row.cover" class="h-52 rounded-lg shadow-2xl" />
                <h1 class="text-5xl font-bold">{{ row.title }}</h1>
            </div>
            <!-- 右部分 -->
            <div class="flex flex-col">
                <p class="py-6">
                    <div class="flex flex-row justify-between">
                        <div class="mx-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                            </svg>
                            {{ row.likeNum }}
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                            </svg>
                            {{ row.commentNum }}
                        </div>
                    </div>
                </p>
                <RouterLink :to="{ path: '/daisyui/read', query:{title: row.title }}" class="btn btn-primary">阅读</RouterLink>
            </div>
        </div>
        <!-- 加载占位符 -->
        <div v-else class="flex flex-col h-68 w-full items-center">
            <div class="skeleton w-11/12 h-64 rounded-lg border-4 my-4 mr-10 ml-6 p-0"></div>
            <div class="skeleton w-11/12 h-64 rounded-lg border-4 my-4 mr-10 ml-6 p-0"></div>
        </div>
    </div>
</template>