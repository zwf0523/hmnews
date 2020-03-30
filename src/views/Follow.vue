<template>
  <div>
    <!-- 先把头部组件NavigateBar导入进来 -->
    <!-- 这里是头部导航栏 -->
    <NavigateBar title="我的关注" />

    <!-- 静态页面的结构 -->
    <div class="user-item" v-for="(item,index) in follows" :key="index">
      <!-- 头像 -->
      <img :src="$axios.defaults.baseURL+item.head_img" alt="桐姥爷" />
      <!-- 关注的对象名称和关注日期 -->
      <div class="user-info">
        <div>{{item.nickname}}</div>
        <p>{{moment(item.create_date).format('YYYY-MM-DD')}}</p>
      </div>
      <!-- 取消关注按钮 -->
      <span class="cancel" @click="handleCancel(item.id,index)">取消关注</span>
    </div>
  </div>
</template>

<script>
// 导入NavigateBar头部组件
import NavigateBar from "@/components/NavigateBar";
import moment from "moment";
export default {
  data() {
    return {
      follows: [],
      // 时间插件
      moment
      //   本地用户的token值
      //   localStorage: {}
    };
  },
  // 注册组件
  components: {
    NavigateBar
  },
  mounted() {
    //   先获取储存在本地的token值
    const localUserJson = JSON.parse(localStorage.getItem("userInfo"));
    // 开始请求数据
    this.$axios({
      // 请求地址
      url: "/user_follows",
      //   请求头
      headers: {
        Authorization: localUserJson.token
      }
    }).then(res => {
      console.log(res.data);
      const { data } = res.data;
      this.follows = data;
    });
  },
  //   methods方法，点击事件都存在这里
  methods: {
    handleCancel(id, index) {
      //   弹窗提示
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定取消关注吗？"
        })
        .then(() => {
          const localUserJson = JSON.parse(localStorage.getItem("userInfo"));
          //   根据id来判断取消哪个关注
          this.$axios({
            url: "/user_unfollow/" + id,
            headers: {
              Authorization: localUserJson.token
            }
          }).then(res => {
            // console.log(res);
            // 提示框
            this.$toast.success("取消关注成功");
            // 刷新页面数据,其实就是请求成功后用splice根据index索引值删除取消关注的那个值
            this.follows.splice(index, 1);
          });
        });
    }
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