import Router from 'express'; 
import jwt from 'jsonwebtoken'; 
import { connect_database, values } from '../config.js';
import crypto from 'crypto'; 
import User from '../models/user.js'; 
import { exit } from 'process';

const router = Router(); 

router.get('/', (req, res) => {
    res.send('This is from auth'); 
});

// to get the hash of some text, eg. password. 
const get_hash = (text) => {
    return crypto.createHash('md5').update(text).digest('hex'); 
}


const createToken = async (id, email) => {
    return jwt.sign({ id , email}, values.jwt_string, {
        expiresIn: values.time_out
    })
}



router.post('/register', async(req,res) => {

    try {
        connect_database(); 

        const {
            name, email, password, phone, gender, age, 
            address : {street, city, state, postalCode}
        } = req.body; 

        const user = await User.findOne({email}); 
        // if the user already exists, return an error 
        if(user) return res.status(400).json({
            success : false, 
            msg : 'The user already exists'
        }); 

        console.log({password}, 'Hash', get_hash(password)); 
        // create a new user 
        const newUser = new User({
            name, email, password : get_hash(password), 
            age, gender, phone, 
            address : {
                street, city, state, postalCode
            }
        }); 
        
        // register the new user 
        const savedUser = await newUser.save(); 

        if(!savedUser) throw error('There was an error registering you.'); 

        return res.status(200).json({
            success : true, 
            user : savedUser, 
            msg : 'Registration successful!', 
        }); 

    } catch (error) {
        console.log({'Message' : error.message, error});

        return res.status(500).json({
            success : false, 
            msg : 'There was an error registering you!'
        }); 
    }
}); 


router.post("/login", async(req, res) => {
    try {
        connect_database();

        const {email, password } = req.body; 
        console.log({email, password}); 

        const existingUser = await User.findOne({email}); 
        // check if the user exists 
        if(!existingUser) return res.json({
            success : false, 
            msg : 'No registered user with this email, Please try registering!'
        }); 

        console.log({existingUser})

        // verify the password 
        if(get_hash(password) === existingUser.password){
            const token = await createToken(existingUser._id, existingUser.email); 
            console.log('Cookie set', token); 
            // set the cookie so that user can stay logged in
            res.cookie('authCookie', token, {
                withCredentials : true, 
                httpOnly : true, 
                maxAge : values.time_out, 
                secure : false, 
            }); 

            return res.status(200).json({
                success : true , 
                msg : 'Successfully logged in!', 
                user : existingUser
            })
        }
        else return res.json({
            success : false, 
            msg : 'Incorrect credentials, try again!'
        }); 
    

    } catch (error) {
        console.log({'Message' : error.message, error});

        return res.status(500).json({
            success : false, 
            msg : 'There was an error logging you in!'
        }); 
    }
}); 






export default router; 