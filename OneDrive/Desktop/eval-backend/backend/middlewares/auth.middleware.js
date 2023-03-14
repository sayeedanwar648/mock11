const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]

    if (req.path === '/signup' || req.path == '/login') {
        next()
    } else {
        if (!token) return res.send({ message: "You're not Authorized Person , Please Check again" })

        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            if (decoded) {
                req.userID = decoded.userID;
                next()
            } else {
                res.status(401).send({
                    message: "You're authorized Person, Please Check again"
                })
            }
        })
    }

}

module.exports = { authMiddleware }
