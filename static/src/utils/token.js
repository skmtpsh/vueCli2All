import Cookies from 'js-cookie'
const TokenKey = 'Hm-yd-token'
const SideBar = 'Hm-yd-side'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function getSide () {
  return Cookies.get(SideBar)
}

export function setSide (list) {
  return Cookies.set(SideBar, list)
}

export function removeSide () {
  return Cookies.remove(SideBar)
}

export function clearAll () {
  removeToken()
  removeSide()
  localStorage.clear()
}
