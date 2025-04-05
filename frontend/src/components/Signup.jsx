import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import conf from '../../../conf'
import Notif from './Notif'
import useUsers from '../controllers/useUsers'

const Signup = () => {
  const navigate = useNavigate()
  const [notif, setNotif] = useState(null)
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const {signup} = useUsers()

  const signupHandler = async (evt) => {try {
    evt.preventDefault()

    if (!username || !password || !confirmation) {
      setNotif({
        message: conf.ERR_IV_USER_PASSWD_CONFIRM,
      })
      return
    }
    if (password.length < conf.PASSWD_MIN) {
      setNotif({
        message: conf.ERR_PASSWD,
      })
      return
    }
    if (password !== confirmation) {
      setNotif({
        message: conf.ERR_IV_PASSWD_CONFIRM,
      })
      return
    }

    await signup({
      username,
      name,
      password,
    })

    navigate('/login')

  } catch (err) {
    setNotif({
      message: err.response?.data?.message || err.message,
    })
  }}

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={signupHandler}>
        <input placeholder="Username" value={username}
          onChange={evt => setUsername(evt.target.value)} />
        <br />
        <input placeholder="Name" value={name}
          onChange={evt => setName(evt.target.value)} />
        <br />
        <input type="password" placeholder="Password" value={password}
          onChange={evt => setPassword(evt.target.value)} />
        <br />
        <input type="password" placeholder="Confirm password"
          value={confirmation}
          onChange={evt => setConfirmation(evt.target.value)} />
        <br />
        <Notif notif={notif} />
        <button type="submit">Sign up</button>
      </form>
    </div>
  )
}

export default Signup
