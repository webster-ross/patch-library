import {validationResult} from 'express-validator'
import pg from '../../../data/postgres'

export default async (req, res, next) => {
  // validate input
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send({errors: errors.array()})
  }

  // add new book to db
  try {
    const {rows} = await pg.query(`insert into books (title, isbn, added_by)
                                   values ($1, $2, $3) returning *`,
                                   [req.body.title, req.body.isbn, req.user.id])
    const [book] = rows
    res.status(201).send(book)
  }
  catch(e) { return next(e) }
}
