export default {
  namespaced: true, // 开启命名空间
  state() {
    return {
      // 用户信息
      profile: {
        id: '',
        avatar: '',
        nickname: '',
        account: '',
        mobile: '',
        token: ''
      },
      // 回跳地址
      redirectUrl: '/'
    }
  },
  mutations: {
    // token失效， 清除vuex数据
    clearState(state, payload) {
      state.profile = payload
    },
    // 更新用户信息和token
    updatedUserProfile(state, payload) {
      state.profile = payload
    },
    setRedirectUrl(state, url) {
      state.redirectUrl = url
    }
  },
  actions: {},
  getters: {}
}
