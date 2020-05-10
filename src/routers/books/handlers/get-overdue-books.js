import pg from '../../../data/postgres'

const overdueQuery = `select * from books where checkout_at + interval '2 weeks' <= now()`

export default async (req, res, next) => {
  // get list of overdue books
  try {
    const {rows: result} = await pg.query(overdueQuery)
    res.status(200).send(result)
  }
  catch(e) { return next(e) }
}
