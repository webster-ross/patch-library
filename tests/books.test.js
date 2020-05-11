import request from 'supertest'
import server from '../src/server'

const newServer = server()

describe('POST /books', () => {
  it('adds new book', async () => {
    let response = await request(newServer)
      .post('/tokens')
      .send({email: 'librarian@library.com', password: 'password'})

    const {body: {jwt}} = response

    response = await request(newServer)
      .post('/books')
      .set('X-Access-Token', jwt)
      .send({title: 'Good Read', isbn: '9780316707046'})

    expect(response.status).toBe(201)
    expect(response.body.title).toBe('Good Read')
    expect(response.body.isbn).toBe('9780316707046')
    expect(response.body.added_by).toBe(1)
    expect(response.body.checkout_by).toBeNull()
    expect(response.body.checkout_at).toBeNull()
  })

  it('handles invalid request', async () => {
    let response = await request(newServer)
      .post('/tokens')
      .send({email: 'librarian@library.com', password: 'password'})

    const {body: {jwt}} = response

    response = await request(newServer)
      .post('/books')
      .set('X-Access-Token', jwt)
      .send({title: 'Good Read', isbn: '0316707046'})

    expect(response.status).toBe(400)
  })

  it('handles invalid auth', async () => {
    const response = await request(newServer)
      .post('/books')
      .set('X-Access-Token', '')
      .send({title: 'Good Read', isbn: '9780316707046'})

    expect(response.status).toBe(401)
  })

  it('handles unauthorized users', async () => {
    let response = await request(newServer)
      .post('/tokens')
      .send({email: 'user1@library.com', password: 'password'})

    const {body: {jwt}} = response

    response = await request(newServer)
      .post('/books')
      .set('X-Access-Token', jwt)
      .send({title: 'Good Read', isbn: '9780316707046'})

    expect(response.status).toBe(401)
  })
})

describe('DELETE /books/:id', () => {
  it('deletes a book', async () => {
    let response = await request(newServer)
      .post('/tokens')
      .send({email: 'librarian@library.com', password: 'password'})

    const {body: {jwt}} = response

    response = await request(newServer)
      .post('/books')
      .set('X-Access-Token', jwt)
      .send({title: 'Good Read', isbn: '9780316707046'})

    const {body: {id: bookId}} = response

    response = await request(newServer)
      .delete('/books/' + bookId)
      .set('X-Access-Token', jwt)

    expect(response.status).toBe(200)
    expect(response.body.title).toBe('Good Read')
    expect(response.body.isbn).toBe('9780316707046')
    expect(response.body.added_by).toBe(1)
    expect(response.body.checkout_by).toBeNull()
    expect(response.body.checkout_at).toBeNull()

    response = await request(newServer)
      .delete('/books/' + bookId)
      .set('X-Access-Token', jwt)

    expect(response.status).toBe(404)
  })

  it('handles invalid auth', async () => {
    let response = await request(newServer)
      .post('/tokens')
      .send({email: 'librarian@library.com', password: 'password'})

    const {body: {jwt}} = response

    response = await request(newServer)
      .post('/books')
      .set('X-Access-Token', jwt)
      .send({title: 'Good Read', isbn: '9780316707046'})

    const {body: {id: bookId}} = response

    response = await request(newServer)
      .delete('/books/' + bookId)
      .set('X-Access-Token', '')

    expect(response.status).toBe(401)
  })

  it('handles unauthorized users', async () => {
    let response = await request(newServer)
      .post('/tokens')
      .send({email: 'librarian@library.com', password: 'password'})

    const {body: {jwt}} = response

    response = await request(newServer)
      .post('/books')
      .set('X-Access-Token', jwt)
      .send({title: 'Good Read', isbn: '9780316707046'})

    const {body: {id: bookId}} = response

    response = await request(newServer)
      .post('/tokens')
      .send({email: 'user1@library.com', password: 'password'})

    const {body: {jwt: userJWT}} = response

    response = await request(newServer)
      .delete('/books/' + bookId)
      .set('X-Access-Token', userJWT)

    expect(response.status).toBe(401)
  })
})

describe('GET /books/overdue', () => {
  it('returns overdue books', async () => {
    let response = await request(newServer)
      .post('/tokens')
      .send({email: 'librarian@library.com', password: 'password'})

    const {body: {jwt}} = response

    response = await request(newServer)
      .get('/books/overdue')
      .set('X-Access-Token', jwt)

    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual([])

    // TODO: add overdue books for test
  })

  it('handles invalid auth', async () => {
    let response = await request(newServer)
      .get('/books/overdue')
      .set('X-Access-Token', '')

    expect(response.status).toBe(401)
  })

  it('handles unauthorized users', async () => {
    let response = await request(newServer)
      .post('/tokens')
      .send({email: 'user1@library.com', password: 'password'})

    const {body: {jwt: userJWT}} = response

    response = await request(newServer)
      .get('/books/overdue')
      .set('X-Access-Token', userJWT)

    expect(response.status).toBe(401)
  })
})

describe('POST /books/:isbn/checkout', () => {
  it('checks out a book', async () => {
    let response = await request(newServer)
      .post('/tokens')
      .send({email: 'librarian@library.com', password: 'password'})

    const {body: {jwt}} = response

    response = await request(newServer)
      .post('/books')
      .set('X-Access-Token', jwt)
      .send({title: 'Good Read', isbn: '9780316707046'})

    response = await request(newServer)
      .post('/books/9780316707046/checkout')
      .set('X-Access-Token', jwt)

    expect(response.status).toBe(200)
    expect(response.body.title).toBe('Good Read')
    expect(response.body.isbn).toBe('9780316707046')
    expect(response.body.checkout_by).toBe(1)
    expect(response.body.checkout_at).toBeTruthy()
  })

  it('handles invalid auth', async () => {
    // TODO:
  })

  it('handles unauthorized users', async () => {
    // TODO:
  })
})

describe('DELETE /books/:isbn/checkout', () => {
  // TODO:
})

describe('GET /books/checkout', () => {
  // TODO:
})
