import faker from 'faker'
import bcrypt from 'bcrypt'

export async function up(knex) {
  await knex.schema.createTable('users', table => {
    table.increments('id').unsigned().primary()
    table.text('email').notNull().unique()
    table.text('password').notNull()
    table.text('first_name').notNull()
    table.text('last_name').notNull()
    table.enu('role', ['librarian', 'user']).defaultTo('user')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })

  await knex('users').insert({
    email: 'librarian@library.com',
    password: await bcrypt.hash('password', 10),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    role: 'librarian'
  })

  await knex('users').insert({
    email: 'user1@library.com',
    password: await bcrypt.hash('password', 10),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName()
  })

  await knex('users').insert({
    email: 'user2@library.com',
    password: await bcrypt.hash('password', 10),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName()
  })

  await knex('users').insert({
    email: 'user3@library.com',
    password: await bcrypt.hash('password', 10),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName()
  })
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('users')
}
