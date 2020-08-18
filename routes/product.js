const router = require('express').Router();
const {isSignedIn,isAuthenticated,isAdmin}=require('../controllers/auth');
const {getProductById,createProduct,getAllProduct,getProduct,photo,updateProduct,getAllUniqueCategories,deleteProduct}=require('../controllers/product');
const {getUserById}=require('../controllers/user');

router.param("userId",getUserById);
router.param("productId",getProductById);

//create route
router.post('/product/create/:userId',isSignedIn,isAuthenticated,isAdmin, createProduct);

//Read Route
router.get("/product/:productId",getProduct);
router.get("/product/photo/:productId",photo);
router.get("/products",getAllProduct);


//Delete Route
router.delete('/product/:productId/:userId',isSignedIn,isAuthenticated,isAdmin, deleteProduct);

//Update ROute
router.put('/product/:productId/:userId',isSignedIn,isAuthenticated,isAdmin, updateProduct);


//listing routes

router.get("/products/categories" ,getAllUniqueCategories);


module.exports=router;