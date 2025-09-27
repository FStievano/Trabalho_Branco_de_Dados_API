/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table('produtos', function(table) {
    table.integer('estoque').notNullable();  // Adicionando a coluna 'estoque'
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('produtos', function(table) {
    table.dropColumn('estoque');  // Removendo a coluna 'estoque' se precisar fazer rollback
  });
};
