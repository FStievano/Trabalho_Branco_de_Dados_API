exports.up = function(knex) {
  return knex.schema.createTable('itens_pedidos', (table) => {
    table.increments('id').primary();
    table.integer('pedido_id').unsigned().notNullable()
      .references('id').inTable('pedidos')
      .onDelete('CASCADE');
    table.integer('produto_id').unsigned().notNullable()
      .references('id').inTable('produtos')
      .onDelete('CASCADE');
    table.integer('quantidade').unsigned().notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('itens_pedidos');
};
