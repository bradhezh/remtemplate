import axios from 'axios'

import conf from '../../../conf'

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

// login
//credential: {
//  username: string/unique,
//  password: string/conf.PASSWD_MIN+,
//}
//return: {
//  name: string,
//  token: string,
//}
const login = async (credential) => {
  const res = await axios.post(`${conf.LOGIN_EP}`, credential, {
    headers,
  })
  return res.data
}

export default {
  login,
}
