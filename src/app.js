import express from 'express'

const server = express();

server.get('/', (req, res) => res.send(`<h1>RODANDO!</h1>`));

server.listen(5000);