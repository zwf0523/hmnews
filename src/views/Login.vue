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
    <van-form @submit="onSubmit" class="form">
      <van-field
        v-model="form.username"
        name="手机号码"
        placeholder="手机号码"
        :rules="[{ required: true, message: '请填写手机号码' }]"
      />
      <!-- 密码输入框，和上面的属性是一样的 -->
      <van-field
        v-model="form.password"
        type="password"
        name="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div>
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <router-link to="/register">
      <van-button round block class="link-register">注册</van-button>
    </router-link>
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
  //注释
  methods: {
    // handleClick() {
    //   // this.$toast("登录成功");
    //   this.$axios({
    //     url: "/login",
    //     method: "post",
    //     data: this.form
    //   }).then(res => {
    //     const { message } = res.data;
    //     this.$toast.success(message);
    //   });
    // },
    onSubmit(values) {
      this.$axios({
        url: "/login",
        method: "post",
        data: this.form
      }).then(res => {
        // 获取到返回的信息, data是token和用户的信息，data是保存到本地的
        const { message, data } = res.data;
        this.$toast.success(message);
        // 把token和id保存到本地
        // localStorage只能保存字符串，需要使用JSON.stringify来把对象转换成字符串
        localStorage.setItem("userInfo", JSON.stringify(data));
        this.$router.push("/personal");
      });
    }
  }
};
</script>

<style lang="less" scoped>
.containner {
  padding: 20/360 * 100vw;
}

.back-btn span {
  font-size: 27/360 * 100vw;
  line-height: 1;
}

.logo {
  text-align: center;
  margin-top: 20/360 * 100vw;
}

.logo span {
  font-size: 126/360 * 100vw;
  color: #cc3300;
}

.form {
  .van-cell {
    padding: 10px 0;
    font-size: 16px;
    margin-bottom: 20/360 * 100vw;
  }
  .van-cell .van-field__control {
    width: 100%;
  }
  .van-cell:not(:last-child)::after {
    border-bottom: 1px solid #333;
    left: 0;
  }

  .van-button--info {
    margin-top: 50/360 * 100vw;
    background-color: #cc3300;
    border: 1px solid #cc3300;
  }
}

.link-register {
  margin-top: 20 / 360 * 100vw;
}
</style>