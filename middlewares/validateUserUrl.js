import connection from "../database.js";

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
        const { rows: validUserUrl } = await connection.query(`
            SELECT urls."shortUrl", urls."userId"
            FROM urls 
            JOIN sessions
            ON urls."userId" = sessions."userId"
            WHERE sessions.token = $1
            AND urls."shortUrl" = $2`,
            [token, validId.shortUrl
        ]);
        if (validUserUrl.length === 0) {
            return res.sendStatus(401);
        };
    } catch (e) {
        return res.sendStatus(500);
    }
    next();
}