const router = require('express').Router();
const cartController = require('../controllers/cart.controller');

router.get('/verifyCar/:email', cartController.verifyCart);
router.get('/delCar/:email', cartController.delCart);
router.get('/listCar/:email', cartController.listCart);
router.get('/addProd/:email/:idProduct', cartController.addProdCart);
router.get('/delProd/:email/:id', cartController.delProdCart);
router.get('/finCar/:nombre/:email/', cartController.findCart);

module.exports = router;