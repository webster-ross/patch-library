import jwt from 'jsonwebtoken'
import configs from '../../configs'

export default (roles = {}) => {
  return (req, res, next) => {
    // validate token
    try {
      const token = req.header('X-Access-Token')
      const decoded = jwt.verify(token, configs.JWT_SECRET)
      
      if (roles[decoded.user.role]) {
        req.user = decoded.user
        next()
      } else res.sendStatus(401)
    } catch(e) { res.sendStatus(401) }
  }
}
