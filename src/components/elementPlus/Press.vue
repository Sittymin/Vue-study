<!-- 获取新闻列表 -->
<script setup lang="ts">
    import { reactive, onMounted, ref } from 'vue';
    import AD from '../../script/AD'
    import type { ApiResponse } from '@/../../env';
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

    const ADs = ref<ApiResponse | null>(null)

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
        AD(2).then(data => {
            ADs.value = data
        }).catch(err => {
            alert("广告请求失败" + JSON.stringify(err));
        })
    })
</script>

<template>
    <div style="margin-top: 0.75rem; margin-bottom: 0.75rem; display: flex; flex-direction: row; justify-content: center;">
        <el-carousel style="width: 75%; padding: 1rem; background-color: #f2f2f2;">
            <el-carousel-item v-if="ADs" v-for="(ad, index) of ADs.rows" :key=index>
                <div style="display: flex; justify-content: center;">
                    <img style="border-radius: var(--rounded-box, 1rem);" :src="`http://172.30.179.248:10001${ad.advImg}`"/>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>

    <div style="display: flex; flex-direction: column; align-items: center;" v-for="(row, index) of pressListReturn.rows" :key="index">
        <el-card v-if="row.title" style=" border-width: 4px; border-color: rgb(203 213 225 / var(1)); background-color: rgb(226 232 240 / var(1)); width: 91.666667%; margin-bottom: 1rem/* 16px */; margin-top: 1rem/* 16px */; margin-right: 1rem/* 16px */; padding: 1.5rem/* 24px */; border-radius: 0.5rem/* 8px */;">
            <div style="display: flex; justify-content: space-between;">
                <!-- 左部分 -->
                <div style="display:flex; flex-direction: row;">
                    <img :src="'http://172.30.179.248:10001' + row.cover" style="height: 13rem; border-radius: 0.5rem" />
                    <h1 style="font-size: 3rem;line-height: 1; font-weight: 700">{{ row.title }}</h1>
                </div>
                <!-- 右部分 -->
                <div style="display: flex; flex-direction: column">
                    <p style="padding-top: 1.5rem;padding-bottom: 1.5rem">
                        <div style="display: flex; flex-direction: row; justify-content: space-between;">
                            <div style="margin-left: 0.75rem; margin-right: 0.75rem;">
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
                    <RouterLink :to="{ path: '/elementplus/read', query:{title: row.title }}"><el-button>阅读</el-button></RouterLink>
                </div>
            </div>
        </el-card>
    </div>
</template>