<template>
  <div>
    <!-- 头部组件 -->
    <NavigateBar title="我的收藏" />
    <!-- 循环的结构,少于3张图片的布局 -->
    <div v-for="(item,index) in stars" :key="index">
      <div class="imgText" v-if="item.cover.length<3&&item.cover.length>0">
        <div class="imgText-left">
          <h4>{{item.title}}</h4>
          <p>{{item.user.nickname}} {{item.comments.length}}跟帖</p>
        </div>
        <img :src="$axios.defaults.baseURL+item.cover[0].url" />
      </div>
    </div>

    <!-- 循环的结构,大于3张图片的布局 -->
    <!-- <div class="imgList">
      <h4>林志玲穿透视黑纱裙米兰看秀腹部微隆显孕味</h4>
      <div class="images">
        <img src="https://www.baidu.com/img/bd_logo1.png" />
        <img src="https://www.baidu.com/img/bd_logo1.png" />
        <img src="https://www.baidu.com/img/bd_logo1.png" />
      </div>
      <p>火星时报 52跟帖</p>
    </div>-->
  </div>
</template>

<script>
// 引入头部导航组件
import NavigateBar from "@/components/NavigateBar";
export default {
  data() {
    return {
      stars: []
    };
  },
  components: {
    NavigateBar
  },
  mounted() {
    const localUserJson = JSON.parse(localStorage.getItem("userInfo"));
    this.$axios({
      url: "/user_star",
      headers: {
        Authorization: localUserJson.token
      }
    }).then(res => {
      console.log(res);

      const { data } = res.data;
      this.stars = data;
    });
  }
};
</script>
<style scoped lang="less">
.imgText {
  padding: 20/360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px #eee solid;
  .imgText-left {
    h4 {
      // 文字超出两行出现省略号
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      font-weight: normal;
    }
    p {
      color: #999;
      margin-top: 5px;
    }
  }
  img {
    width: 110/360 * 100vw;
    height: 75/360 * 100vw;
    display: block;
    object-fit: cover;
    margin-left: 10/360 * 100vw;
    flex-shrink: 0;
  }
}
.imgList {
  padding: 20/360 * 100vw;
  border-bottom: 1px #eee solid;
  h4 {
    // 文字超出两行出现省略号
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-weight: normal;
  }
  .images {
    margin: 10/360 * 100vw 0;
    display: flex;
    justify-content: space-between;
    img {
      width: 33%;
      height: 75/360 * 100vw;
      object-fit: cover;
    }
  }
  p {
    color: #999;
    margin-top: 5px;
  }
}
</style> 