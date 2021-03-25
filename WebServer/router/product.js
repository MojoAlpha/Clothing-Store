const express = require('express')
const router = express.Router();

const {getProductById, createProduct, getProduct, photo,deleteProduct, updateProduct, getAllProducts, getAllUniqueCategories} = require('../controllers/product')
const {getUserById} = require('../controllers/user')
const {isAdmin,isAuthenticated,isSignedIn} = require('../controllers/auth')

router.param("userId", getUserById);
router.param("productId", getProductById)

//create product routes
router.post('/product/create/:userId',isSignedIn,isAuthenticated,isAdmin,createProduct)

//reading routes
router.get('/product/:productId', getProduct)
router.get('/product/photo/:productId',photo)

//delete routes
router.delete('/product/:productId/:userId', isSignedIn, isAuthenticated, isAdmin, deleteProduct)

//update route
router.put('/product/:productId/:userId', isSignedIn, isAuthenticated, isAdmin, updateProduct)

//listing routes
router.get('/products', getAllProducts)

router.get('/products/categories', getAllUniqueCategories)

module.exports = router;