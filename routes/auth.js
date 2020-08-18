const router = require('express').Router();
const {signout,signup,signin,isSignedIn}= require('../controllers/auth');
const { check, validationResult } = require('express-validator');

router.get('/signout', [
    check("name").isLength({min:3}).withMessage("name must be atleast 3 character"),
    check("email").isEmail().withMessage("it must be email"),
    check("password").isAlphanumeric().withMessage("Password must be alpha numeric")
],signout);
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/testroute',isSignedIn,(req,res)=>{
    res.status(200).json({
        auth:req.auth
    });
});

module.exports = router