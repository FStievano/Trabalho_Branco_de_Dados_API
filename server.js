require('dotenv').config();
const Fastify = require('fastify');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig.development);

const fastify = Fastify({
  logger: true
});

// Função padrão para respostas
function sendResponse(reply, statusCode, message, data = null, error = false) {
  return reply.status(statusCode).send({
    message,
    data,
    error
  });
}

// Rotas

// Rotas Marcas

// GET /marcas - lista todas as marcas
fastify.get('/marcas', async (request, reply) => {
  try {
    const marcas = await knex('marcas').select('*');
    return sendResponse(reply, 200, 'Marcas listadas com sucesso', marcas);
  } catch (err) {
    return sendResponse(reply, 500, 'Erro ao listar marcas', null, true);
  }
});

// GET /marcas/:id - lista marca por id
fastify.get('/marcas/:id', async (request, reply) => {
  const { id } = request.params;
  try {
    const marca = await knex('marcas').where({ id }).first();
    if (!marca) {
      return sendResponse(reply, 404, 'Marca não encontrada', null, true);
    }
    return sendResponse(reply, 200, 'Marca encontrada', marca);
  } catch (err) {
    return sendResponse(reply, 500, 'Erro ao buscar marca', null, true);
  }
});

// DELETE /marcas/:id - remove marca
fastify.delete('/marcas/:id', async (request, reply) => {
  const { id } = request.params;
  try {
    const deleted = await knex('marcas').where({ id }).del();
    if (!deleted) {
      return sendResponse(reply, 404, 'Marca não encontrada para exclusão', null, true);
    }
    return sendResponse(reply, 200, 'Marca excluída com sucesso');
  } catch (err) {
    return sendResponse(reply, 500, 'Erro ao excluir marca', null, true);
  }
});

// Rotas Produtos

// GET /produtos - lista todos os produtos
fastify.get('/produtos', async (request, reply) => {
  try {
    const produtos = await knex('produtos').select('*');
    return sendResponse(reply, 200, 'Produtos listados com sucesso', produtos);
  } catch (err) {
    return sendResponse(reply, 500, 'Erro ao listar produtos', null, true);
  }
});

// GET /produtos/:id - lista produto por id
fastify.get('/produtos/:id', async (request, reply) => {
  const { id } = request.params;
  try {
    const produto = await knex('produtos').where({ id }).first();
    if (!produto) {
      return sendResponse(reply, 404, 'Produto não encontrado', null, true);
    }
    return sendResponse(reply, 200, 'Produto encontrado', produto);
  } catch (err) {
    return sendResponse(reply, 500, 'Erro ao buscar produto', null, true);
  }
});

// POST /produtos - cria um novo produto
fastify.post('/produtos', async (request, reply) => {
  const { nome, preco, marca_id } = request.body;
  if (!nome || !preco || !marca_id) {
    return sendResponse(reply, 400, 'Campos nome, preco e marca_id são obrigatórios', null, true);
  }
  try {
    const [id] = await knex('produtos').insert({ nome, preco, marca_id });
    const novoProduto = await knex('produtos').where({ id }).first();
    return sendResponse(reply, 201, 'Produto criado com sucesso', novoProduto);
  } catch (err) {
    return sendResponse(reply, 500, 'Erro ao criar produto', null, true);
  }
});

// Rotas Clientes

// GET /clientes - lista todos os clientes
fastify.get('/clientes', async (request, reply) => {
  try {
    const clientes = await knex('clientes').select('*');
    return sendResponse(reply, 200, 'Clientes listados com sucesso', clientes);
  } catch (err) {
    return sendResponse(reply, 500, 'Erro ao listar clientes', null, true);
  }
});

// GET /clientes/:id - lista cliente por id
fastify.get('/clientes/:id', async (request, reply) => {
  const { id } = request.params;
  try {
    const cliente = await knex('clientes').where({ id }).first();
    if (!cliente) {
      return sendResponse(reply, 404, 'Cliente não encontrado', null, true);
    }
    return sendResponse(reply, 200, 'Cliente encontrado', cliente);
  } catch (err) {
    return sendResponse(reply, 500, 'Erro ao buscar cliente', null, true);
  }
});

