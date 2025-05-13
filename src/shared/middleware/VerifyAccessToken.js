const { decryptToken } = require("../utils/jwt.js");

async function VerifyAccessTokenMiddleWare(req, res, next) {
    try {

        let token = req.headers.authorization;
        token = token.replace("Bearer ", "");
        if (!token) throw new Error("ACCESS TOKEN NOT FOUND!")

        const data = await decryptToken(token);
        req.locals = data
        next();

    } catch (error) {
        res.status(500)
            .json({
                message: error.message, data: null
            });
    }
}

module.exports = {
    VerifyAccessTokenMiddleWare
}