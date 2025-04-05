import {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'

import conf from '../../../conf'
import Notif from './Notif'
import useUser from '../controllers/useUser'

const Login = () => {
  const navigate = useNavigate()
  const [notif, setNotif] = useState(null)
  // note that "username" here is just a local const with the current state
  // value, and a state should always be updated via its setter
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {login} = useUser()

  const loginHandler = async (evt) => {try {
    // prevent default POST of submitting forms
    evt.preventDefault()

    if (!username || !password) {
      setNotif({
        message: conf.ERR_IV_USER_PASSWD,
      })
      return
    }

    await login({
      username,
      password,
    })

    // unmount all from the router and mount (initial render) the target route
    navigate('/')

  } catch (err) {
    setNotif({
      message: err.response?.data?.message || err.message,
    })
  }}

  return (
    <div>
      <h1>Login</h1>
      {/* the brace is used to include js code in jsx */}
      <form onSubmit={loginHandler}>
        <input placeholder="Username" value={username}
          onChange={evt => setUsername(evt.target.value)} />
        <br />
        <input type="password" placeholder="Password" value={password}
          onChange={evt => setPassword(evt.target.value)} />
        <br />
        <Notif notif={notif} />
        <button type="submit">Login</button>
      </form>
      <Link to="/signup">Sign up</Link>
    </div>
  )
}

export default Login
