import {create} from 'zustand'
import {persist} from 'zustand/middleware'

import loginSvc from '../services/login'

// the hook for this state
const useUser = create(persist((set) => ({
  //{
  //  username: string/unique,
  //  name: string,
  //  token: string,
  //}
  user: null,

  /* if the persist middleware is used, the init value comes from localStorage,
    which always synchronises with the state via "set", which writes to both the
    state and localStorage; otherwise, an "init" method can be provided to init
    the state, usually called when the app starts, like in the App component's
    initial render effect
  init: async () => {
    // for example, using http-only cookies instead of localStorage;
    // returning the user loggedin or null, without errors thrown
    const data = await loginSvc.getMe()
    set({user: data})
  },
  */

  //credential: {
  //  username: string/unique,
  //  password: string/conf.PASSWD_MIN+,
  //}
  login: async (credential) => {
    const data = await loginSvc.login(credential)
    set({user: {
      ...data,
      username: credential.username,
    }})
  },

  logout: () => {
    set({user: null})
  },

}), {
  // the key in localStorage
  name: 'user',
}))

export default useUser
