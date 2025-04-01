const itemsRouter = require('express').Router()

const conf = require('../conf')
const {
  // don't use destructuring assignment since DI.db will be inited asyncly
  DI,
} = require('../app')
const {
  Item,
} = require('../entities/Item')

/* retrieve all items
request '/api/items'
response HTTP_SUCC [{
  id: number/unique,
  name: string/unique,
}]
*/
itemsRouter.get('/', async (req, res) => {
  // same to DI.db.em
  const items = await DI.em.find(Item)

  res.json(items)
})

/* retrieve the item with a specified id
request '/api/items/id/:id'
response HTTP_SUCC {
  id: number/unique,
  name: string/unique,
}
*/
itemsRouter.get(conf.BY_ID, async (req, res) => {
  const item = await DI.em.findOneOrFail(Item, {
    id: req.params.id,
  })

  res.json(item)
  /* or with extra data
  res.json({
    ...item.toJSON(),
    extra: 'data',
  })
  */
})

/* create an item
request '/api/items' {
  name: string/unique,
}
response HTTP_CREATED {
  id: number/unique,
  name: string/unique,
}
*/
itemsRouter.post('/', async (req, res) => {
  const data = req.body

  const item = DI.em.create(Item, data)
  await DI.em.flush()

  res.status(conf.HTTP_CREATED).json(item)
})

/* remove items with specified ids
request '/api/items' [
  id: number/unique,
]
response HTTP_SUCC count:number
*/
itemsRouter.delete('/', async (req, res) => {
  const ids = req.body

  const items = await DI.em.find(Item, {
    id: {
      $in: ids,
    },
  })
  for (const item of items) {
    DI.em.remove(item)
  }
  await DI.em.flush()
  res.status(conf.HTTP_SUCC).json(items.length)

  /* or
  const count = await DI.em.nativeDelete(Item, {
    id: {
      $in: ids,
    },
  })
  res.status(conf.HTTP_SUCC).json(count)
  */
})

/* modify the item with a specified id
request '/api/items/id/:id' {
  name: string/unique,
}
response HTTP_NO_CONT
*/
itemsRouter.put(conf.BY_ID, async (req, res) => {
  const data = req.body

  const item = await DI.em.findOneOrFail(Item, {
    id: req.params.id,
  })
  Object.assign(item, data)
  await DI.em.flush()

  res.status(conf.HTTP_NO_CONT).end()
})

module.exports = itemsRouter
