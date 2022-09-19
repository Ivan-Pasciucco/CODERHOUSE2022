const express = require('express');
const router = express.Router();
const Carrito = require('../js/carrito');
const carrito = new Carrito();

router.post('/', (req, res) => {
    (async () => {
        const respuesta = await carrito.addCart();
        res.json(respuesta);
    })()
});

router.delete('/',(req, res) => {
    if(isNaN(req.params.id)){
        res.send('ERROR: Por favor ingrese un numero!!');
    }else{
        (async () => {
            const respuesta = await carrito.deleteCart(req.params.id);
            res.send(respuesta);
        })();
    }
});

router.get('/:id',(req, res) => {
    if(isNaN(req.params.id)){
        res.send('ERROR: Por favor ingrese un numero!!');
    }else{
        (async () => {
            const data = await carrito.getCart(req.params.id);
            res.send(data);
        })();
    }
});

router.post('/:idCart/:idProduct', (req, res) => {
    const idCart = parseInt(req.params.idCart);
    const idProduct = parseInt(req.params.idProduct);
    (async () => {
        const respuesta = await carrito.addProductCart(idCart,idProduct);
        res.send(respuesta);
    })()
});

router.delete('/:idCart/:idProduct', (req, res) => {
    const idCart = parseInt(req.params.idCart);
    const idProduct = parseInt(req.params.idProduct);
    (async () => {
        const respuesta = await carrito.deleteProductCart(idCart,idProduct);
        res.send(respuesta);
    })()
});

module.exports = router;