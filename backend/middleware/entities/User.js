const userProps = {
  username: {type: 'string', unique: true},
  name: {type: 'string'},
  password: {type: 'string', lazy: true, hidden: true},
  roles: {kind: 'm:n', type: 'Role'},
}

module.exports = userProps
