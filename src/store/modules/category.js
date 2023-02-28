// 导入一级分类常量数据
import { headerCategory } from '@/api/constant'
// 导入API 接口
import { getAllCategoryListAPI } from '@/api/headerAPI/getCategoryAPI'
export default {
  namespaced: true,
  state() {
    return {
      // 把常量一级分类存储到vuex，避免数据请求失败，页面空白
      // list: headerCategory.map((item) => ({ name: item }))
      list: headerCategory.map((item) => {
        return {
          name: item
        }
      })
    }
  },
  mutations: {
    // 获取分类，重新给list 赋值
    setCategory(state, payload) {
      state.list = payload
    },
    // 显示隐藏二级分类
    show(state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = true
    },
    hide(state, item) {
      // arr.find() 找出第一个符合条件的数组成员，并返回该成员，如果没有找到返回undefined
      const category = state.list.find(category => category.id === item.id)
      category.open = false
    }
  },
  actions: {
    // 请求接口， 获取分类数据， 触发mutation， 修改state
    async getCategoryList(context) {
      // const data = await getAllCategoryListAPI()
      const { data: res } = await getAllCategoryListAPI()
      // console.log(res)
      res.result.forEach(item => {
        // 给获取的每一条数据添加open 属性, 控制二级分类的显示隐藏
        item.open = false
      })
      context.commit('setCategory', res.result)
    }

  },
  getters: {}
}
