const Category=require("../modules/category");
const User = require("../modules/user");


exports.getCategoryById=(req,res,next,id)=>{
    Category.findById(id).exec((err,cate)=>{
        if(err){
            return res.status(400).json({
                error:"NOT FOUND IN DB"
            })
        }
        req.category=cate;
        next();
    });
};

exports.createCategory=(req,res)=>{
    console.log(req.body);
    const category=new Category(req.body);
    category
        .save()
        .then(category=>{
            res.status(200).json({
                message:"Category created",
                category:category
            });
        })
        .catch(err=>res.status(403).json({error:"category creating failed"+err}))
};
exports.getCategory=(req,res)=>{
    //
    return res.json(req.category);
};
exports.getAllCategory=(req,res)=>{
    //
    Category
    .find()
    .exec()
    .then(result=>res.status(200).json(result))
    .catch(err=>res.status(403).json({error:err}));
};
exports.updateCategory = (req, res) => {
    
    console.log(req.params);
    Category.findOneAndUpdate(
        {_id:req.params.categoryId},
        {
            $set:{name:req.body.name}
        },{new:true},
        (err,category)=>{
            if(err){
                return res.status(400).json({
                    error:"Category could not be updated"
                });
            }
            return res.status(200).json(category);
        }
    )

    // console.log("CATEGORY"+req.category);
    // const category = req.category;
    // category.name = req.body.name;

    // category.save( (err,updatedCategory) =>{
    //     if(err){
    //         return res.status(400).json({
                
    //         })
    //     }
    //     res.json(updatedCategory);
    // })   
};
exports.removeCategory=(req,res)=>{
   // let category = req.category;
    console.log(req.params);
    let category = req.category 
    const pid=req.params.categoryId;
    console.log(pid);
    Category.remove({_id:pid},(err,result)=>{
        if(err)
            return res.status(403).json({
                error:"Can't delete the category"
            });
        return res.status(200).json({
            message:"User is deleted",
            result:result
        })
    });

    // category.remove((err,category) =>{
    //     if(err) {
    //         return res.status(400).json({
    //             error : "failed to delete "
    //         })
    //     }
    //     res.status(200).json({
    //         message : `Successfully delete ${category}`
    //     });
    // });
}