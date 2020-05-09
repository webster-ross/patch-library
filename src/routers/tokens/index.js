import {Router} from 'express'
import {refreshTokenValidator} from './validators'
import {newTokenHandler, refreshTokenHandler} from './handlers'

const router = Router()

// get new auth token [POST /tokens]
router.post('/', newTokenHandler)

// refresh auth token [POST /tokens/refresh]
router.post('/refresh', refreshTokenValidator, refreshTokenHandler)

export default router
