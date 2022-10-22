const jwt = require('jsonwebtoken')

const sign = (data) => {
    const token = jwt.sign({ ...data }, process.env.TOKEN_SECRET, { algorithm: 'HS256'})
    return token
}

const verify = (req, res, next) => {
    let token = req.headers.authorization;
    token = token?.split(" ")[1]
    if (token) {
        try {
            if (jwt.verify(token, process.env.TOKEN_SECRET)) {
                return next()
            } else {
                return res.status(401).send('Unauthorized Access')
            }
        } catch (JsonWebTokenError) {
            return res.status(401).send('Something went wrong!');
        }
    } else {
        return res.status(401).send('Unauthorized Access')
    }
}

module.exports = { sign, verify }