
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

export const authenticateToken = (request, response, next) => {

    const authheaders = request.headers['authorization']
    const token = authheaders && authheaders.split(' ')[1];

    if (token == null) {
        return response.status(401).json({ message: "token is missing" })
    }

    jwt.verify(token, process.env.ACCESS_SECRET_KEY , (error ,user)=>{
        if(error){
            return response.status(403).json({ message: "invalid token" })

        }
        request.user = user;
        next()

    })


}