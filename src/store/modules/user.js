export default {
  namespaced: true,
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
      }
    }
  },
  mutations: {
    // token失效， 清除vuex数据
    clearState(state) {
      state.profile = {}
    },
    // 更新token
    updatedToken(state, payload) {
      state.profile.token = payload
    }
  },
  actions: {},
  getters: {}
}
