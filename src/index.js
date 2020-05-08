import configServer from './server'
import configs from './configs'

// start server
const server = configServer()
server.listen(configs.PORT)
