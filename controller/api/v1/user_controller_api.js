const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

//create a user in the database if user is not found.
module.exports.signUp = function(req,res){
  
    if(req.body.password != req.body.confirmPassword)
    {
        return res.json(404,{
            success:false,
            error : 'Invalid Input'
        });
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err)
        {
            return res.json(500,{
                success:false,
                error : 'Internal Server Error'
            })
        }

        if(!user)
        {
            User.create(req.body,function(err){
                if(err)
                {
                    return res.json(500,{
                        success:false,
                        error : 'Internal Server Error'
                    });
                }
                return res.json(200,{
                    success:true,
                    message : 'Account is Created Successfully'
                });
            })

        }else{
            return res.json(404,{
                success:false,
                error : 'User is already exists'
            })
        }

    });
};
    
//create Session for already existed users.
module.exports.createSession = async function(req,res){

    try{
    
        let user = await User.findOne({email:req.body.email});
        
        if(!user || user.password != req.body.password){
            return res.json(422,{
                success:false,
                error : 'Invalid Username or Password'
            });
        }

        return res.json(200,{
            success:true,
            message : 'Successfully login . Please keep your token Safe',
            data : {
                user:{_id:user._id,name:user.name,email:user.email},
                token : jwt.sign(user.toJSON(),'financer',{expiresIn:1000 * 60 * 60})
            }
        });

    
    }catch(err){
        return res.json(500,{
            success:false,
            error : 'Internal Server Error'
        })
    }
}
