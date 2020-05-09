import {Router} from 'express'
import {authRoute} from '../middleware'
import {refreshTokenValidator} from './validators'
import {newTokenHandler, refreshTokenHandler, invalidateTokenHandler} from './handlers'

const router = Router()

// get new auth token [POST /tokens]
router.post('/', newTokenHandler)

// refresh auth token [POST /tokens/refresh]
router.post('/refresh', refreshTokenValidator, refreshTokenHandler)

// invalidate refresh token [DELETE /tokens]
router.delete('/', authRoute({user: 1, librarian: 1}), refreshTokenValidator, invalidateTokenHandler)

export default router
