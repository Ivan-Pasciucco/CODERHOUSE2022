// Importaciones
const express = require('express')
const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')
const {router: productosRouter, productos} = require('./routes/productos')

// Inicializar express, http y socket.io
const app = express()
const httpserver = new HttpServer(app)
const io = new IOServer(httpserver)
const port = 8080

// middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set('view engine','ejs')
app.use(express.static("public"))
app.use('/',productosRouter)

// ruta principal
app.get('/',(req , res) => {
    res.render('pages/index',{"mensaje":"",productos})
})

// variable de persistencia del chat
const mensajes = []

// sockets
io.on('connection',(socket) => {

    //mensaje de usuario conectado
    console.log('Usuario conectado') 

    // socket para productos
    socket.on('guardar', data => {
        console.log(data)
        io.sockets.emit('historialGuardar',productos)
    })
    socket.emit('historialProductos',productos)

    //socket para chat
    socket.on('nuevoMensaje',data => {
        mensajes.push(data)
        io.sockets.emit('historialGlobal',mensajes)
    })
    socket.emit('historialChat',mensajes)
})

// server listen
httpserver.listen(port, () => {
    console.log(`Servidor corriendo en el puerto: ${port}`)
})