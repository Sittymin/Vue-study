<script setup lang="ts">
import { useRoute, } from 'vue-router';
import { reactive, onMounted, ref } from 'vue';
import Bar from '@/components/daisyUI/Bar.vue'


let token = ref<string | null>(null)
onMounted(() => {
    if(localStorage.getItem("localToken") !== null)
        token.value = localStorage.getItem("localToken");
});

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


    function upComment () {
        const commentTextArea = document.querySelector("#commentText") as HTMLTextAreaElement;
        let commentText: {
            newsId: number
            content: string
        } = {
            newsId: pressListReturn.rows[0].id,
            content: commentTextArea.value
        };
        console.log(commentText);
        fetch("http://172.30.179.248:10001/prod-api/press/pressComment", {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + token.value
            },
            body: JSON.stringify(commentText)
        })
        .then(res => res.json())
        .then(data => {
            if(data.code === 200){
                alert("评论成功");
                commentTextArea.value = "";
                getComment();
            }
            else{
                alert("评论失败");
            }
        })
    }


    function getComment () {
        const queryComments = new URLSearchParams();
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
        })
    }


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
            // console.log("获取成功" + JSON.stringify(pressListReturn))
        })
        .catch(err => {
            alert("新闻请求失败");
        })
        .then(() => getComment())
    })

</script>
<template>
    <div >
        <Bar></Bar>
        <div class="flex flex-col h-full items-center" :style="{ backgroundImage: 'url(http://172.30.179.248:10001' + pressListReturn.rows[0].cover + ')'}">
            <!-- 新闻内容 -->
            <div class="text-black dark:text-white w-3/4 glass p-10 bg-opacity-30 dark:bg-opacity-90 bg-slate-200 dark:bg-slate-800">
                <div v-html="pressListReturn.rows[0].content" ></div>
                <!-- 其他元素 -->

<!-- 需要点击点赞交互 -->

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                </svg>
                {{ pressListReturn.rows[0].likeNum }}
            </div>
            <!-- 加载评论部分 -->
            <div v-for="(comment, index) of comments.rows"  class="flex flex-col w-3/4">
                <label class="form-control w-full text-black dark:text-white bg-slate-200 dark:bg-slate-800">
                    <div class="flex flex-row justify-between mx-10">
                        <div>
                            <span class="label">{{ comment.userName }}</span>
                            <p>{{ comment.content }}</p>
                        </div>
                        <!-- 右部分 -->
                        <div class="flex flex-row justify-between self-center">
                            {{ comment.likeNum }}

<!-- 需要点击点赞交互 -->

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                            </svg>
                        </div>
                    </div>
                    <div class="divider"></div>
                </label>
            </div>
            <!-- 发表评论部分 -->
            <div class="flex flex-col w-3/4">
                <label class="form-control text-black dark:text-white bg-slate-200 dark:bg-slate-800">
                    <div class="flex flex-row mx-10">
                        <div class="flex-grow">
                            <span class="label">发表评论</span>
                            <div class="flex flex-row h-24">
                                <textarea id="commentText" class="textarea resize-none w-full textarea-bordered textarea-primary" placeholder="请输入评论内容"></textarea>
                                <div class="self-center ml-4">

<!-- 需要tooken发表评论，需要发送代码 -->

                                    <button class="btn btn-primary w-16 h-24" @click="upComment">发表</button>
                                </div>
                            </div>
                        </div>
                        <!-- 右部分 -->

                    </div>
                    <div class="divider"></div>

                </label>
            </div>
        </div>
    </div>
</template>