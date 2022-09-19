const express = require('express');
const app = express();
const routerProductos = require('./routes/routerProductos');
const routerCarrito = require('./routes/routerCarrito');

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);

const server = app.listen(8080,() => {
    console.log('Servidor levantado');
});