const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const messages = require('./db/messages');

const app = express();

//adds logger to the app
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        message: 'full stack Message Board'
    });
});

app.get('/messages', (req, res) => {
    messages.getAllMessages().then((messages) => {
        res.json(messages);
    });
});

app.post('/messages', (req, res) => {
    console.log(req.body);
    messages.create(req.body).then((message) => {
        res.json(message);
    }).catch((error) => {
        res.status(500);
        res.json(error);
    });
});

//loose port connection to assist with port connecting
const port = process.env.PORT || 1234;
app.listen(port, ()=> {
    console.log(`listening on ${port}`);
});