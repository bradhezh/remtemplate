// common configs used by both the frontend and backend

module.exports = {
  ITEMS_EP: '/api/items',
  BY_ID: '/id/:id',

  ERR_NOT_FOUND: 'NotFoundError',
  ERR_UNIQUE: 'UniqueConstraintViolationException',
  ERR_UNIQUE_MSG: 'Database UNIQUE constraint failed',
  ERR_NULL: 'NotNullConstraintViolationException',
  ERR_NULL_MSG: 'Database NOT NULL constraint failed',
  ERR_VALID: 'ValidationError',
  ERR_VALID_MSG: 'Database validation failed',

  HTTP_SUCC: 200,
  HTTP_CREATED: 201,
  HTTP_NO_CONT: 204,
  HTTP_BAD_REQ: 400,
  HTTP_UNAUTHED: 401,
  HTTP_NOT_FOUND: 404,
}
