const {
  describe,
  test,
  before,
  after,
} = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')

const conf = require('../conf')
const {
  Item,
} = require('../entities/Item')
const {
  DI,
  app,
  init,
} = require('../app')

const items = [{
  name: 'test item 1',
  createdAt: new Date(),
  updatedAt: new Date(),
}, {
  name: 'test item 2',
  createdAt: new Date(),
  updatedAt: new Date(),
}]

let em
let api

describe('endpoints', () => {
  before(async () => {
    await init()
    api = supertest(app)
    em = DI.em.fork()
    await em.nativeDelete(Item, {})
  })

  describe('items', () => {
    before(async () => {
      for (const item of items) {
        em.create(Item, item)
      }
      await em.flush()
    })

    test('get', async () => {
      const res = await api
        .get(conf.ITEMS_EP)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      assert.strictEqual(res.body.length, items.length)
      for (let i = 0; i < res.body.length; ++i) {
        assert.strictEqual(res.body[i].name, items[i].name)
        assert.equal(res.body[i].createdAt, null)
        assert.equal(res.body[i].updatedAt, null)
      }
    })
  })

  after(async () => {
    await DI.db?.close()
  })
})
