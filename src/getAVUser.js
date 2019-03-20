import AV from './store/leancloud'
//获取用户当前用户username和id
//如果不存在设置为空字符串
export default function (user) {
  var {id, attributes: {username}} = user || AV.User.current() || {attributes: {}}
  var result = {
    id: id || '',
    username: username || ''
  }
  return result
}
