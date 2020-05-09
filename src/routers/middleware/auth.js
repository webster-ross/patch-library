import jwt from 'jsonwebtoken'
import configs from '../../configs'

export default (req, res, next) => {
  // validate token
  try {
    const token = req.header('X-Access-Token')
    const decoded = jwt.verify(token, configs.JWT_SECRET)
    req.user = decoded.user
    next()
  } catch(e) { res.sendStatus(401) }
}
