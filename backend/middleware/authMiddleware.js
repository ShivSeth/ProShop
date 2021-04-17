import jwt from 'jsonwebtoken'
import User from '../modals/userModal.js'
import asyncHandler from 'express-async-handler'
const protect = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization
  if (token && token.startsWith('Bearer')) {
    try {
      token = token.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
      console.log(req.user)
      next()
    } catch (err) {
      res.status(401)
      throw new Error('Not Authorized, Token Failed')
    }
  } else {
    res.status(401)
    throw new Error('Not Authorized, No Token')
  }
})

export { protect }
