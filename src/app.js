import express from 'express'
import cors from 'cors'

const server = express();
server.use(express.json());
server.use(cors());

let users = [];
const tweets = [];

server.post('/sign-up', (req, res) => {
    
    if(!req.body.username || !req.body.avatar){
        res.status(400).send('Todos os campos são obrigatórios!');
        return;
    }
    users.push({...req.body});
    res.send('OK');
});

server.get('/tweets', (req, res) => {
    while(tweets.length > 10){
        tweets.shift();
    }
    res.send(tweets);
});

server.post('/tweets', (req, res) => {
    const avatar = users.find(value => value.username === req.body.username);
    tweets.push({...req.body, avatar: avatar.avatar});
    res.send('OK');
});

server.listen(5000, () => console.log('Listening on port 5000'));