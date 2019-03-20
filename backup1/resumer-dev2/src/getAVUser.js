import AV from './store/leancloud'
export default function (user) {
  var {id, attributes: {username}} = user || AV.User.current() || {attributes: {}}
  var result = {
    id: id || '',
    username: username || ''
  }
  return result
}
