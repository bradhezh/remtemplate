const itemsRouter = require('express').Router()

const {
  // don't use destructuring assignment since DI.db will be inited asyncly
  DI,
} = require('../app')
const {
  Item,
} = require('../entities/Item')

itemsRouter.get('/', async (req, res) => {
  // same to DI.db.em
  const items = await DI.em.find(Item)

  console.log(items)
  res.json(items)
})

module.exports = itemsRouter