// POST /clientes - cria um novo cliente
fastify.post('/clientes', async (request, reply) => {
  const { nome, email, cidade } = request.body;
  if (!nome || !email || !cidade) {
    return sendResponse(reply, 400, 'Campos nome, email e cidade são obrigatórios', null, true);
  }
  try {
    const [id] = await knex('clientes').insert({ nome, email, cidade });
    const novoCliente = await knex('clientes').where({ id }).first();
    return sendResponse(reply, 201, 'Cliente criado com sucesso', novoCliente);
  } catch (err) {
    return sendResponse(reply, 500, 'Erro ao criar cliente', null, true);
  }
});

// Rotas Pedidos

// GET /pedidos - lista todos os pedidos com itens
fastify.get('/pedidos', async (request, reply) => {
  try {
    const pedidos = await knex('pedidos').select('*');

    // Para cada pedido, buscar os itens relacionados
    const pedidosComItens = await Promise.all(pedidos.map(async pedido => {
      const itens = await knex('itens_pedidos')
        .join('produtos', 'itens_pedidos.produto_id', 'produtos.id')
        .select('itens_pedidos.*', 'produtos.nome as produto_nome', 'produtos.preco as produto_preco')
        .where('pedido_id', pedido.id);

      return { ...pedido, itens };
    }));

    return sendResponse(reply, 200, 'Pedidos listados com sucesso', pedidosComItens);
  } catch (err) {
    return sendResponse(reply, 500, 'Erro ao listar pedidos', null, true);
  }
});

// GET /pedidos/:id - pedido por id com itens
fastify.get('/pedidos/:id', async (request, reply) => {
  const { id } = request.params;
  try {
    const pedido = await knex('pedidos').where({ id }).first();
    if (!pedido) {
      return sendResponse(reply, 404, 'Pedido não encontrado', null, true);
    }

    const itens = await knex('itens_pedidos')
      .join('produtos', 'itens_pedidos.produto_id', 'produtos.id')
      .select('itens_pedidos.*', 'produtos.nome as produto_nome', 'produtos.preco as produto_preco')
      .where('pedido_id', id);

    return sendResponse(reply, 200, 'Pedido encontrado', { ...pedido, itens });
  } catch (err) {
    return sendResponse(reply, 500, 'Erro ao buscar pedido', null, true);
  }
});

// GET /pedidos/cidade/:cidade - pedidos por cidade com itens
fastify.get('/pedidos/cidade/:cidade', async (request, reply) => {
  const { cidade } = request.params;
  try {
    const pedidos = await knex('pedidos').where({ cidade }).select('*');

    const pedidosComItens = await Promise.all(pedidos.map(async pedido => {
      const itens = await knex('itens_pedidos')
        .join('produtos', 'itens_pedidos.produto_id', 'produtos.id')
        .select('itens_pedidos.*', 'produtos.nome as produto_nome', 'produtos.preco as produto_preco')
        .where('pedido_id', pedido.id);

      return { ...pedido, itens };
    }));

    return sendResponse(reply, 200, `Pedidos da cidade ${cidade} listados com sucesso`, pedidosComItens);
  } catch (err) {
    return sendResponse(reply, 500, 'Erro ao listar pedidos por cidade', null, true);
  }
});

// POST /pedidos - cria um novo pedido e seus itens
fastify.post('/pedidos', async (request, reply) => {
  const { cliente_id, cidade, itens } = request.body;

  if (!cliente_id || !cidade || !Array.isArray(itens) || itens.length === 0) {
    return sendResponse(reply, 400, 'Campos cliente_id, cidade e itens (array) são obrigatórios', null, true);
  }

  try {
    // Criar pedido
    const [pedido_id] = await knex('pedidos').insert({ cliente_id, cidade });

    // Inserir itens do pedido
    const itensParaInserir = itens.map(item => ({
      pedido_id,
      produto_id: item.produto_id,
      quantidade: item.quantidade
    }));

    await knex('itens_pedidos').insert(itensParaInserir);

    // Retornar pedido com itens
    const pedido = await knex('pedidos').where({ id: pedido_id }).first();
    const itensInseridos = await knex('itens_pedidos')
      .join('produtos', 'itens_pedidos.produto_id', 'produtos.id')
      .select('itens_pedidos.*', 'produtos.nome as produto_nome', 'produtos.preco as produto_preco')
      .where('pedido_id', pedido_id);

    return sendResponse(reply, 201, 'Pedido criado com sucesso', { ...pedido, itens: itensInseridos });
  } catch (err) {
    return sendResponse(reply, 500, 'Erro ao criar pedido', null, true);
  }
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('API rodando em http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
