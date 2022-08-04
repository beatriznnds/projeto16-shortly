import connection from "../database.js";

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
}