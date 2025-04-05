// axios throws an error if the response indicates an error
import axios from 'axios'

// import cjs in mjs as normal due to vite-plugin-commonjs
import conf from '../../../conf'

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

// get all items
//return: [{
//  id: number/unique,
//  name: string/unique,
//}]
const get = async () => {
  const res = await axios.get(`${conf.ITEMS_EP}`, {
    headers,
  })
  return res.data
}

// get all items of the request user
//token: string
//return: [{
//  id: number/unique,
//  name: string/unique,
//}]
const getByUser = async (token) => {
  const res = await axios.get(`${conf.ITEMS_EP}${conf.BY_USER}`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
}

export default {
  get,
  getByUser,
}
