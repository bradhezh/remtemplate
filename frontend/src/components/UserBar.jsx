import {useNavigate, Link} from 'react-router-dom'

import conf from '../../../conf'
import Notif from './Notif'
import useUser from '../controllers/useUser'

const UserBar = () => {
  const navigate = useNavigate()
  const {user, logout} = useUser()

  const logoutHandler = (evt) => {
    evt.preventDefault()
    logout()
    navigate('/login')
  }

  return (
    <div>{!user
      ? <Link to="/login">Login</Link>
      : <>
          <h2>Welcome, {user.name || user.username}</h2>
          <a href="/" onClick={logoutHandler}>Logout</a>
        </>
    }</div>
  )
}

export default UserBar
