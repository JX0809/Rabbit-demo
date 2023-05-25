import {
  updateGoodsInCartAPI,
  mergeCartAPI,
  getCartListAPI,
  addToCartAPI,
  deleteGoodsInCartAPI,
  reviseGoodsInCartAPI,
  selectedAllAPI
} from '@/api/cartAPI/cartAPI'

export default {
  namespaced: true,
  state() {
    return {
      list: [] // 购物车商品的信息
    }
  },
  mutations: { // 修改 state的数据
    // 加入购物车
    addToShoppingCart(state, goods) {
      // 找出购物车有没有当前要加入的项
      const sameIndex = state.list.findIndex(item => item.skuId === goods.skuId)
      // 有相同项， 原来商品的数量 +1, 添加在最新位置， 原来位置的商品删除
      if (sameIndex > -1) {
        goods.count = state.list[sameIndex].count + goods.count
        state.list.splice(sameIndex, 1)
      }
      // 追加商品到商品数组
      state.list.unshift(goods)
    },
    // 更新商品的信息
    updateGoodsInCart(state, goods) {
      // 找出当前项
      const updateGoodsItem = state.list.find(item => item.skuId === goods.skuId)
      for (const key in goods) {
        if (goods[key] !== null && goods[key] !== undefined && goods[key] !== '') {
          updateGoodsItem[key] = goods[key]
        }
      }
    },
    deleteGoodsInCart(state, skuId) {
      const index = state.list.findIndex(item => item.skuId === skuId)
      state.list.splice(index, 1)
    },
    // 登录后， 合并购物车（本地和线上）， 重新渲染到页面
    setCartList(state, list) {
      state.list = list
    }
  },

  actions: { // 异步请求
  // 加入购物车
    addToShoppingCart(context, goods) {
      // 区分本地和 登录： 同步和异步操作， new Promise
      return new Promise((resolve, reject) => {
        if (context.rootState.user.profile.token) {
          // TODO 已登录的操作
          addToCartAPI(goods).then(({ data }) => {
            context.commit('addToShoppingCart', data.result)
            resolve()
          })
        } else {
          context.commit('addToShoppingCart', goods)
          resolve()
        }
      })
    },
    // 在购物车中的商品可能会没有库存了或者失效， 每次打开购物车重新获取list 商品 或服务器购物车的最新数据
    updateGoodsInCart(context) {
      return new Promise((resolve, reject) => {
        if (context.rootState.user.profile.token) {
          getCartListAPI().then(({ data }) => {
            context.commit('setCartList', data.result)
            resolve()
          })
        } else {
          // 定义promise 数组: map 与原数组的长度的 顺序保持一致： 一一对应
          const promiseArr = context.state.list.map(item => { return updateGoodsInCartAPI(item.skuId) })

          Promise.all(promiseArr).then((dataArr) => {
            // console.log(dataArr) // 返回的数据里没有skuId
            dataArr.forEach((data, i) => { // 循环一次触发一次mutations
              context.commit('updateGoodsInCart', { skuId: context.state.list[i].skuId, ...data.data.result })
            })
            resolve()
          }).catch(e => {
            reject(e)
          })
        }
      })
    },
    // 删除购物车商品
    deleteGoodsInCart(context, skuId) {
      console.log(skuId)
      return new Promise((resolve, reject) => {
        if (context.rootState.user.profile.token) {
          deleteGoodsInCartAPI([skuId]).then(() => {
            // 重新请求接口获取数据列表，给state.list 赋值
            return getCartListAPI().then(({ data }) => {
              context.commit('setCartList', data.result)
              resolve()
            })
          })
        } else {
          context.commit('deleteGoodsInCart', skuId)
          resolve()
        }
      })
    },
    // 修改商品的选中状态 或 商品的数量(单选)
    reviseGoodsInfo(context, goods) {
      return new Promise((resolve, reject) => {
        if (context.rootState.user.profile.token) {
          reviseGoodsInCartAPI(goods).then(() => {
            return getCartListAPI().then(({ data }) => {
              context.commit('setCartList', data.result)
              resolve()
            })
          })
        } else {
          context.commit('updateGoodsInCart', goods)
          resolve()
        }
      })
    },
    // 全选
    selectedAllGoodsInCart(context, selected) {
      return new Promise((resolve, reject) => {
        if (context.rootState.user.profile.token) {
          selectedAllAPI(selected).then(() => {
            return getCartListAPI().then(({ data }) => {
              context.commit('setCartList', data.result)
              resolve()
            })
          })
        } else {
          context.getters.validGoodsList.forEach(item => {
            context.commit('updateGoodsInCart', { skuId: item.skuId, selected })
          })
          resolve()
        }
      })
    },
    // 批量删除 选中的商品 或清空无效商品
    batchDeleteGoodsInCart(context, isClear) {
      return new Promise((resolve, reject) => {
        if (context.rootState.user.profile.token) {
        // 获取选中列表的skuId 集合
          const ids = context.getters[isClear ? 'invalidGoodsList' : 'selectedGoodsList'].map(item => item.skuId)
          // 请求删除的接口
          deleteGoodsInCartAPI(ids).then(() => {
            // 重新获取购物车数据
            return getCartListAPI().then(({ data }) => {
              context.commit('setCartList', data.result)
              resolve()
            })
          })
        } else {
          context.getters[isClear ? 'invalidGoodsList' : 'selectedGoodsList'].forEach(item => {
            context.commit('deleteGoodsInCart', item.skuId)
          })
          resolve()
        }
      })
    },
    // 更改购物车的sku规格： ！！！！未完成， 有问题
    updateGoodsSkuInfo(context, { oldsSkuId, newSku }) {
      return new Promise((resolve, reject) => {
        if (context.rootState.user.profile.token) {
          const oldGoods = context.state.validGoodsList.find(item => item.skuId === oldsSkuId)
          // 删除当前商品
          deleteGoodsInCartAPI([oldsSkuId]).then(() => {
            // 把新商品添加到购物车
            return addToCartAPI({ skuId: newSku.skuId, count: oldGoods.count }).then(() => {
              // 重新获取购物车数据
              return getCartListAPI().then(({ data }) => {
                // 赋值state.list， 渲染页面
                context.commit('setCartList', data.result)
                resolve()
              })
            })
          })
        } else {
          // 找出旧的商品的信息
          console.log(55)
          const oldGoods = context.state.validGoodsList.find(item => item.skuId === oldsSkuId)
          console.log(oldGoods)
          console.log(66)
          // 删除旧的商品
          context.commit('deleteGoodsInCart', oldsSkuId)
          // 结构出新商品的信息： 不全： 只有5项
          const { skuId, inventory: stock, price: nowPrice, oldPrice: price, specsText: attrsText } = newSku
          // 合并新旧商品的信息
          const newGoods = { ...oldGoods, skuId, stock, nowPrice, price, attrsText }
          console.log(newGoods)
          console.log(33)
          context.commit('addToShoppingCart', newGoods)
        }
      })
    },

    // 合并购物车
    async mergeCart(context) {
      const localCartList = context.getters.validGoodsList.map(({ skuId, selected, count }) => {
        return { skuId, selected, count }
      })
      // 请求接口合并本地和线上购物车， 最新的列表存储在线上
      await mergeCartAPI(localCartList) // await 代表请求成功
      console.log(22)
      // 清空本地的购物车数据
      context.commit('setCartList', [])
      console.log(11)
    }

  },
  getters: { // 对state的数据进行加工处理， 形成新的数据， 不影响原数据
    // 得到头部购物车弹层的数据
    validGoodsList(state) {
      // 有库存且有效的商品
      return state.list.filter(item => item.stock > 0 && item.isEffective)
    },
    validGoodsTotal(state, getters) { // 件数
      return getters.validGoodsList.reduce((p, c) => p + c.count, 0)
    },
    validGoodsAmount(state, getters) { // 总金额
      return getters.validGoodsList.reduce((p, c) => p + (c.nowPrice * c.count), 0).toFixed(2)
    },
    // 无效的商品列表数据
    invalidGoodsList(state) {
      return state.list.filter(goods => goods.stock === 0 && !goods.isEffective)
    },
    // 已选中的商品列表
    selectedGoodsList(state, getters) {
      return getters.validGoodsList.filter(item => item.selected === true)
    },
    // 已选的商品件数
    selectedGoodsTotal(state, getters) {
      return getters.selectedGoodsList.reduce((p, c) => p + c.count, 0)
    },
    // 已选的商品金额
    selectedGoodsAmount(state, getters) {
      return getters.selectedGoodsList.reduce((p, c) => p + (c.nowPrice * c.count), 0).toFixed(2)
    },
    // 是否全选
    selectedAllGoodsInCart(state, getters) {
      if (getters.validGoodsList.length === getters.selectedGoodsList.length && getters.selectedGoodsList.length !== 0) return true
    }
  }
}
