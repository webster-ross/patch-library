import {validationResult} from 'express-validator'
import pg from '../../../data/postgres'

export default async (req, res, next) => {
  // remove book from db
  try {
    const bookId = parseInt(req.params.id)
    if (!Number.isInteger(bookId)) return res.sendStatus(404)

    const {rows} = await pg.query(`delete from books where id = $1
                                   returning *`, [bookId])
    const [book] = rows
    book ? res.status(201).send(book) : res.sendStatus(404)
  }
  catch(e) { return next(e) }
}
