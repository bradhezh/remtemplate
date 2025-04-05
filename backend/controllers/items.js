const itemsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const conf = require('../conf')
const AppErr = require('../utils/AppErr')
const {
  // don't use destructuring assignment since DI.db will be inited asyncly
  DI,
} = require('../app')
const {User} = require('../entities/User')
const {Item} = require('../entities/Item')

// get all items
//request: '/api/items'
//response: HTTP_SUCC [{
//  id: number/unique,
//  name: string/unique,
//}]
itemsRouter.get('/', async (req, res) => {
  // same to DI.db.em
  const items = await DI.em.find(Item)

  res.json(items)
})

// get all items of the request user
//request: '/api/items/user' {
//  Authorization: Bearer token,
//}
//response: HTTP_SUCC [{
//  id: number/unique,
//  name: string/unique,
//}]
itemsRouter.get(conf.BY_USER, async (req, res) => {
  const decoded = jwt.verify(
    req.get('authorization')?.replace('Bearer ', ''), conf.SECRET)

  const user = await DI.em.findOne(User, decoded.id, {
    populate: [
      'items',
    ],
  })
  if (!user) {
    throw new AppErr(conf.HTTP_UNAUTHED, conf.ERR_USER)
  }

/*
itemsRouter.get(conf.BY_USER, auth(), async (req, res) => {
  await DI.em.populate(user, [
    'items',
  ])
*/

  res.json(user.items)
})

// get the item with a specified id
//request: '/api/items/id/:id'
//response: HTTP_SUCC {
//  id: number/unique,
//  name: string/unique,
//}
itemsRouter.get(conf.BY_ID, async (req, res) => {
  const item = await DI.em.findOneOrFail(Item, req.params.id)

  res.json(item)
  /* or with extra data
  res.json({
    ...item.toJSON(),
    extra: 'data',
  })
  */
})

// create an item
//request: '/api/items' {
//  // only for Admin
//  Authorization: Bearer token,
//} {
//  name: string/unique,
//}
//response: HTTP_CREATED id:number/unique
/*
itemsRouter.post('/', auth([
  conf.ADMIN,
]), async (req, res) => {
  const item = DI.em.create(Item, req.body)
  await DI.em.flush()

  res.status(conf.HTTP_CREATED).json(item.id)
})
*/

// remove items with specified ids
//request: '/api/items' {
//  // only for Admin
//  Authorization: Bearer token,
//} [
//  id: number/unique,
//]
//response: HTTP_SUCC count:number
/*
itemsRouter.delete('/', auth([
  conf.ADMIN,
]), async (req, res) => {
  const items = await DI.em.find(Item, {
    id: {
      $in: req.body,
    },
  })
  for (const item of items) {
    DI.em.remove(item)
  }
  await DI.em.flush()

  res.status(conf.HTTP_SUCC).json(items.length)

  // or
  //const count = await DI.em.nativeDelete(Item, {
  //  id: {
  //    $in: req.body,
  //  },
  //})

  //res.status(conf.HTTP_SUCC).json(count)
})
*/

// modify the item with a specified id
//request: '/api/items/id/:id' {
//  // only for Admin
//  Authorization: Bearer token,
//} {
//  name: string/unique,
//}
//response: HTTP_NO_CONT
/*
itemsRouter.put(conf.BY_ID, auth([
  conf.ADMIN,
]), async (req, res) => {
  const item = await DI.em.findOneOrFail(Item, req.params.id)
  Object.assign(item, req.body)
  await DI.em.flush()

  res.status(conf.HTTP_NO_CONT).end()
})
*/

module.exports = itemsRouter
