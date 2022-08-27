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
    res.status(201).send('OK');
});

server.get('/tweets', (req, res) => {
    const { page } = req.query;

    if(page < 1){
        res.status(400).send('Informe uma página válida!');
        return;
    }

    const updateTweets  = [...tweets];
    updateTweets.reverse();
    const list = [];
    for(let i=(page*10)-10; i<page*10; i++){
        if(updateTweets[i]) list.push(updateTweets[i]);
    }
    res.send(list);
});

server.post('/tweets', (req, res) => {
    const { user } = req.headers;
    const { tweet } = req.body;
    if(!user || !tweet){
        res.status(400).send('Todos os campos são obrigatórios!');
        return;
    }
    const avatar = users.find(value => value.username === user);
    tweets.push({
        username: user,
        tweet, 
        avatar: avatar.avatar});
    res.status(201).send('OK');
});

server.get('/tweets/:username', (req, res) => {
    const { username } = req.params;
    if(!(tweets.find(value => value.username === username))){
        res.sendStatus(404);
        return;
    }
    const tweetsUser = tweets.filter(value => value.username === username);
    res.status(201).send(tweetsUser);
});

server.listen(5000, () => console.log('Listening on port 5000'));