<template>
  <div>
    <!-- 头部导航组件 -->
    <NavigateBar title="编辑资料" />
    <!-- 头像 -->
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + userInfo.head_img" />
      <!-- 添加上传组件 -->
      <van-uploader class="uploader" :after-read="afterRead" />
    </div>

    <!-- 按钮列表 -->
    <Listbar label="昵称" :tips="userInfo.nickname" @click.native="show = true" />
    <!-- 编辑昵称的弹窗 -->
    <van-dialog v-model="show" title="修改昵称" show-cancel-button @confirm="handleChangeNickname">
      <van-field v-model="nickname" placeholder="请输入用户名" />
    </van-dialog>

    <!-- 编辑密码的按钮 -->
    <Listbar label="密码" tips="******" @click.native="showPassword = true" />

    <!-- 编辑密码的弹窗 -->
    <van-dialog
      v-model="showPassword"
      title="修改密码"
      show-cancel-button
      @confirm="handleChangePassword"
    >
      <van-field v-model="password" placeholder="请输入密码" type="password" />
    </van-dialog>

    <!-- 编辑性别的按钮 -->
    <Listbar label="性别" :tips="['女', '男'][userInfo.gender]" @click.native="showGender = true" />

    <!-- 编辑性别的弹窗 -->
    <!-- close-on-click-action 自动关闭弹窗
        actions 弹窗菜单的选项
    select 选中某一项时候的事件-->
    <van-action-sheet
      v-model="showGender"
      close-on-click-action
      :actions="actions"
      @select="onSelect"
    />
  </div>
</template>

<script>
import Listbar from "@/components/Listbar";
import NavigateBar from "@/components/NavigateBar";
export default {
  data() {
    return {
      // 用户详情
      userInfo: {},
      userJson: {},
      // 控制编辑昵称弹窗的显示隐藏
      show: false,
      showPassword: false,
      showGender: false,
      actions: [
        // 对象的数据可以随意增加修改的，比如添加value属性用来传递给接口1/0
        { name: "男", value: 1 },
        { name: "女", value: 0 }
      ],
      nickname: "",
      password: ""
    };
  },
  components: {
    NavigateBar,
    Listbar
  },
  mounted() {
    const userJson = JSON.parse(localStorage.getItem("userInfo"));
    this.userJson = userJson;
    // 请求用户详情
    this.$axios({
      url: "/user/" + userJson.user.id,
      // 添加头信息
      headers: {
        Authorization: userJson.token
      }
    }).then(res => {
      const { data } = res.data;
      // 保存到data
      this.userInfo = data;
      this.nickname = data.nickname;
    });
  },
  methods: {
    // 图片上传的方法
    afterRead(file) {
      const formData = new FormData();
      // 第一个字符串的file表示接口接收的属性，第二个 file.file是文件对象
      formData.append("file", file.file);

      // 开始上传
      this.$axios({
        url: "/upload",
        method: "POST",
        headers: {
          Authorization: this.userJson.token
        },
        data: formData
      }).then(res => {
        const { url } = res.data.data;
        // 替换掉当前的头像路径
        this.userInfo.head_img = url;
        // 图片上传成功之后调用编辑用户信息的方法
        this.handleEdit({
          head_img: url
        });
      });
    },
    // 编辑用户信息的函数,可以修改头像，昵称,密码
    // 修改头像
    handleEdit(data) {
      this.$axios({
        url: "/user_update/" + this.userInfo.id,
        method: "POST",
        // 添加头信息
        headers: {
          Authorization: this.userJson.token
        },
        data
      }).then(res => {
        this.$toast.success("头像修改成功");
      });
    },
    // 修改昵称
    handleChangeNickname() {
      // 调用编辑用户信息的函数
      this.handleEdit({ nickname: this.nickname });
      // 同步的修改当前显示的数据
      this.userInfo.nickname = this.nickname;
    },
    // 修改密码
    handleChangePassword() {
      // 调用编辑用户信息的函数
      this.handleEdit({ password: this.password });
    },

    // 修改性别
    // 选中性别的时候触发的事件，item是选择的当前项
    onSelect(item) {
      // 调用编辑用户信息的函数
      this.handleEdit({ gender: item.value });
      // 同步的修改当前显示的数据
      this.userInfo.gender = item.value;
    }
  }
};
</script>

<style scoped lang="less">
.avatar {
  display: flex;
  padding: 20 / 360 * 100vw;
  justify-content: center;
  align-items: center;
  position: relative;
  img {
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
    border-radius: 50%;
  }
  .uploader {
    position: absolute;
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
    left: 51%;
    top: 52%;
    transform: translateX(-50 / 360 * 100vw) translateY(-50 / 360 * 100vw);
    opacity: 0;
  }
}
</style>