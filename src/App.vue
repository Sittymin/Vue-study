<script setup>


</script>
<template>
    <div>
        <main>
            <div class="container">
                <div class="formbox">
                    <div class="register">
                        <h1>register</h1>
                        <input type="text" name="userName" placeholder="用户名" required>
                        <input type="text" name="nickName" placeholder="昵称">
                        <input type="password" name="password" placeholder="密码" required>
                        <input type="tel" name="phonenumber" placeholder="电话号码" required>

                        <input type="radio" name="sex" id="man" value="0" required>
                        <label for="man">男</label>
                        <input type="radio" name="sex" id="woman" value="1" required>
                        <label for="woman">女</label>

                        <input type="email" name="email" placeholder="邮箱">
                        <input type="text" name="idCard" placeholder="身份证">
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>