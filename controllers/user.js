const User = require("../models/user");
const { validationResult } = require('express-validator');

exports.createContact = (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
            //error: errors.array()[0].param
        })
    }

    const user = new User(req.body);
    user.save((error, user) => {
        if(error){
            return res.status(400).json({
                error:"Not able to save"
            });
        }
    });
    res.json({
        name: user.name,
        lastname: user.lastname,
        email:user.email,
        id: user._id,
        phone: user.phone
    });   
};


exports.updateContact = (req, res) => {
     // Any things done here is already present in the DB we r just updating it.
     User.findByIdAndUpdate(
        // Id is the one from which we look the user and can be get by req.profile._id  
        // Id is coming from?
        // since, we request :userid middleware fire up and populate the field
        {_id: req.profile._id },
        { $set: req.body }, // things to be updated will be inside {set}
        { new: true, useFindAndModify: false}, // fixed parameters to used
        (err, user) => {
            if(err) {
                return res.status(400).json({
                    error:"Update unsuccessfull"
                });
            }
            user.createdAt=undefined;
            user.updatedAt=undefined;
            return res.json(user);
        }
    );
};



exports.getUserById = (req, res,next, id) => {
    // Bring user model here and we have lots of method to search into DB.
    // Whenever there is database callback it will return two things error or the object
    User.findById(id).exec((err, user) => {
        if(err){
            return res.status(400).json({
                error:"Error "
            });
        }
        if(!user){
            return res.status(400).json({
                error:"user not found "
            });
        }
        // Now, user is found so we want to store this user in request object can be called as profile
        // we store user in req.profile
        req.profile = user;
        next();
    });
};

exports.getUser = (req, res) => {
    // req.profile has all the info about the user and we don't want to show this to user
    // we are not changing anything in the database we are just hiding the info here
    req.profile.createdAt=undefined;
    req.profile.updatedAt=undefined;
    return res.json(req.profile);
};

exports.getAllUsers = (req, res) => {
    
    User.find().exec((err, users) => {
        if(err){
            return res.status(400).json({
                error:"Error "
            });
        }
        if(!users){
            return res.status(400).json({
                error:"user not found "
            });
        }

        res.json(users);
    });
};

exports.removeContact = (req, res) => {
    
    const user = req.profile;
    user.remove((err, user) => {
        if(err){
            return res.status(400).json({
                error:"Failed to delete"
            });
        }
        res.json({
            message: `${user.name} contact deleted successfully`
        });
    });
};