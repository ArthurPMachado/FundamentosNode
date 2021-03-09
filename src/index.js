const express = require('express');
const { v4: uuidv4 } = require('uuid');

const server = express();

server.use(express.json());

const customers = [];

function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers;

  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return response.status(404).json({ error: 'Customer not found' });
  }

  request.customer = customer;

  return next();
}

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

server.get('/statement', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;
  return response.json(customer.statement);
});

server.post('/deposit', verifyIfExistsAccountCPF, (request, response) => {
  const { description, amount } = request.body;

  const { customer } = request;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: 'credit',
  };

  customer.statement.push(statementOperation);

  return response.status(201).send();
});

server.listen(3030);
