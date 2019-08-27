import devServer from './dev.server.js'
import testServer from './test.server.js'
import prodServer from './prod.server.js'

let server
if (process.env.NODE_ENV === 'development') {
  server = devServer
} else if (process.env.NODE_ENV === 'production') {
  server = prodServer
} else if (process.env.NODE_ENV === 'test') {
  server = testServer
}

export default server
