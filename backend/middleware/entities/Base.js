const baseProps = {
  id: {primary: true, type: 'number'},
  createdAt: {
    type: 'Date',
    lazy: true, hidden: true,
    onCreate: () => new Date(),
  },
  updatedAt: {
    type: 'Date',
    lazy: true, hidden: true,
    onCreate: () => new Date(), onUpdate: () => new Date(),
  },
}

module.exports = baseProps
