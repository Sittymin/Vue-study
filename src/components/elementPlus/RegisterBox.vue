<script setup lang="ts">
    import { ref, onMounted, defineEmits, reactive } from 'vue';
    let registerbox = ref<HTMLDialogElement | null>(null);

    const emit = defineEmits();
    const RegisterClose = () => {
        emit("close")
    }

    let userName = ref('');
    let password = ref('');
    let phonenumber = ref('');
    let sex = ref('');
    let avatar = ref('');
    let nickName = ref('');
    let email = ref('');
    let idCard = ref('');

    let registersubmitdata = reactive({
        userName: userName.value,   // 用户名
        password: password.value,   // 密码
        phonenumber: phonenumber.value,    // 手机号
        sex: sex.value,        // 性别
        avatar: avatar.value,    // 头像(可选)
        nickName: nickName.value,  // 昵称(可选)
        email: email.value,     // 邮箱(可选)
        idCard: idCard.value     // 身份证(可选)
        })

    function register() {

        if(registerbox.value !== null) {
            // 发送请求
            if( registersubmitdata.userName !== '' &&
                registersubmitdata.password !== '' &&
                registersubmitdata.phonenumber !== '' &&
                registersubmitdata.sex !== ''
                ) {
                fetch('http://172.30.179.248:10001/prod-api/api/register', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(registersubmitdata)
                })
                .then(res => res.json())
                .then(data => {
                    alert("请求成功" + JSON.stringify(data))
                    RegisterClose();
                })
                .catch(err => {
                    alert("请求失败" + JSON.stringify(err))
                })
            } else {
                alert("用户名、密码、手机号、性别不能为空")
            }
        } else {
            alert("注册框加载错误")
        }
    }
    onMounted(() => {
        if(registerbox.value !== null) {
            registerbox.value.showModal();
        }
    })
</script>
<template>
    <dialog ref="registerbox">
        <el-form style="position: fixed; top: 50%; left: 50%; transform:translateY(-50%) translateX(-50%); z-index: 50">
            <div class="modal-box max-w-xs glass">
                <label class="form-control w-full max-w-xs">
                    <span class="flex justify-center mb-3">注册</span>
                    <el-input  type="text" v-model="registersubmitdata.userName" placeholder="用户名" required
                            style="margin-bottom: 0.75rem;"/>
                    <el-input  type="text" v-model="registersubmitdata.nickName" placeholder="昵称"
                            style="margin-bottom: 0.75rem;"/>
                    <el-input  type="password" v-model="registersubmitdata.password" placeholder="密码" required
                            style="margin-bottom: 0.75rem;"/>
                    <el-input  type="tel" v-model="registersubmitdata.phonenumber" placeholder="电话号码" required
                            style="margin-bottom: 0.75rem;"/>
                    <el-radio-group v-model="registersubmitdata.sex" class="flex flex-row content-center justify-center mb-3">
                        <el-radio label="0" required>男</el-radio>
                        <el-radio label="1" required>女</el-radio>
                    </el-radio-group>
                    <el-input  type="email" v-model="registersubmitdata.email" placeholder="邮箱"
                            style="margin-bottom: 0.75rem;"/>
                    <el-input  type="text" v-model="registersubmitdata.idCard" placeholder="身份证"
                            style="margin-bottom: 0.75rem;"/>
                    <div style="display: flex;flex-direction: row;justify-content: flex-end;">
                        <el-button @click="RegisterClose">关闭</el-button>
                        <el-button style="margin-left: 0.75rem; margin-right: 0.75rem" @click="register">注册</el-button>
                    </div>
                </label>
            </div>
        </el-form>
    </dialog>
</template>