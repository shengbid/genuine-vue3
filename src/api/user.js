import request from '@/utils/request'
// import { tokenName } from '@/config'

// 登陆
export async function login(data) {
  return request({
    url: '/gsh/login',
    method: 'post',
    data,
  })
}

// 注册
export async function register(data) {
  return request({
    url: '/gsh/saveTGshUser',
    method: 'post',
    data,
  })
}
// 获取登陆用户信息
export function getUserInfo(accessToken) {
  //此处为了兼容mock.js使用data传递accessToken，如果使用mock可以走headers
  // return request({
  //   url: '/userInfo',
  //   method: 'post',
  //   data: {
  //     [tokenName]: accessToken,
  //   },
  // })
  return new Promise((reslove) => {
    reslove({
      data: {
        username: localStorage.getItem('username') || '管理员',
        avatar: '',
      },
    })
  })
}

// 退出登录
export function logout(data) {
  return request({
    url: '/gsh/logOut',
    method: 'post',
    data,
  })
}
// 获取验证码
export async function getFakeCaptcha(params) {
  return request({
    url: '/email/sendSimpleEmail',
    params,
  })
}
