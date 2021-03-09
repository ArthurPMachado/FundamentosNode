const express = require('express');

const server = express();

server.use(express.json());

server.get('/courses', (request, response) => {
  const { query } = request;

  console.log(query);

  return response.json([
    'Curso 1',
    'Curso 2',
    'Curso 3',
  ]);
});

server.post('/courses', (request, response) => {
  const { body } = request;

  console.log(body);

  return response.json([
    'Curso 1',
    'Curso 2',
    'Curso 3',
    'Curso 4',
  ]);
});

server.put('/courses/:id', (request, response) => {
  const { params } = request;

  console.log(params);

  return response.json([
    'Curso 99',
    'Curso 2',
    'Curso 3',
    'Curso 4',
  ]);
});

server.patch('/courses/:id', (request, response) => response.json([
  'Curso 99',
  'Curso 02',
  'Curso 3',
  'Curso 4',
]));

server.delete('/courses/:id', (request, response) => response.json([
  'Curso 99',
  'Curso 02',
  'Curso 4',
]));

server.listen(3030);
