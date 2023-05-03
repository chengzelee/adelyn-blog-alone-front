import Cookies from 'js-cookie'

const accessTokenKey = 'adelyn-blog-accessToken'

export function getToken() {
  return Cookies.get(accessTokenKey)
}

export function setToken(token) {
  return Cookies.set(accessTokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
