var express = require('express');
var app = express();

const pug = require('pug');

app.use( express.static( __dirname + '/public' ) );

var camisetasList = [
    {color: 'Verde', name: 'Camisa 001'},
    {coloe: 'Naranja', name: 'Camisa 002'},
    {coloe: 'Negra', name: 'Camisa 003'},
];

app.get('/', function(req, res){
    res.render('index.pug', {
        title: 'Practica006 - Rutas Avanzadas',
        description: 'Pratica 006 - Express con Pug, Rutas avanzadas'
    });
});

app.get('/tienda.html', function(req, res){
    res.render('tienda.pug', {
        camisetas: camisetasList
    });
});

app.get('/tienda/comprar/:color', function(req, res){

    let datosCamisetaFound = camisetasList.filter(function(item){
        if (item.color == req.params.color) {
            console.log(item.color);
            return item;
        }
    });
    //console.log(datosCamisetaFound[0]);

    res.render('detalles.pug', {
        color: req.params.color,
        datos: datosCamisetaFound[0]
    });
});

app.use(function(req, res){
    let urlError = req.originalUrl;

    res.status(400);
    res.render('404.pug', { messageError: urlError})
});

app.listen(3000, function(){
    console.log('Escuchando http en el puerto 3000');
});