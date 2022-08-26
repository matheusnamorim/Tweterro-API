import express from 'express'
import cors from 'cors'

const server = express();
server.use(express.json());
server.use(cors());

const users = [];
const tweets = [];


server.post('/sign-up', (req, res) => {
    users.push({...req.body})
    res.send('OK');
});

server.get('/tweets', (req, res) => {
    res.send(tweets);
});

server.listen(5000, () => console.log('Listening on port 5000'));