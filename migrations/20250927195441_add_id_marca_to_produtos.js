/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table('produtos', function(table) {
    table.integer('id_marca').unsigned().references('id').inTable('marcas').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('produtos', function(table) {
    table.dropColumn('id_marca');
  });
};
