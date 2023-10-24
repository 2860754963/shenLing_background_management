import Cookies from 'js-cookie'

const TokenKey = 'shenling_user_token'
const userKey = 'shenling_user_info'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function setUserInfo(useInfo) {
  return Cookies.set(userKey, JSON.stringify(useInfo))
}

export function getUserInfo() {
  return JSON.parse(Cookies.get(userKey) || '{}')
}
