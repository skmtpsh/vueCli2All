<template>
  <sh-container>
    <van-skeleton
      :row="4"
      :loading="pageLoading"
      avatar
      avatar-size="80px"
      avatar-shape="square"
      title title-width="100%"
    >
    <div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check='lock'
        @load="handleLoad"
      >
        <van-row class="articleList" v-for="(item, index) in list" :key="index">
          <van-col span="14" class="articleTxt">
            <h3 @click="gotoURL(item.id)">{{item.articleTitle}}</h3>
            <p><span>{{item.articleAuthor}} <van-icon name="eye" /> {{item.readCount}}万</span><span>{{item.createTime | FilterTime('YYYY/MM/DD')}}</span></p>
          </van-col>
          <van-col span="10">
            <div class="articleImg" @click="gotoURL(item.id)"><img v-lazy="item.picUrl" /></div>
          </van-col>
        </van-row>
        <!-- <p class="loadTxt" slot="loading">
          <svg-icon icon-class="eye" /> 正在载入
        </p> -->
      </van-list>
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
      pageLoading: true,
      finished: false,
      lock: false,
      pageNum: 1,
      pageSize: 10,
      rsCount: 0,
      list: []
    }
  },
  methods: {
    gotoURL (id) {
      this.$router.push({ name: 'findDetail', query: Object.assign(this.$route.query, { id }) })
    },
    handleLoad () {
      this.pageNum++
      console.log(this.pageNum)
      this.getList()
    },
    getList () {
      return new Promise(async resolve => {
        await v2Api.appArticleList({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          listType: 'column',
          columnCode: this.columnCode
        })
          .then((response) => {
            let data = response.data

            if (data.code === 200) {
              setTimeout(() => {
                let articleList = data.datas.datalist
                let beforeList = this.list
                this.rsCount = data.datas.rsCount
                this.list = [...articleList, ...beforeList]
                console.log(this.list)
                this.loading = false
                if (this.list.length >= this.rsCount) {
                  this.finished = true
                }
              }, 800)
              // this.list = data.datas.datalist
              // if (this.list.length === 0) {
              //   this.finished = true
              // }
              // setTimeout(() => {
              //   let articleList = [
              //     {
              //       'articleAuthor': '金融日报',
              //       'articleTitle': '互金协会：会员机构开展高息现金贷等违规业务自查整改',
              //       'createTime': '2019-07-16 14:24:24',
              //       'id': 37,
              //       'picUrl': '//cms-bucket.ws.126.net/2019/07/22/0e755692bb1344a486197ebe5b0f1d15.png?imageView&thumbnail=234y146&quality=45&interlace=1&enlarge=1&type=webp',
              //       'readCount': 0.1,
              //       'sort': 1
              //     },
              //     {
              //       'articleAuthor': '金融日报',
              //       'articleTitle': '背景互金谢协会提示消费者警惕非法“套路带”圈套',
              //       'createTime': '2019-07-16 14:24:24',
              //       'id': 38,
              //       'picUrl': '//cms-bucket.ws.126.net/2019/07/22/4528ed342aba4db6aca35be59320fd86.png?imageView&thumbnail=234y146&quality=45&interlace=1&enlarge=1&type=webp',
              //       'readCount': 0.6,
              //       'sort': 2
              //     },
              //     {
              //       'articleAuthor': '金融日报',
              //       'articleTitle': '开鑫贷接入司法大数据系统让“老赖”在人脉圈精准曝光',
              //       'createTime': '2019-07-16 14:24:24',
              //       'id': 37,
              //       'picUrl': '//cms-bucket.ws.126.net/2019/07/22/261452b37e61414680bf2868fac2bf8a.png?imageView&thumbnail=234y146&quality=45&interlace=1&enlarge=1&type=webp',
              //       'readCount': 0.1,
              //       'sort': 1
              //     },
              //     {
              //       'articleAuthor': '金融日报',
              //       'articleTitle': '平安金融壹账通入选国家网信办首批区块链备案名单',
              //       'createTime': '2019-07-16 14:24:24',
              //       'id': 38,
              //       'picUrl': '//cms-bucket.ws.126.net/2019/07/22/32922783e2bb46dd91ec9dd843c07136.png?imageView&thumbnail=234y146&quality=45&interlace=1&enlarge=1&type=webp',
              //       'readCount': 0.6,
              //       'sort': 2
              //     },
              //     {
              //       'articleAuthor': '金融日报',
              //       'articleTitle': '董建华谴责涂污国徽暴行：香港市民须捍卫法治',
              //       'createTime': '2019-07-16 14:24:24',
              //       'id': 37,
              //       'picUrl': '//cms-bucket.ws.126.net/2019/07/22/013c88e9b122467eabe2e9cf30d91a7f.png?imageView&thumbnail=234y146&quality=45&interlace=1&enlarge=1&type=webp',
              //       'readCount': 0.1,
              //       'sort': 1
              //     },
              //     {
              //       'articleAuthor': '金融日报',
              //       'articleTitle': '防范系统性风险 最大限度保护存款人合法权益',
              //       'createTime': '2019-07-16 14:24:24',
              //       'id': 38,
              //       'picUrl': '//cms-bucket.ws.126.net/2019/07/22/1777070fed8c4d2cac7c4301d3d17138.png?imageView&thumbnail=234y146&quality=45&interlace=1&enlarge=1&type=webp',
              //       'readCount': 0.6,
              //       'sort': 2
              //     },
              //     {
              //       'articleAuthor': '金融日报',
              //       'articleTitle': '林郑月娥:涂污国徽触碰"一国两制"底线 会依法追究',
              //       'createTime': '2019-07-16 14:24:24',
              //       'id': 38,
              //       'picUrl': '//cms-bucket.ws.126.net/2019/07/22/927ef2f9d1e64fbd99258fad36713a52.png?imageView&thumbnail=234y146&quality=45&interlace=1&enlarge=1&type=webp',
              //       'readCount': 0.6,
              //       'sort': 2
              //     },
              //     {
              //       'articleAuthor': '金融日报',
              //       'articleTitle': '科创板正式开市 华兴源创实控人夫妻208亿"夺冠"',
              //       'createTime': '2019-07-16 14:24:24',
              //       'id': 38,
              //       'picUrl': '//cms-bucket.ws.126.net/2019/07/22/65003801b5164ed5a523e8b8597046fd.png?imageView&thumbnail=234y146&quality=45&interlace=1&enlarge=1&type=webp',
              //       'readCount': 0.6,
              //       'sort': 2
              //     }
              //   ]
              //   let beforeList = this.list
              //   this.list = [...articleList, ...beforeList]
              //   console.log(this.list)
              //   this.loading = false
              //   // this.rsCount = data.datas.rsCount
              //   this.rsCount = 24
              //   if (this.list.length >= this.rsCount) {
              //     this.finished = true
              //   }
              // }, 1000)
            }
            resolve()
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
    this.columnCode = this.$route.query.columnCode
    this.getList().then(() => {
      setTimeout(() => {
        this.pageLoading = false
      }, 1000)
      this.$toast.clear()
    })
  }
}
</script>
<style lang="scss" scoped>
.articleList {
  padding: 10px 0;
}
.articleTxt {
  padding-right: 20px;
  h3 {
    font-size: 14px;
    color: #333333;
    margin-bottom: 20px;
  }
  p {
    @extend %flexBetwen;
    align-items: center;
    color: #999999;
    font-size: 12px;
    span {
      @extend %flexBetwen;
      align-items: center;
    }
    .van-icon {
      font-size: 16px;
      margin: 0 5px;
    }
  }
}
.articleImg {
  border-radius: 10px;
}
.loadTxt {
  @extend %flexCenter;
  color: #999999;
  font-size: 14px;
}
</style>
