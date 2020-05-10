import pg from '../../../data/postgres'

const checkedOutQuery = `select * from books where checkout_by = $1`

export default async (req, res, next) => {
  // get list of checked out books
  try {
    const {rows: result} = await pg.query(checkedOutQuery, [req.user.id])
    res.status(200).send(result)
  }
  catch(e) { return next(e) }
}
