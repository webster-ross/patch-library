import {Pool} from 'pg'
import configs from '../configs'

const client = new Pool({connectionString: configs.PG_URI})
export default client
