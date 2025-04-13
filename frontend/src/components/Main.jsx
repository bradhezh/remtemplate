import {useState, useEffect} from 'react'

import Notif from './Notif'
import UserBar from './UserBar'
import useItems from '../controllers/useItems'

const Main = () => {
  const [notif, setNotif] = useState(null)
  const {items, getItems} = useItems()

  useEffect(() => {(async () => {try {
    await getItems()
  } catch (err) {
    setNotif({
      message: err.response?.data?.message || err.message,
    })
  }})()
    /*
    return () => {
      console.log('cleanup')
    }
    */
  }, [getItems])

  return (
    <div>
      <UserBar />
      {/* note that effects run after renders, so init values of states are used
        in the initial render, beware of null */}
      <Notif notif={notif} />
      <ul>{items.map(e =>
        <li key={e.id}>
          <span>{e.id} | {e.name}</span>
        </li>
      )}</ul>
    </div>
  )
}

export default Main
