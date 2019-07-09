<template>
  <div class="box">
    <ul>
      <li>
        <!-- <router-link tag="a" to="/loan/business"> -->
          <h3>商户管理</h3>
          <div><svg-icon icon-class="user" /></div>
          <p>该模块是用于查看甲方信息；商户可以查看自己的信息，平台可以查看全部的商户信息，通过商户筛选可以查看某个商户信息</p>
        <!-- </router-link> -->
      </li>
      <li>
        <!-- <router-link tag="a" to="/loan/product/channel"> -->
          <h3>产品管理</h3>
          <div><svg-icon icon-class="pro" /></div>
          <p>1.在贷超客户端会有多个推荐的频道来对甲方的各类APP进行管理并分类. <br /> 2.在贷超客户端用户展示给用户该甲方APP基本特点及优势 <br />3. 用于添加甲方产品、维护产品信息</p>
        <!-- </router-link> -->
      </li>
      <li>
        <!-- <router-link tag="a" to="/loan/balance"> -->
          <h3>结算管理</h3>
          <div><svg-icon icon-class="bal" /></div>
          <p>用于记录商户的每一笔扣款明细；每个甲方只能看到自己的明细数据，平台可以看到全部的商户数据，通过对商户进行筛选，可以查看具体某个商户的数据。</p>
        <!-- </router-link> -->
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style scoped>
.box ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}
.box ul li {
  flex: 1;
  padding: 20px 20px 60px;
  box-shadow: 1px 1px 20px rgba(0,0,0,.1);
  text-align: center;
  position: relative;
  transition: all .6s ease-out;
  text-align: left;
}
.box ul li div {
  text-align: center;
}
.box ul svg {
  margin: 20px auto;
  width: 50px;
  height: 50px;
}
.box ul li h3 {
  color: #333;
  font-size: 18px;
  margin: 30px 0;
  text-align: center;
}

.box ul li p {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
  line-height: 2;
}

.box ul .on {
  background-color: #0f75ff;
}

.box ul .on h3, .box ul .on p {
  color: #fff
}
</style>
