const { verifyToken } = require("../utils/helper");

exports.isAuth = (roles) =>(req, res, next) => {
    try {
        // Get token
        const token = req.headers.authorization.split(" ")[1];
            
        // Verify token
        const decoded = verifyToken(token);
        req.user = decoded.user;
        
        next();
    } catch(error) {
        return res.status(500).json({
            status: false,
            message: 'Failed to authenticate token !!',
        })
    }
}