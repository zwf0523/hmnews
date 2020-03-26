<template>
  <div class="containner">
    <!-- 返回上一页 -->
    <div class="back-btn">
      <span class="iconfont iconicon-test"></span>
    </div>
    <!-- logo -->
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <!-- 表单 -->
    <div class="form">
      <div class="form-item">
        <input placeholder="手机号码" v-model="form.username" />
      </div>
      <div class="form-item">
        <input type="password" placeholder="请输入密码" v-model="form.password" />
      </div>
      <div class="form-item">
        <button @click="handleClick">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    handleClick() {
      this.$toast("登录成功");
      this.$axios({
        url: "/login",
        method: "post",
        data: this.form
      }).then(res => {
        const { message } = res.data;
        this.$toast.success(message);
      });
    }
  }
};
</script>

<style lang="less">
.containner {
  padding: 20/360 * 100vw;
}

.back-btn {
  font-size: 27/360 * 100vw;
  line-height: 0;
}

.logo {
  text-align: center;
  margin-top: 20/360 * 100vw;
}

.logo span {
  font-size: 126/360 * 100vw;
  color: #cc3300;
}

.form-item input {
  width: 100%;
  height: 44/360 * 100vw;
  box-sizing: border-box;
  line-height: 44/360 * 100vw;
  background: none;
  border: none;
  border-bottom: 1px #999 solid;
  outline: none;
  font-size: 16px;
}

.form-item button {
  width: 100%;
  height: 48/360 * 100vw;
  background: #cc3300;
  color: #fff;
  //   圆角
  border-radius: 50px;
  border: none;
  margin-top: 20px;
}
</style>