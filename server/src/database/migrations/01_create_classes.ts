import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('classes', (table) => {
    table.increments('idClass').primary();
    table.string('subjectClass').notNullable();
    table.string('costClass').notNullable();
    table
      .integer('idUser')
      .references('idUser')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
}
export async function down(knex: Knex) {
  return knex.schema.dropTable('classes');
}
