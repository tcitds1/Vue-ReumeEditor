import AV from './store/leancloud'
export default function (user) {
  var {id, attributes: {username}} = user || AV.User.current() || {attributes: {}}
  var result = {
    id: id || '',
    username: username || ''
  }
  console.log('getAVUser成功，result为')
  console.dir(result)
  return result
}
