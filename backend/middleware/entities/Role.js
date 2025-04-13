const roleProps = {
  name: {type: 'string', unique: true},
  users: {kind: 'm:n', type: 'User', mappedBy: 'roles'},
}

module.exports = roleProps
