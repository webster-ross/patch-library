export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  PG_URI: process.env.PG_URI,
  REDIS_URI: process.env.REDIS_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  MAX_CHECK_OUTS: process.env.MAX_CHECK_OUTS,
  MAX_OVER_DUE: process.env.MAX_OVER_DUE
}
