const express = require('express');
const productosRouter = require('./routes/productos');

const app = express();
const port = 8080;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.set('view engine','ejs');

app.get('/',(req , res) => {
    res.render('pages/index',{"mensaje":""});
});

app.use('/productos',productosRouter);

const server = app.listen(port, () => {
    console.log(`Escuchando servidor en el puerto: ${server.address().port}`);
});
server.on('error', error => console.log(error));