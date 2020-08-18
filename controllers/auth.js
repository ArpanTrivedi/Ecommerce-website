const User=require('../modules/user');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
exports.signout=(req,res)=>{
    res.clearCookie("token");
    res.status(200).json({
        message:"Sign out"
    });
};
exports.signup=(req,res)=>{
    
    const user=new User(req.body);
    user
    .save()
    .then(user=>{
        res.status(201).json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    })
    .catch(err=>{
        res.status(401).json({
            message:"User is not created",
            error:err
        });
    });
};


exports.signin=(req,res)=>{

    const {email,password}=req.body;
    User.findOne({email:email})
    .exec()
    .then(result=>{

        if(!result){
            return res.status(400).json({
                error:"User is not there"
            });
        }

        if(!result.authticate(password)){
            return res.status(401).json({
                error:"email and password do not match"
            });
        }
        const token=jwt.sign({
            id:result._id
        },process.env.SECRET);
        res.cookie("token",token,{
            expire:new Date()+2*365
        });
        const {_id, name, email, role} = result;
        return res.json({token, user: {_id, name, email, role} });
        //console.log("sign in");
    })
    .catch(err=>{
        if(err){
            console.log(err)
            return res.status(400).json({
                error:"cant sign you in some problem"+err
            });
        }
    });
    
};

exports.isSignedIn=expressJwt({
    secret:process.env.SECRET,
    userProperty:"auth"
});

exports.isAuthenticated = (req,res,next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth.id;
    //console.log(" "+req.profile+" "+" "+req.auth);
    //console.log(req.auth);
    //console.log(req.profile);
    if(!checker){
        return res.status(403).json({
            error:"ACCESS DENIED"
        });
    }
    next();

};

exports.isAdmin = (req,res,next) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            error:"You are not ADMIN, Access Denied"
        });
    };
    next();
    
};
