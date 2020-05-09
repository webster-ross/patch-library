import {Router} from 'express'
import {authRoute} from '../middleware'
import {bookValidator} from './validators'
import {addBookHandler} from './handlers'

const router = Router()

// add book to library [POST /books]
router.post('/', authRoute({librarian: 1}), bookValidator, addBookHandler)

export default router
