<template>
  <div>
    <!-- 先把头部组件NavigateBar导入进来 -->
    <!-- 这里是头部导航栏 -->
    <NavigateBar title="我的关注" />

    <!-- 静态页面的结构 -->
    <div class="user-item">
      <!-- 头像 -->
      <img src="../assets/hero_01.png" alt="桐姥爷" />
      <!-- 关注的对象名称和关注日期 -->
      <div class="user-info">
        <div>火星新闻播报</div>
        <p>2019-10-10</p>
      </div>
      <!-- 取消关注按钮 -->
      <span class="cancel">取消关注</span>
    </div>
  </div>
</template>

<script>
// 导入NavigateBar头部组件
import NavigateBar from "@/components/NavigateBar";

export default {
  // 注册组件
  components: {
    NavigateBar
  }
};
</script>

<style lang="less" scoped>
.user-item {
  padding: 20/360 * 100vw;
  //   弹性布局
  display: flex;
  //   均匀排列每个元素首个元素放置于起点，末尾元素放置于终点
  justify-content: space-between;
  //   元素在侧轴居中。如果元素在侧轴上的高度高于其容器，那么在两个方向上溢出距离相同。
  align-items: center;
  border-bottom: 1px #eeeeee solid;
  .cancel {
    padding: 5px 15px;
    font-size: 12px;
    background-color: #eeeeee;
    border-radius: 50px;
  }
  img {
    width: 40/360 * 100vw;
    height: 40/360 * 100vw;
    display: block;
    margin-right: 20/360 * 100vw;
    border-radius: 50%;
    //   保持原有尺寸比例。保证替换内容尺寸一定大于容器尺寸，宽度和高度至少有一个和容器一致。因此，此参数可能会让替换内容部分区域不可见。
    object-fit: cover;
  }
  .user-info {
    //   flex=1把此行剩余的所有空间都给自己，所以前面图片设置了右边距
    flex: 1;
    margin-right: 20/360 * 100vw;
    p {
      font-size: 14px;
      color: #999;
    }
  }
}
</style>