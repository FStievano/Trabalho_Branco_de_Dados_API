exports.up = function(knex) {
  return knex.schema.createTable('pedidos', (table) => {
    table.increments('id').primary();
    table.integer('cliente_id').unsigned().notNullable()
      .references('id').inTable('clientes')
      .onDelete('CASCADE');
    table.timestamp('data_pedido').defaultTo(knex.fn.now());
    table.string('cidade').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('pedidos');
};
