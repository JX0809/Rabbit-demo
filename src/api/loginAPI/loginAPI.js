import instance from '@/utils/request'

// 账户登录
export const loginAccountAPI = (account, password) => {
  return instance.post('/login', { account, password })
}

// 手机验证码登录
export const loginMsgAPI = (mobile, code) => {
  return instance.post('/login/code', { mobile, code })
}

// 获取手机验证码
export const getLoginCodeAPI = (mobile) => {
  return instance.get('/login/code', { params: { mobile } })
}

// QQ 登录
// 注册来源 注册来源，1为pc，2为webapp，3为微信小程序，4为Android，5为ios,6为qq,7为微信
export const QQLoginAPI = (id) => {
  return instance.post('/login/social', {
    unionId: id,
    source: 6
  })
}

// 已有账号 QQ 登录绑定 手机号， 获取验证码
export const getMobileCodeAPI = (mobile, id, source) => {
  return instance.get('/login/social/code', {
    params: {
      mobile,
      unionId: id,
      source: 6
    }
  })
}

// QQ扫码，绑定手机号登录
export const QQBindLoginAPI = (unionId, mobile, code) => {
  return instance.post('/login/social/bind', { unionId, mobile, code })
}

// 校验用户名是否存在
export const verifyUserAccountAPI = (account) => {
  return instance.get('/register/check', { params: { account } })
}

// QQ 登录 注册账号 手机验证码
export const QQRegisterCodeAPI = (mobile) => {
  return instance.get('/register/code', { params: { mobile } })
}

// 完善信息登录
export const QQRegisterLoginAPI = (id, obj) => {
  return instance.post(`/login/social/${id}/complement`, {
    account: obj.accountChecked,
    mobile: obj.mobile,
    code: obj.code,
    password: obj.password
  })
}
