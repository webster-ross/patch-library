import jwt from 'jsonwebtoken'
import {validationResult} from 'express-validator'
import configs from '../../../configs'
import redis from '../../../data/redis'

// connect to redis
const redisClient = redis()

 export default async (req, res, next) => {
   // validate input
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
     return res.status(400).send({errors: errors.array()})
   }

   // create new jwt token
   try {
     const {refresh_token: refreshToken} = req.body
     const userId = await redisClient.get(refreshToken)
     const token = jwt.sign({user: userId}, configs.JWT_SECRET, {expiresIn: '15m'})
     res.status(200).send({jwt: token})
   }
   catch(e) { return next(e) }
}
