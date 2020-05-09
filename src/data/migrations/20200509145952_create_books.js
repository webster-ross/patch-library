
export async function up(knex) {
  await knex.schema.createTable('books', table => {
    table.increments('id').unsigned().primary()
    table.text('title').notNull()
    table.text('isbn').notNull().index()
    table.integer('added_by').unsigned().notNull()
    table.foreign('added_by').references('users.id')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('books')
}
