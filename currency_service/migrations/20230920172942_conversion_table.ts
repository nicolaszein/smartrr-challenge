import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('conversion', function (table) {
    table.increments('id').primary()
    table.string('from', 255).notNullable()
    table.string('to', 255).notNullable()
    table.decimal('rate', 10, 4).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('conversion')
}
