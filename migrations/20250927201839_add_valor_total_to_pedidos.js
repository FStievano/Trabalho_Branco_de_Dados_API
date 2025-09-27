exports.up = function(knex) {
  return knex.schema.table('pedidos', (table) => {

    table.decimal('valor_total', 10, 2).notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now());  
  });
};

exports.down = function(knex) {
  return knex.schema.table('pedidos', (table) => {
    table.dropColumn('valor_total');
    table.dropColumn('created_at');
  });
};
