const router = require('express').Router();
const productController = require('../controllers/product.controller');
const upload = require('../middlewares/multer');
const isAuth = require('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');

router.post('/', upload.single('foto'), productController.addProduct);
router.get('/',isAuth,isAdmin, productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/update', upload.single('foto'), productController.updateProduct);
router.get('/delete/:id', productController.deleteProduct);
router.get('/categories/:filtro', productController.findByCategory);

module.exports = router;