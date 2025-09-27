exports.seed = async function(knex) {

  await knex('produtos').del();

  await knex('produtos').insert([
    // Produtos da marca 1 (iPhone)
    { marca_id: 1, nome: 'iPhone 15 Pro Max', preco: 9999, estoque: 160 },
    { marca_id: 1, nome: 'iPhone 15 Pro', preco: 8599, estoque: 200 },
    { marca_id: 1, nome: 'iPhone 15', preco: 7299, estoque: 300 },
    { marca_id: 1, nome: 'iPhone SE', preco: 4599, estoque: 100 },

    // Produtos da marca 2 (Samsung)
    { marca_id: 2, nome: 'Samsung Galaxy S23 Ultra', preco: 7599, estoque: 180 },
    { marca_id: 2, nome: 'Samsung Galaxy S23', preco: 5999, estoque: 250 },
    { marca_id: 2, nome: 'Samsung Galaxy A54', preco: 2199, estoque: 400 },
    { marca_id: 2, nome: 'Samsung Galaxy Z Fold 5', preco: 12999, estoque: 50 },
    { marca_id: 2, nome: 'Samsung Galaxy Z Flip 5', preco: 7999, estoque: 80 },

    // Produtos da marca 3 (Xiaomi)
    { marca_id: 3, nome: 'Xiaomi 13 Pro', preco: 6599, estoque: 120 },
    { marca_id: 3, nome: 'Xiaomi 13', preco: 5899, estoque: 150 },
    { marca_id: 3, nome: 'Xiaomi Redmi Note 12 Pro', preco: 2299, estoque: 350 },
    { marca_id: 3, nome: 'Xiaomi Poco F5 Pro', preco: 3999, estoque: 200 },
    { marca_id: 3, nome: 'Xiaomi Redmi 12', preco: 1299, estoque: 500 },

    // Produtos da marca 4 (Huawei)
    { marca_id: 4, nome: 'Huawei P60 Pro', preco: 8299, estoque: 90 },
    { marca_id: 4, nome: 'Huawei Nova 11 Pro', preco: 4999, estoque: 110 },
    { marca_id: 4, nome: 'Huawei Mate X3', preco: 14999, estoque: 40 },
    { marca_id: 4, nome: 'Huawei Pura 70 Ultra', preco: 11999, estoque: 60 },

    // Produtos adicionais
    { marca_id: 2, nome: 'Samsung Galaxy S24', preco: 6899, estoque: 220 },
    { marca_id: 3, nome: 'Xiaomi 14 Ultra', preco: 9599, estoque: 75 },
    { marca_id: 3, nome: 'Xiaomi 10 Ultra', preco: 9599, estoque: 0 }
  ]);
};
