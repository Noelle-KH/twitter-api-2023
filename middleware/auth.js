const createError = require('http-errors')
const helpers = require('../_helpers')
const passport = require('../config/passport')

const authenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    if (error || !user) next(createError(401, '請先登入'))

    req.user = user
    next()
  })(req, res, next)
}

const authenticatedAdmin = (req, res, next) => {
  const loginUser = helpers.getUser(req)
  if (loginUser.role !== 'admin') throw createError(403, '沒有使用該頁面的權限')

  next()
}

const authenticatedUser = (req, res, next) => {
  const loginUser = helpers.getUser(req)
  if (loginUser.role !== 'user') throw createError(403, '沒有使用該頁面的權限')

  next()
}

const authenticatedSelf = (req, res, next) => {
  const loginUser = helpers.getUser(req)
  if (loginUser.id !== Number(req.params.id)) throw createError(403, '沒有使用該頁面的權限')

  next()
}

const checkFieldNotEmpty = (req, res, next) => {
  const { account, password } = req.body
  if (!account || !password) throw createError(400, '欄位不得為空')

  next()
}

module.exports = {
  authenticated, authenticatedAdmin, authenticatedUser, authenticatedSelf, checkFieldNotEmpty
}
