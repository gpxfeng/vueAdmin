import fetch from '../../../utils/axios/axios.js'


export function getToken() {
  return fetch({
    url: '/qiniu/upload/token', // 假地址 自行替换
    method: 'get'
  });
}
