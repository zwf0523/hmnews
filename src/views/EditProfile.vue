<template>
  <div>
    <!-- 头部导航组件 -->
    <NavigateBar title="编辑资料" />
    <!-- 头像 -->
    <div class="avatar">
      <img src="@/assets/hero_01.png" />
    </div>

    <!-- 按钮列表 -->
    <Listbar label="昵称" tips="桐人" />
    <Listbar label="密码" tips="******" />
    <Listbar label="性别" tips="男" />
  </div>
</template>

<script>
import Listbar from "@/components/Listbar";
import NavigateBar from "@/components/NavigateBar";
export default {
  components: {
    NavigateBar,
    Listbar
  }
};
</script>

<style scoped lang="less">
.avatar {
  display: flex;
  padding: 20 / 360 * 100vw;
  justify-content: center;
  align-items: center;
  img {
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
    border-radius: 50%;
  }
}
</style>