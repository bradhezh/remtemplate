import axios from 'axios'

// import cjs in mjs as normal due to vite-plugin-commonjs
import conf from '../../../conf'

const get = async () => {
  const res = await axios.get(
    `${conf.ITEMS_EP}`,
  )
  return res.data
}

export default {
  get,
}
