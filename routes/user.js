import { Router } from "express";

import {auth } from '../middlewares/auth.js'; 
import { connect_database } from "../config.js";
import User from '../models/user.js'; 


const router = Router(); 

router.get('/', (req, res) => {
    return res.json({
        welcomeMessage : 'This is the basic user actions route page.',  
    }); 
})

router.get('/profile', auth ,  async(req, res) => {
    try {
        connect_database(); // connect the database
        const {email} = req.userData; 
        const existingUser = await User.findOne({email})
        // console.log({existingUser_ : existingUser}); 

        if(!existingUser) return res.json({
            success : false, 
            msg : 'No such user found'
        })

        return res.status(200).json({
            success : true, 
            msg : 'Success', 
            user : existingUser
        })

    } catch (error) {
        console.log({error , message : error.message}); 
        return res.json({
            success : false, 
            msg : 'Error fetching the profile details.'
        })
    }
})



router.get('/:id', async(req, res) => {
    try {
        const existingUser = await User.findOne({_id : req.params.id}); 
        if(!existingUser) return res.json({
            success : false, 
            msg : 'No such user found'
        })

        return res.status(200).json({
            success : true, 
            msg : 'Success', 
            user : existingUser
        })

    } catch (error) {
        console.log(error.message, {error}); 
        return res.json({
            success : false, 
            msg : 'Error fetching the profile details.'
        })
    }
})


export default router; 