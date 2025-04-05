import {useState} from 'react'

import useUser from './useUser'
import usersSvc from '../services/users'

const useUsers = () => {
  const {user} = useUser()

  //[{
  //  id: number/unique,
  //  username: string/unique,
  //  name: string,
  //}]
  const [users, setUsers] = useState([])

  //user: {
  //  username: string/unique,
  //  name: string,
  //  password: string/conf.PASSWD_MIN+,
  //}
  const signup = async (user) => {
    await usersSvc.create(user)
  }

  //user: {
  //  username: string/unique,
  //  name: string,
  //  password: string/conf.PASSWD_MIN+,
  //}
  const createUser = async (user) => {
    const id = await usersSvc.create(user)
    setUsers([
      ...users, {
        ...user,
        id,
        password: undefined,
      },
    ])
  }

  return {
    users,
    signup,
    createUser,
  }
}

export default useUsers
