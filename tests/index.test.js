import request from 'supertest'
import server from '../src/server'

const newServer = server()

describe('GET /', () => {
  it('returns valid response', async () => {
    const response = await request(newServer).get('/')
    expect(response.status).toBe(200)
    expect(response.text).toEqual('Hello Patch')
  })
})
