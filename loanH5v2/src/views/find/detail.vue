<template>
  <sh-container>
    <van-skeleton
      :row="8"
      :loading="loading"
      title title-width="100%"
    >
      <div>
        <div class="articleHead">
          <h2>{{articleDetail.articleTitle}}</h2>
          <p>
            <span>{{articleDetail.createTime | FilterTime('YYYY/MM/DD')}}</span>
            <span>{{articleDetail.articleAuthor}} <svg-icon icon-class="eye" /> {{articleDetail.readCount}}万</span>
          </p>
        </div>
        <div class="articleCont">
          {{articleDetail.articleContent}}
        </div>
      </div>
    </van-skeleton>
  </sh-container>
</template>

<script>
import v2Api from '@/api/loanv2'
export default {
  components: {
  },
  data () {
    return {
      loading: false,
      articleDetail: {}
    }
  },
  methods: {
    getArticle () {
      this.loading = true
      let id = this.$route.query.id
      return new Promise(async resolve => {
        await v2Api.appArticleDetail({
          id
        })
          .then((res) => {
            this.loading = false
            this.articleDetail = res.data.datas.articleDetail
            resolve(res)
          })
          .catch((error) => {
            console.log(error)
          })
      })
    }
  },
  mounted () {
    this.$toast.loading({
      mask: false,
      message: '加载中...'
    })
    this.getArticle().then(() => {
      this.$toast.clear()
    })
  }
}
</script>
<style lang="scss" scoped>
.articleHead {
  h2 {
    font-size: 24px;
    // text-align: center;
    margin: 10px 0;
    color: #333333;
  }
  p {
    color: #A0A0A0;
    font-size: 12px;
    span {
      margin-right: 5px;
    }
  }
}
.articleCont {
  padding: 20px 0;
  font-size: 14px;
  line-height: 1.8;
  text-indent: 2em;
  word-break: break-all;
}
</style>
