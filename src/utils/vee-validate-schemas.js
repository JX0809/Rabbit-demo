// 表单校验规则
import { verifyUserAccountAPI } from '@/api/loginAPI/loginAPI'

export default {
  // 校验用户名
  account(value) {
    if (!value) return '请输入用户名'
    if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '用户名以字母开头且6-20个字符'
    return true
  },
  // 校验用户名是否存在
  async accountChecked (value) {
    if (!value) return '请输入用户名'
    if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '用户名以字母开头且6-20个字符'
    const { data } = await verifyUserAccountAPI(value)
    if (data.result.valid) {
      return '用户名已存在'
    } else {
      return true
    }
  },
  password(value, { form }) {
    if (!value) return '请输入密码'
    if (!/^\w{6,24}$/.test(value)) return '密码是6-24个字符'
    return true
  },
  reconfirmPsw(value, { form }) {
    if (!value) return '请输入密码'
    if (!/^\w{6,24}$/.test(value)) return '密码是6-24个字符'
    // 校验密码是否一致  form表单数据对象
    if (value !== form.password) return '两次输入的密码不一致'
    return true
  },
  mobile(value) {
    if (!value) return '请输入手机号'
    if (!/^1[3-9]\d{9}$/.test(value)) return '手机号码格式错误'
    return true
  },
  code(value) {
    if (!value) return '请输入验证码'
    if (!/^\d{6}$/.test(value)) return '验证码为6位数字'
    return true
  },
  isAgree(value) {
    if (!value) return '请勾选同意用户协议'
    return true
  },
  receiver(value) {
    if (!value) return '请输入收货人姓名'
    return true
  },
  city(value) {
    if (!value) return '请选择所在的省、市'
    return true
  },
  postalCode(value) {
    if (!value) return '请输入邮政编码'
    if (!/^\d{6}$/.test(value)) return '邮政编码为6位数字'
    return true
  },
  address(value) {
    if (!value) return '请输入详细地址'
    return true
  },
  label(value) {
    if (!value) return '请输入地址标签'
    return true
  }
}
