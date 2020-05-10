import pg from '../../../data/postgres'

const returnQuery = `update books set checkout_by = null, checkout_at = null where id = (select id from books where checkout_by = $1 and isbn = $2 limit 1 for update) returning *`

export default async (req, res, next) => {
  // update book for return
  try {
    //
    const {rows: result} = await pg.query(returnQuery, [req.user.id, req.params.isbn])
    const [book] = result
    book ? res.status(200).send(book) : res.sendStatus(400)
  }
  catch(e) { return next(e) }
}
