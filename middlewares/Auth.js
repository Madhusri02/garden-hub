const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import user_details from '../modals-Schema/user.js'

const router = express.Router();

router.post('/register' , async(req , res) => {
    try{
        const {username , email , password } = req.body;
        const hashed_Password = await bcrypt.hash(password , 10);
        const user = new user_details({
            username,
            email,
            password : hashed_Password,
        });
        await user.save();

        res.status(201).json({
            message: 'User registered !'
        });

    }
    catch(er) {
        console.error(er);
        res.status(500).json({
            error : 'internal error !'+ er,
        });

    }
});

router.post('/logout' , (req, res) => {
    res.clearCookie('token').send('Loggged out')
} );

router.post('/login' , async (req , res) => {
    try{
        const {email , password } = req.body;
        const log = await user_details.findOne({email})
        if(!log){
            return res.status(401).json({
                message : "invalid login !"
            });
        }
        else{
            const check = await bcrypt.compare(password , log.password);
            if (!check){
                return res.status(401).json({
                    message : "invalid password",
                })
            }
        }

        const token = jwt.sign({userId: user._id} ,
            's'
        )
    }
    catch(er){
        res.status(500).json({
            error : 'server error'
        });
    }
    
});

module.exports = router ;