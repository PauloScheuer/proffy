import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('class_schedule', (table) => {
    table.increments('idClassSchedule').primary();
    table.integer('weekDayClassSchedule').notNullable();
    table.integer('fromClassSchedule').notNullable();
    table.integer('toClassSchedule').notNullable();
    table
      .integer('idClass')
      .references('idClass')
      .inTable('classes')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
}
export async function down(knex: Knex) {
  return knex.schema.dropTable('class_schedule');
}
