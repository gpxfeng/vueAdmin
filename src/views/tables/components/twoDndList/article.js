import fetch from '../../../../utils/axios/axios.js'

export function getList () {
  return fetch({
    url: '/article/list',
    method: 'get'
  })
}

export function getArticle () {
  return fetch({
    url: '/article/detail',
    method: 'get'
  })
}
