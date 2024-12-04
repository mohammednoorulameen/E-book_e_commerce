import jwt, { decode } from "jsonwebtoken";

export const VerifyToken = (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "No access token" })
    }
    try {
        const decode = jwt.verify(token,process.env.ACCESS_TOKEN)
        req.userId = decode.userId;
        next()
    } catch (error) {
        console.log('error', error)
        return res.status(401).json({ message : "invalid or expired token" })
    }
}


export const  AdminVerifyToken = (req,res, next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: "Access Token required" })
    }
    try {
        const decode = jwt.verify(token,process.env.ACCESS_TOKEN);
        req.userId = decode.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message : "invalid or expired token" })
    }
}
