import {Router} from 'express'
import {authRoute} from '../middleware'
import {bookValidator} from './validators'
import {addBookHandler, removeBookHandler, checkoutBookHandler} from './handlers'

const router = Router()

// add book to library [POST /books]
router.post('/', authRoute({librarian: 1}), bookValidator, addBookHandler)

// remove book from library [DELETE /books/:id]
router.delete('/:id', authRoute({librarian: 1}), removeBookHandler)

// checkout book from library [PUT /books/:isbn/checkout]
router.put('/:isbn/checkout', authRoute({user: 1, librarian: 1}), checkoutBookHandler)

export default router
