const baseProps = {
  _id: {primary: true, type: 'ObjectId'},
  id: {serializedPrimaryKey: true, type: 'string'},
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
