import {validationResult} from 'express-validator'
import pg from '../../../data/postgres'
import configs from '../../../configs'

const countCheckOutsQuery = `select count(*) from books where checkout_by = $1`
const countOverdueQuery = `select count(*) from books where checkout_by = $1 and checkout_at + interval '2 weeks' <= now()`
const checkoutQuery = `update books set checkout_by = $1, checkout_at = now() where id = (select id from books where isbn = $2 and checkout_by is null limit 1 for update) returning *`

export default async (req, res, next) => {
  // update book for check out
  // TODO: review for any potential query concurrency issues
  // https://stackoverflow.com/questions/11532550/atomic-update-select-in-postgres
  try {
    await pg.query('begin')

    // check if max number of check outs reached by user
    const {rows: checkoutResults} = await pg.query(countCheckOutsQuery, [req.user.id])
    let [{count: checkoutCount}] = checkoutResults
    checkoutCount = parseInt(checkoutCount)

    if (checkoutCount >= configs.MAX_CHECK_OUTS) {
      await pg.query('rollback')
      return res.sendStatus(400)
    }

    // check if user has overdue books
    const {rows: overdueResults} = await pg.query(countOverdueQuery, [req.user.id])
    let [{count: overdueCount}] = overdueResults
    overdueCount = parseInt(overdueCount)

    if (overdueCount > configs.MAX_OVER_DUE) {
      await pg.query('rollback')
      return res.sendStatus(400)
    }

    // check out an available book
    const {rows: result} = await pg.query(checkoutQuery, [req.user.id, req.params.isbn])
    await pg.query('commit')
    const [book] = result
    book ? res.status(200).send(book) : res.sendStatus(404)
  }
  catch(e) { return next(e) }
}
