const express = require('express');
const cors = require('cors');

const routerFilme = require('./route/routesFilme');
const routesGenero = require('./route/routesGenero');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', routerFilme);
app.use('/', routesGenero);

app.listen(5000, ()=>{
    console.log('SERVIDOR RODANDO EM - http://localhost:5000');
});