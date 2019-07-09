import request from '@/utils/request'
import commonQuery from '@/utils/commonQuery'
import { getToken } from '@/utils/token'
const TOKEN = getToken()
const pageQuery = () => {
  return Object.assign({}, {tokenKey: TOKEN}, commonQuery())
}
const siteApi = {
  NOTICELIST () {
    return request({
      url: 'busi/notice/list.cmd',
      method: 'post',
      data: Object.assign({
      }, pageQuery())
    })
  },
  NOTICEADD ({
    noticeTitle = '',
    noticeContent = ''
  }) {
    return request({
      url: 'busi/notice/save.cmd',
      method: 'post',
      data: Object.assign({
        noticeTitle,
        noticeContent
      }, pageQuery())
    })
  },
  NOTICEDEL ({
    id = ''
  }) {
    return request({
      url: 'busi/notice/delete.cmd',
      method: 'post',
      data: Object.assign({
        id
      }, pageQuery())
    })
  },
  NOTICEMOD ({
    id = '',
    noticeTitle = '',
    noticeContent = ''
  }) {
    return request({
      url: 'busi/notice/update.cmd',
      method: 'post',
      data: Object.assign({
        id,
        noticeTitle,
        noticeContent
      }, pageQuery())
    })
  },
  NOTICEVIEW ({
    id = ''
  }) {
    return request({
      url: 'busi/notice/info.cmd',
      method: 'post',
      data: Object.assign({
        id
      }, pageQuery())
    })
  },
  /**
   * Banner 管理
   */
  BANNERLIST () {
    return request({
      url: 'busi/banner/list.cmd',
      method: 'post',
      data: Object.assign({
      }, pageQuery())
    })
  },
  BANNERMOD ({
    id = '',
    bannerSrc = '',
    bannerLink = '',
    bannerTitle = ''
  }) {
    return request({
      url: 'busi/banner/update.cmd',
      method: 'post',
      data: Object.assign({
        id,
        bannerSrc,
        bannerLink,
        bannerTitle
      }, pageQuery())
    })
  },
  BANNERSAVE ({
    bannerSrc = '',
    bannerLink = '',
    bannerTitle = ''
  }) {
    return request({
      url: 'busi/banner/save.cmd',
      method: 'post',
      data: Object.assign({
        bannerSrc,
        bannerLink,
        bannerTitle
      }, pageQuery())
    })
  },
  BANNERDEL ({
    id = ''
  }) {
    return request({
      url: 'busi/banner/delete.cmd',
      method: 'post',
      data: Object.assign({
        id
      }, pageQuery())
    })
  },
  BANNERSORT ({
    before = '',
    beforeSort = '',
    later = '',
    laterSort = ''
  }) {
    return request({
      url: 'busi/banner/sort.cmd',
      method: 'post',
      data: Object.assign({
        before,
        later,
        beforeSort,
        laterSort
      }, pageQuery())
    })
  }
}
export default siteApi
