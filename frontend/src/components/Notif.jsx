import PropTypes from 'prop-types'

const Notif = ({notif}) => {
  if (!notif) {
    return
  }

  return <div>{notif.message}</div>
}

Notif.propTypes = {
  notif: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
}

export default Notif
