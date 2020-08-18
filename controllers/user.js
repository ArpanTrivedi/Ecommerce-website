const User=require('../modules/user');
const {Order}=require("../modules/order");
exports.getUserById = (req, res, next, id) => {
//   User.findById(id).exec((err, user) => {
//     if (err || !user) {
//       return res.status(400).json({
//         error: "No user was found in DB"
//       });
//     }
//     req.profile = user;
//     next();
//   });
  User.findById(id).exec()
  .then(user=>{
      if(!user){
        return res.status(400).json({
            error: "No user was found in DB"
          });
      }else{
            req.profile = user;
            next();
      }
  })
  .catch(err=>{
    return res.status(400).json({
        error: "No user was found in DB "+err
      });
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};
exports.updateUser=(req,res)=>{
  User
  .findByIdAndUpdate(
      {
          _id:req.profile._id
      },
      {
          $set:req.body
      },
      {
          new:true,useFindAndModify:false
      }
  )
  .exec()
  .then(user=>{
      user.salt=undefined;
      user.encry_password=undefined;
      res.status(200).json(user);
  })
  .catch(err=>res.status(403).json({error:err}));
};

exports.userPurchaseList = (req, res) => {
  console.log(req.profile.id+" "+req.profile._id);
  Order
    .find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec()
    .then(user=>res.status(200).json(user))
    .catch(err=>res.status(403).json({error:err}))
};

exports.pushOrderInPurchaseList=(req,res,next)=>{
  let purchase=[];
  req.body.order.products.forEach(product =>{
    purchase.push({
      _id:product._id,
      name:product.name,
      description:product.description,
      category:product.category,
      quantity:product.quantity,
      amount: req.body.order.amount,
      transaction_id:req.body.order.transaction_id
    })
  });
  //store in DB

  User
  .findOneAndUpdate(
    {_id:req.profile._id},{$push: {purchase: purchase}},
    {
      new:true
    }
  ).exec()
  .then(result=>{
    res.status(200).json(result);
    next();
  })
  .catch(err=>{
    res.status(403).json({error:err});
    next();
  }  
  );
}

