import jwt from 'jsonwebtoken'; 
import { values , connect_database } from '../config.js'; 

export const auth = async (req, res, next) => { 
    
    try {
        connect_database(); 

        const token = req.cookies.authCookie; 
        // console.log({ token }); 
        if (!token) return res.status(403).json({
            success: false,
            error: "You don't have enough permissions to access this page."
        })
        
        const result = await jwt.verify(token, values.jwt_string); 
        if (!result) return res.status(403).json({
            success: false,
            error: "You don't have enough permissions to access this page."
        })

        // console.log({result})

        req.token = token; 
        req.userData = {id : result.id, email : result.email}; 
        next(); 
    } catch (error) {
        console.log(error.message, { error }); 
        return res.status(500).json({
            success: false,
            error: error.message, 
        });
    }
};