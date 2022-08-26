import express from 'express'
import cors from 'cors'

const server = express();
server.use(express.json());
server.use(cors());

let users = {};
const tweets = [];

server.post('/sign-up', (req, res) => {
    users = req.body;
    res.send('OK');
});

server.get('/tweets', (req, res) => {
    while(tweets.length > 10){
        tweets.shift();
    }
    res.send(tweets);
});

server.post('/tweets', (req, res) => {
    tweets.push({...req.body, avatar: users.avatar});
    res.send('OK');
});

server.listen(5000, () => console.log('Listening on port 5000'));