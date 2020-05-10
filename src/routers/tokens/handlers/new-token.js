import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import randToken from 'rand-token'
import configs from '../../../configs'
import pg from '../../../data/postgres'
import redis from '../../../data/redis'

// connect to redis
const redisClient = redis()

export default async (req, res, next) => {
  const {email = '', password = ''} = req.body

  // verify email and password
  try {
    const {rows} = await pg.query(`select * from users where email = $1`, [email.trim()])
    const [user] = rows

    // check password
    const match = await bcrypt.compare(password, (user && user.password) || '')

    if (match) {
      // create tokens
      const token = jwt.sign({user: user, iat: Date.now()}, configs.JWT_SECRET, {expiresIn: '15m'})
      const refreshToken = randToken.generate(64)

      // store refresh token to redis that expires in a week
      await redisClient.set(refreshToken, user.id, 'EX', 604800)

      res.status(201).send({jwt: token, refresh_token: refreshToken})
    } else res.sendStatus(401)
  } catch(e) { return next(e) }
}
