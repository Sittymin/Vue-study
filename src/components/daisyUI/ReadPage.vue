<script setup lang="ts">
import { useRoute, } from 'vue-router';
import { reactive, onMounted } from 'vue';
import Bar from '@/components/daisyUI/Bar.vue'


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
    interface Comments {
        total: number
        rows: {
            id: number,             //评论 ID
            appType: string,
            newsId: number,         //新闻 ID
            content: string,        //评论内容
            commentDate: string,
            userId: number,         //用户 ID
            likeNum: number,        //点赞数
            userName: string,       //用户名
            newsTitle: string,      //新闻标题
        }[]
        code: number
        msg: string
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
    const comments:Comments = reactive({
        total: 0,
        rows: [{
            id: 0,             //评论 ID
            appType: '',
            newsId: 0,         //新闻 ID
            content: '',        //评论内容
            commentDate: '',
            userId: 0,         //用户 ID
            likeNum: 0,        //点赞数
             userName: '',       //用户名
            newsTitle: '',      //新闻标题
        }],
        code: 0,
        msg: ''
    })
    const route = useRoute();
    const title = route.query.title;


    onMounted(() => {
        const queryParams = new URLSearchParams();
        if (title) {
            queryParams.append('title', String(title));
        }
        // 新闻主题部分
        fetch(`http://172.30.179.248:10001/prod-api/press/press/list?${queryParams.toString()}`, {
            method: 'GET',
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
        })
        .then(res => res.json())
        .then(data => {
            Object.assign(pressListReturn, data)
            console.log("获取成功" + JSON.stringify(pressListReturn))
        })
        .catch(err => {
            alert("新闻请求失败");
        })
        .then
        (() =>//评论部分
        {const queryComments = new URLSearchParams();
        queryComments.append('newsId', String(pressListReturn.rows[0].id));
        console.log("newsId" + pressListReturn.rows[0].id)
        fetch(`http://172.30.179.248:10001/prod-api/press/comments/list?${queryComments.toString()}`, {
            method: 'GET',
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
        })
        .then(res => res.json())
        .then(data => {
            Object.assign(comments, data);
        })
        .catch(err => {
            alert("评论请求失败");
        })})
    })

</script>
<template>
    <div >
        <Bar></Bar>
        <div class="flex flex-col h-full items-center" :style="{ backgroundImage: 'url(http://172.30.179.248:10001' + pressListReturn.rows[0].cover + ')'}">
            <!-- 新闻内容 -->
            <div v-html="pressListReturn.rows[0].content" class="text-black dark:text-white w-3/4 glass p-10 bg-opacity-30 dark:bg-opacity-90 bg-slate-200 dark:bg-slate-800"></div>
            <!-- 评论部分 -->
            <div v-for="(comment, index) of comments.rows"  class="flex flex-col w-3/4">
                <label class="form-control w-full text-black dark:text-white bg-slate-200 dark:bg-slate-800">
                    <span class="label">{{ comment.userName }}</span>
                    <p>{{ comment.content }}</p>
                    <div class="divider"></div>
                </label>
            </div>
        </div>
    </div>
</template>