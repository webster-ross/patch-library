import request from 'supertest'
import server from '../src/server'

const newServer = server()

describe('POST /tokens', () => {
  it('returns auth tokens', async () => {
    const response = await request(newServer)
      .post('/tokens')
      .send({email: 'librarian@library.com', password: 'password'})

    expect(response.status).toBe(201)
    expect(response.body.jwt).toBeTruthy()
    expect(response.body.refresh_token).toBeTruthy()
  })

  it('handles invalid auth', async () => {
    const response = await request(newServer)
      .post('/tokens')
      .send({email: 'user@library.com', password: 'password'})

    expect(response.status).toBe(401)
  })
})

describe('POST /tokens/refresh', () => {
  it('returns new jwt token', async () => {
    let response = await request(newServer)
      .post('/tokens')
      .send({email: 'librarian@library.com', password: 'password'})

    const {body: {jwt}, body: {refresh_token}} = response

    response = await request(newServer)
      .post('/tokens/refresh')
      .send({refresh_token})

    expect(response.status).toBe(201)
    expect(response.body.jwt).toBeTruthy()
    expect(response.body.jwt).not.toBe(jwt)
  })

  it('handles invalid refresh token', async () => {
    const response = await request(newServer)
      .post('/tokens/refresh')
      .send({refresh_token: ''})

    expect(response.status).toBe(400)
  })
})

describe('DELETE /tokens', () => {
  it('invalidates refresh token', async () => {
    let response = await request(newServer)
      .post('/tokens')
      .send({email: 'librarian@library.com', password: 'password'})

    const {body: {jwt}, body: {refresh_token}} = response

    response = await request(newServer)
      .delete('/tokens')
      .set('X-Access-Token', jwt)
      .send({refresh_token})

    expect(response.status).toBe(204)

    response = await request(newServer)
      .post('/tokens/refresh')
      .send({refresh_token})

    expect(response.status).toBe(400)
  })

  it('handles unauthorized request', async () => {
    let response = await request(newServer)
      .post('/tokens')
      .send({email: 'librarian@library.com', password: 'password'})

    const {body: {jwt}, body: {refresh_token}} = response

    response = await request(newServer)
      .delete('/tokens')
      .set('X-Access-Token', '')
      .send({refresh_token})

    expect(response.status).toBe(401)
  })

  it('handles invalid refresh token', async () => {
    let response = await request(newServer)
      .post('/tokens')
      .send({email: 'librarian@library.com', password: 'password'})

    const {body: {jwt}, body: {refresh_token}} = response

    response = await request(newServer)
      .delete('/tokens')
      .set('X-Access-Token', jwt)
      .send({refresh_token: ''})

    expect(response.status).toBe(400)
  })
})
