<template>
  <div class="skeleton">
    <header class="skeleton-header">
      <h5></h5>
      <h4></h4>
      <h3></h3>
      <div class="reqButton"></div>
    </header>
    <main class="content">
      <h2 class="title"></h2>
      <div class="info"></div>
      <h2 class="title"></h2>
      <section class="group">
      </section>
      <section class="group">
      </section>
    </main>
  </div>
</template>
<style lang="less">
@background: #f2f2f2;
.skeleton {
  padding: 10px;
  .skeleton-header {
    text-align: center;
    padding: 58px 0px 48px;
    h5 {
      height: 40px;
      background-color: @background;
      margin-bottom: 20px;
    }
    h4 {
      height: 100px;
      background-color: @background;
      margin-bottom: 20px;
    }
    h3 {
      height: 60px;
      background-color: @background;
      margin-bottom: 20px;
    }
    .reqButton {
      height: 90px;
      width: 360px;
      margin: 40px auto 0;
      background-color: @background;
    }
  }
  .content {
    .info {
      background-color: @background;
      height: 100px;
    }
    .title {
      height: 60px;
      background-color: @background;
      margin: 20px 0;
    }
    .group {
      margin: 60px 54px;
      background-color: @background;
      height: 100px;
    }
  }
}
</style>
