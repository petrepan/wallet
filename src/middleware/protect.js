const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

async function protect(req, res, next) {
    let token = req.headers.authorization.split(" ")[1];
    try {
        let verifyUser = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verifyUser.id)
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        res.json({
            status: "failed",
            message: "Please Login"
        })
    }
}

module.exports = protect