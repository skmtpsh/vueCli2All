<template>
    <div class="mainpage">
      <main class="content">
        <div class="authBaseTit">
          <h2>基础认证</h2>
          <p>完成基础认证，即可获得您的专属额度</p>
        </div>
        <ul class="authItem">
          <li v-for="(item, index) in authList.baseAuth" :key="index">
            <div class="icon-cont">
              <div class="icon-main">
                <img class="icon-logo" />
              </div>
            </div>
            <div>
              <h2 class="authTit">{{item}}</h2>
            </div>
            <div class="authBtn">
              <span class="authtxt"></span>
            </div>
          </li>
        </ul>
      </main>
      <main class="content">
        <div class="authBaseTit">
          <h2>高级认证</h2>
          <p>完成高级认证，可提高您的审核通过率</p>
        </div>
        <ul class="authItemAdvance">
          <li v-for="(item, index) in authList.advancedAuth" :key="index">
            <div class="icon-main">
              <img class="icon-logo" />
              <p>{{item}}</p>
            </div>
          </li>
        </ul>
      </main>
    </div>
</template>
<script>
export default {
  props: ['authList']
}
</script>
<style lang="scss" scoped>
.mainpage {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  .content {
    margin-bottom: 20px;
    padding: 20px 20px 0;
    background-color: #fff;
    .authBaseTit {
      padding: 20px;
      h2 {
        font-size: 18px;
        margin-top: 20px;
      }
      p {
        font-size: 14px;
        margin: 18px 0;
      }
    }
    .authItem {
      li {
        display: flex;
        &>div {
          display: flex;
          flex: 1;
          // justify-content: center;
          align-items: center; /*2.0.1*/
          // padding: 24px 0;
          padding: 16px 0; /*2.0.1*/
          position: relative;
          &:not(:first-child):after {
          }
        }
        &:last-child>div {
          &:not(:first-child):after {
            height: 0px !important;
            border-bottom: 0px none !important;
          }
        }
        .authIntro {
          font-size: 14px;
          line-height: 1;
          .price {
            font-size: 14px;
            &.authas {
              display: inline-block;
              vertical-align: baseline;
            }
          }
        }
        .authTit {
          font-size: 14px;
          // margin-bottom: 14px;
          &.authas  {
          }
        }
        .authBtn {
          flex: none;
          display: flex;
          align-items: center;
          width: 140px;
          justify-content: flex-start;
          .authtxt {
            font-size: 14px;
          }
          .svg-icon {
            margin-left: 20px;
            margin-right: -20px;
          }
        }
      }
      .icon-cont {
        flex: none;
        margin: 0 26px 0 12px;
        border-bottom: 0 none;
      }
    }
  }
}
</style>
