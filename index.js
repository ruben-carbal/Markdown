const express = require('express');
const sharejs = require('share');
let redisClient;

require('redis');

const app = express();

// Cambiar view engine a ejs
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('pad');
});

app.get('/:id', (req, res) => {
    res.render('pad');
});

console.log(process.env.REDISTOGO_URL);
if (process.env.REDISTOGO_URL) {
    const rtg = new URL(process.env.REDISTOGO_URL);
    redisClient = require('redis').createClient({
        url: `redis://${rtg.username}:${rtg.password}@${rtg.hostname}:${rtg.port}`
    });
} else {
    redisClient = require('redis').createClient();
}

// sharejs
const options = {
    db: { type: 'redis', client: redisClient },
}

sharejs.server.attach(app, options);

const port = process.env.PORT || 8000;
app.listen(port);
