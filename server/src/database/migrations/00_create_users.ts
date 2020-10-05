import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('idUser').primary();
    table.string('nameUser').notNullable();
    table.string('avatarUser').notNullable();
    table.integer('zapUser').notNullable();
    table.string('bioUser').notNullable();
  });
}
export async function down(knex: Knex) {
  return knex.schema.dropTable('users');
}
