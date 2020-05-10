import {Router} from 'express'
import {authRoute} from '../middleware'
import {bookValidator} from './validators'
import {
  addBookHandler,
  removeBookHandler,
  getOverdueBooksHandler,
  checkoutBookHandler,
  returnBookHandler,
} from './handlers'

const router = Router()

// add book to library [POST /books]
router.post('/', authRoute({librarian: 1}), bookValidator, addBookHandler)

// remove book from library [DELETE /books/:id]
router.delete('/:id', authRoute({librarian: 1}), removeBookHandler)

// get list of overdue books [GET /books/overdue]
router.get('/overdue', authRoute({librarian: 1}), getOverdueBooksHandler)

// check out book from library [POST /books/:isbn/checkout]
router.post('/:isbn/checkout', authRoute({user: 1, librarian: 1}), checkoutBookHandler)

// return checked out book [DELETE /books/:isbn/checkout]
router.delete('/:isbn/checkout', authRoute({user: 1, librarian: 1}), returnBookHandler)

export default router
