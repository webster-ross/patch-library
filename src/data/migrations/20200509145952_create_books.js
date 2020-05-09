export async function up(knex) {
  await knex.schema.createTable('books', table => {
    table.increments('id').unsigned().primary()
    table.text('title').notNull()
    table.text('isbn').notNull().index()
    table.integer('added_by').unsigned().notNull()
    table.foreign('added_by').references('users.id')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.integer('checkout_by').unsigned()
    table.foreign('checkout_by').references('users.id')
    table.timestamp('checkout_at')
  }).raw(`alter table books add constraint valid_checkout
          check ((checkout_at is not null and checkout_by is not null)
          or (checkout_at is null and checkout_by is null))`)
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('books')
}
