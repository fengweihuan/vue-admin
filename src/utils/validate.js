/**
 * Created by jiachenpan on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 邮箱*/
export function validatEmail(str) {
  const reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
  return reg.test(str)
}
export function validatEmailForm(rule, value, callback) {
  if (value === '') {
    callback(new Error('请输入邮箱'))
  } else {
    if (!validatEmail(value)) {
      callback(new Error('请输入正确的邮箱'))
    }
    callback()
  }
}

/* 手机号*/
export function validatPhone(str) {
  const reg = /0?(13|14|15|18)[0-9]{9}/
  return reg.test(str)
}
export function validatPhoneForm(rule, value, callback) {
  if (value === '') {
    callback(new Error('请输入手机号'))
  } else {
    if (!validatPhone(value)) {
      callback(new Error('请输入正确的手机号'))
    }
    callback()
  }
}

