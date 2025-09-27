exports.up = function(knex) {
  return knex.schema.createTable('produtos', (table) => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.decimal('preco', 10, 2).notNullable();
    table.integer('marca_id').unsigned().notNullable()
      .references('id').inTable('marcas')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('produtos');
};
