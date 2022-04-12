var jwt = require('jsonwebtoken');
const JWT_SECRET="sdfghjmnfdcfvbnmnbfb"
// var cookieParser = require('cookie-parser');
const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        // req.token=token;
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}
module.exports = fetchuser;
