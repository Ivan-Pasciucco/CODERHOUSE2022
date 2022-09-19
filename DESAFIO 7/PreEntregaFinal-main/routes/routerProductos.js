const express = require('express');
const router = express.Router();
const Productos = require('../js/productos');
const productos = new Productos();

const admin = true;

router.get('/', (req, res) => {
    (async () => {
        const data = await productos.listAll();
        res.send(data);
    })()
});

router.get('/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.send('Error: No se ingreso un numero');
    } else {
        (async () => {
            const data = await productos.listById(req.params.id);
            res.send(data);
        })();
    }
});
//
router.post('/', (req, res, next) => {
    if (admin === true) {
        next();
    } else {
        res.send('No tienes permisos para acceder a la ruta solicitada');
    }
},
    (req, res) => {
        (async () => {
            const resp = await productos.addProduct(req.body);
            res.send(resp);
        })()
    });

router.put('/', (req, res, next) => {
    if (admin === true) {
        next();
    } else {
        res.send('No tienes permisos para acceder a la ruta solicitada');
    }
},
    (req, res) => {
        (async () => {
            const resp = await productos.editProduct(req.params);
            res.send(resp);
        })()
    });

router.delete('/', (req, res, next) => {
    if (admin === true) {
        next();
    } else {
        res.send('No tienes permisos para acceder a la ruta solicitada');
    }
},
    (req, res) => {
        if (isNaN(req.params.id)) {
            res.send('Error: No se ingreso un numero');
        } else {
            (async () => {
                const resp = await productos.deleteProduct(req.params.id);
                res.send(resp);
            })();
        }
    });

module.exports = router;