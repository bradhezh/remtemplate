import {useState, useCallback} from 'react'

import usersSvc from '../services/users'

const useUsers = () => {
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
  const signup = useCallback(async (user) => {
    await usersSvc.create(user)
  }, [])

  //user: {
  //  username: string/unique,
  //  name: string,
  //  password: string/conf.PASSWD_MIN+,
  //}
  const createUser = useCallback(async (user) => {
    const id = await usersSvc.create(user)
    setUsers([
      ...users, {
        ...user,
        id,
        password: undefined,
      },
    ])
  }, [users])

  return {
    users,
    signup,
    createUser,
  }
}

export default useUsers
