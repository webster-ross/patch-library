import {Router} from 'express'
const router = Router()

// add book to library [POST /books]
router.post('/', (req, res) => res.send('All Books'))

export default router
