import urlSchema from "../schemas/urlSchema.js";
import connection from "../database.js";

export async function validateNewUrl (req, res, next) {
    const { url } = req.body;
    const { authorization } = req.headers;
    const { error } = urlSchema.validate({ url });
    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }
    const token = authorization?.replace('Bearer', '').trim();
    try {
        const { rows: validToken } = await connection.query(`SELECT * FROM sessions WHERE token = $1`, [token]);
        if (validToken.length === 0) {
            return res.sendStatus(401);
        }
        res.locals.token = validToken;
    } catch (e) {
        res.sendStatus(500);
    }
    next();
}