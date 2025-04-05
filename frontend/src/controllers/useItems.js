import {useState} from 'react'

import useUser from './useUser'
import itemsSvc from '../services/items'

// a custom hook for this state
const useItems = () => {
  const {user} = useUser()

  //[{
  //  id: number/unique,
  //  name: string/unique,
  //}]
  const [items, setItems] = useState([])

  // get all items of the user, or all items if the user is null
  const getItems = async () => {
    let data
    if (!user) {
      data = await itemsSvc.get()
    } else {
      data = await itemsSvc.getByUser(user.token)
    }
    setItems(data)
  }

  const getAllItems = async () => {
    const data = await itemsSvc.get()
    setItems(data)
  }

  return {
    items,
    getItems,
    getAllItems,
  }
}

export default useItems
