const express = require('express');
const { v4: uuidv4 } = require('uuid');

const server = express();

server.use(express.json());

const customers = [];

server.post('/account', (request, response) => {
  const { name, cpf } = request.body;
  const id = uuidv4();

  customers.push({
    name,
    cpf,
    id,
    statement: [],
  });

  return response.status(201).send();
});

server.listen(3030);
