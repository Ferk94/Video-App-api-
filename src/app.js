const express = require('express');
const cors = require('cors');
const morgan  = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes/index');

const server = express();

server.use(bodyParser.urlencoded({extended: true, limit: "50mb"}));
server.use(bodyParser.json({limit: "50mb"}));
server.use(express.json());
server.use(cors());
server.use(morgan('dev'));
server.use(cookieParser());
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
})

server.use('/', routes)

server.use((err, req, res, next) => {
    //eslint-disable-line no-unused-vars
    const status = err.status || 500
    const message = err.message || err;
    console.error(err);
    res.status(status).json(message);
});


module.exports = server;
