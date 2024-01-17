<script setup lang="ts">
    import { reactive, onMounted } from 'vue';

    interface Categorys {
        "msg": string,          //消息内容
        "code": number,         //状态码
        "data": {               //列表数据（数组类型）
            "id": number,       //分类编号
            "appType": string,  //app 类型
            "name": string,     //分类名称
            "sort": number,     //分类序号
        }[]
    }

    let categorys: Categorys = reactive({
        "msg": "",
        "code": 0,
        "data": []
    });

    onMounted(() => {
        fetch("http://172.30.179.248:10001/prod-api/press/category/list", {
            method: 'GET',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        })
        .then(res => res.json())
        .then(data => {
            Object.assign(categorys, data);
            // console.log("新闻分类请求成功" + JSON.stringify(data));
        })
        .catch(err => {
            alert("新闻分类请求失败" + JSON.stringify(err));
        });
    });

</script>

<template>
    <el-radio-group style="display: flex;flex-direction: column;" size="large">
        <div v-for="(obj, index) of categorys.data" :key="index">
            <el-radio-button type="radio" name="options" :label=obj.name />
        </div>
    </el-radio-group>
</template>