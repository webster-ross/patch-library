import {validationResult} from 'express-validator'
import redis from '../../../data/redis'

// connect to redis
const redisClient = redis()

export default async (req, res, next) => {
  // validate input
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send({errors: errors.array()})
  }

  // delete refresh token
  try {
    const {refresh_token: refreshToken} = req.body
    const userId = await redisClient.get(refreshToken)
    if (req.user == null || userId != req.user.id) return res.sendStatus(401)
    await redisClient.del(refreshToken)
    res.sendStatus(204)
  } catch(e) { return next(e) }
}
