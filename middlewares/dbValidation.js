import connection from "../database.js";

export async function validateNewUser (req, res, next) {
    const { email } = req.body;
    try {
        const { rows: unvalidEmail } = await connection.query(`SELECT * FROM users WHERE email = $1`, [email])
        if (unvalidEmail.length !== 0) {
            return res.sendStatus(409);
        }
    } catch (e) {
        res.sendStatus(500);
    }
    next();
}

export async function validateShortUrlById (req, res, next) {
    const { id } = req.params;
    try {
        const { rows: validId } = await connection.query(`SELECT * FROM urls WHERE id = $1`, [id]);
        if (validId.length === 0 ) {
            return res.sendStatus(404);
        }
        res.locals = validId;
    } catch (e) {
        res.sendStatus(500);
    }
    next();
};

export async function validateShortUrl (req, res, next) {
    const { shortUrl } = req.params;
    try {
        const { rows: validShortUrl } = await connection.query(`SELECT * FROM urls WHERE "shortUrl" = $1`, [shortUrl]);
        if (validShortUrl.length === 0) {
            return res.sendStatus(404);
        }
    } catch (e) {
        return res.sendStatus(500);
    }
    next();
};

export async function validateUser (req, res, next) {
    const { authorization } = req.headers;
    const { userId } = req.params;
    try {
        const token = authorization?.replace('Bearer', '').trim();
        const { rows: validToken } = await connection.query(`SELECT * FROM sessions WHERE token = $1`, [token]);
        if (validToken.length === 0) {
            return res.sendStatus(401);
        };
        if (validToken.userId !== userId) {
            return res.sendStatus(404);
        }
        res.locals.userId = validToken[0].userId;
    } catch (e) {
        return res.sendStatus(500);
    }
    next();
};

export async function validateUserUrl (req, res, next) {
    const { id } = req.params;
    const { authorization } = req.headers;
    try {
        const token = authorization?.replace('Bearer', '').trim();
        const { rows: validToken } = await connection.query(`SELECT * FROM sessions WHERE token = $1`, [token]);
        if (validToken.length === 0) {
            return res.sendStatus(401);
        }
        const { rows: validId } = await connection.query(`SELECT * FROM urls WHERE id = $1`, [id]);
        if (validId.length === 0) {
            return res.sendStatus(404)
        };
        if (validToken.userId !== validId.userId) {
            return res.sendStatus(401)
        }
    } catch (e) {
        return res.sendStatus(500);
    }
    next();
};