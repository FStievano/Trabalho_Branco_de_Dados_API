exports.up = function(knex) {
  return knex.schema.createTable('clientes', (table) => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('email').notNullable().unique();
    table.string('cidade').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('clientes');
};
