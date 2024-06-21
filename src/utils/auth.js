const accessTokenKey = 'adelyn-blog-accessToken'
const refreshTokenKey = 'adelyn-blog-refreshToken'

export function getAccessToken() {
  return sessionStorage.getItem(accessTokenKey)
}

export function setAccessToken(token) {
  return sessionStorage.setItem(accessTokenKey, token)
}

export function getRefreshToken() {
  return sessionStorage.getItem(refreshTokenKey)
}

export function setRefreshToken(token) {
  return sessionStorage.setItem(refreshTokenKey, token)
}

export function removeAllToken() {
  return sessionStorage.clear()
}
