
const actionTypesOptions = [
  'onboarded',
  'short_url_click',
  'file_download',
  'exception',
  'visit',
  'referraljoin',
  'signup',
  'signin',
  'signout',
  'resetpassword',].concat(['frontend_exception', 'time_spent']).map(x => ({ id: x, value: x }))


export {
  actionTypesOptions
}
