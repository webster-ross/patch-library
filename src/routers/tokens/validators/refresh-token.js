import {check} from 'express-validator'
import redis from '../../../data/redis'
import pg from '../../../data/postgres'

// connect to redis
const redisClient = redis()

export default [
  check('refresh_token').custom(async (value = '') => {
    const userId = await redisClient.get(value)
    const {rows} = await pg.query(`select count(*) from users where id = $1`, [userId])
    const [{count}] = rows
    if (count != 1) throw new Error('Invalid token')
  })
]
