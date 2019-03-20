const map = {
  202: '用户名被占用',
  217: '无效的用户名',
  210: '用户名或密码不正确',
  211: '无效的用户名',
  unknow: '请求失败，请稍后再试'
}
export default function ({code}) {
  return map[code] || map.unknow
}
