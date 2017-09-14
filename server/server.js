
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const app = express();
const http = require('http').Server(app);

const port = process.env.PORT || 8080;
const environment = process.env.NODE_ENV;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/', express.static(path.resolve('dist')));

http.listen(port);
console.log(`Server listening on port ${port}`);
