import {Router} from 'express'
import {authRoute} from '../middleware'
import {bookValidator} from './validators'
import {addBookHandler, removeBookHandler} from './handlers'

const router = Router()

// add book to library [POST /books]
router.post('/', authRoute({librarian: 1}), bookValidator, addBookHandler)

// remove book from library [DELETE /books/:id]
router.delete('/:id', authRoute({librarian: 1}), removeBookHandler)

export default router
