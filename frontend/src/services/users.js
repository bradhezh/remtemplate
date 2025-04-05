import axios from 'axios'

import conf from '../../../conf'

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

// create a user
//user: {
//  username: string/unique,
//  name: string,
//  password: string/conf.PASSWD_MIN+,
//}
//return: HTTP_CREATED id:number/unique
const create = async (user) => {
  const res = await axios.post(`${conf.USERS_EP}`, user, {
    headers,
  })
  return res.data
}

export default {
  create,
}
