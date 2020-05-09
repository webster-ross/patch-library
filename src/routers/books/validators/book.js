import {check} from 'express-validator'

export default [
  check('title').trim().not().isEmpty(),
  check('isbn').trim().isISBN().blacklist('-').blacklist(' ')
]
