exports.up = function(knex) {
  return knex.schema.createTable('marcas', (table) => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('site');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('marcas');
};
