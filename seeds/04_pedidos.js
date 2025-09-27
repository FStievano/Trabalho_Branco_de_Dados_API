
exports.seed = async function(knex) {

  await knex('pedidos').del();

  await knex('pedidos').insert([
    { id: 1, cliente_id: 1, data_pedido: '2025-09-17', cidade: 'São Paulo', valor_total: 11898 },
    { id: 2, cliente_id: 2, data_pedido: '2025-09-17', cidade: 'Rio de Janeiro', valor_total: 13598 },
    { id: 3, cliente_id: 3, data_pedido: '2025-09-17', cidade: 'Belo Horizonte', valor_total: 12498 },
    { id: 4, cliente_id: 4, data_pedido: '2025-09-17', cidade: 'Curitiba', valor_total: 5298 }
  ]);
};
