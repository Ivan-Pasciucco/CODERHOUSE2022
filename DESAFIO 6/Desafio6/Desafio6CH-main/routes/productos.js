const express = require('express');
const router = express.Router();

const productos = [];

router.get('/productos', ( req , res ) => {
    res.render('pages/productos',{productos});
});

router.get('/:id', ( req , res ) => {
    if(isNaN(req.params.id)){
        res.json({'Mensaje error': 'Por favor ingrese un numero'});
    }else{
    // Esto es para que lo muestre con un formato y mas bonito, en lugar de todo en la misma linea
        const productoById = productos.findIndex(i => i.id == req.params.id);
        const productosStr = JSON.stringify(productos[productoById],null,2);
        res.type('json');
        productoById !== -1 ? res.send(productosStr) : res.json({'Mensaje error' : 'Producto no encontrado'});
    }
});

router.post('/', ( req , res ) => {
    let lastItem = productos.length - 1;
    lastItem = productos[lastItem];
    if(lastItem == undefined){
        req.body.id = 1;
        productos.push(req.body);
    }else{
        const id = lastItem.id + 1; 
        req.body.id = id;
        productos.push(req.body);
    }
    res.render('pages/index',{"mensaje":"Producto creado correctamente",productos});
});

router.put('/', ( req , res ) => {
    const index = productos.findIndex(i => i.id == req.body.id);
    if(index !== -1){
        productos[index] = req.body;
        res.json({
            'Mensaje' : 'Producto actualizado correctamente',
            producto : productos[index]
        });
    }else{
        res.json({'Mensaje error' : 'No se pudo actualizar, producto no encontrado'});
    }
    
});

router.delete('/:id', ( req , res ) => {
    if(isNaN(req.params.id)){
        res.json({'Mensaje error': 'Por favor ingrese un numero'})
    }else{
        const index = productos.findIndex(i => i.id == req.params.id);
        if(index !== -1){
            productos.splice(index,1);
            res.json({ 'Mensaje' : 'Producto eliminado correctamente' });
        }else{
            res.json({'Mensaje error' : 'No se pudo eliminar, producto no encontrado'});
        }
    }
});

module.exports = {
    router,
    productos
}