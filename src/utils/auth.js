import Cookies from 'js-cookie'

const accessTokenKey = 'adelyn-blog-accessToken'
const refreshTokenKey = 'adelyn-blog-refreshToken'

export function getAccessToken() {
  return Cookies.get(accessTokenKey)
}

export function setAccessToken(token) {
  return Cookies.set(accessTokenKey, token)
}

export function getRefreshToken() {
  return Cookies.get(refreshTokenKey)
}

export function setRefreshToken(token) {
  return Cookies.set(refreshTokenKey, token)
}

export function removeAllToken() {
  return Cookies.remove(accessTokenKey) &&  Cookies.remove(refreshTokenKey)
}

