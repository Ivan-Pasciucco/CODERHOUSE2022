const express = require("express");
const  productosRouter = require('./routes/productosRouter')

const app = express();
const PORT = 8080;

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(express.static(__dirname + '/public'))
app.use('/api/productos' , productosRouter)

const server = app.listen(PORT, () => {
    console.log("servidor levantado en el puerto: " + server.address().port);
  });

 server.on('error' , error => console.log(error))