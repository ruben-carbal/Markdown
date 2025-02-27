const express = require('express');
const sharejs = require('share');
require('redis');

const app = express();

// Cambiar view engine a ejs
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('pad');
});

app.get('/(:id)', (req, res) => {
    res.render('pad');
});

// sharejs
const options = {
    db: { type: 'redis' },
}

sharejs.server.attach(app, options);

const port = process.env.PORT || 8000;
app.listen(port);
