const express = require('express');
const { v4: uuidv4 } = require('uuid');

const server = express();

server.use(express.json());

const customers = [];

server.post('/account', (request, response) => {
  const { name, cpf } = request.body;

  const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf);

  if (customerAlreadyExists) {
    return response.status(400).json({ error: 'Customer already exists' });
  }

  customers.push({
    name,
    cpf,
    id: uuidv4(),
    statement: [],
  });

  return response.status(201).send();
});

server.get('/statement/:cpf', (request, response) => {
  const { cpf } = request.params;

  const customer = customers.find((customer) => customer.cpf === cpf);

  return response.json(customer.statement);
});

server.listen(3030);
