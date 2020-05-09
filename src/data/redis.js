import redis from 'async-redis'
import configs from '../configs'

export default () => {
  return redis.createClient(configs.REDIS_URI)
}
