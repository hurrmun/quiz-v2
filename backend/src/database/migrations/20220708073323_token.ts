import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tokens', (table) => {
    table.string('token').primary();
    table.timestamp('expires_at', { useTz: true });
    table.timestamp('last_used_at', { useTz: true }).defaultTo(knex.fn.now());
    table.uuid('user_id').references('user_id').inTable('users');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tokens');
}
