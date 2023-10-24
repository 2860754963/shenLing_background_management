const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.userInfo?.avatar,
  name: state => state.user.userInfo?.name
}
export default getters
