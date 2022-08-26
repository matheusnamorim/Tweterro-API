import express from 'express'
import cors from 'cors'

const server = express();
server.use(express.json());
server.use(cors());

const users = [];

server.get('/sign-up', (req, res) => res.send(users));

server.post('/sign-up', (req, res) => {
    users.push({...req.body})

    res.send('DEU CERTO');
});

server.listen(5000, () => console.log('Listening on port 5000'));