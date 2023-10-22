const express = require('express');
const router = express.Router();
const Post = require('../Model/Post');
const User = require('../Model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLayout = '../views/layout/admin'
/**
 * GET/
 * Admin - Login Page
 */


router.get('/admin', async (req, res) =>{

    try{ 
        const locals ={
            title:"Admin",
            description: "Simple blog using nodejs, mongodb and ejs"
        }
        res.render('admin/index', {locals, layout: adminLayout});

    }catch(error){
        console.log('Error getting data') 
    }
});

/**
 * POST/
 * Admin - Check Login
 */


 router.post('/admin', async (req, res) =>{

    try{ 
        
        const {username, password} = req.body;

        if(req.body.username === 'admin' && req.body.password === 'password')
        {
            res.send('You are logged in.')
        }
        else{
            res.send('Wrong username or password');
        }


        console.log(req.body);
        res.redirect('/admin');

        // res.render('admin/index', {locals, layout: adminLayout});

    }catch(error){
        console.log('Error getting data') 
    }
});

/**
 * POST/
 * Admin - Register
 */

router.post('/register', async (req, res) =>{

    try{

        const {username, password} = req.body;
        const hashPassword = await bcrypt.hash(password, 10);

        try{
            const user = await User.create({ username, password: hashPassword});
            res.status(201).json({
                message: 'User Created', user
            });
        }catch(error){
            if(error.code == 11000){
                res.status(409).json({message: 'User already in use'});
            }
            res.status(500).json({message:'Internal server error'});
        }

    }catch(error){
        console.log(error);
    }
});






module.exports = router;