import jwt from "jsonwebtoken";

export const VeryfyToken = (req, res, next)=>{
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
        return res.status(403).json({ message : "invalid or expired token" })
    }
}