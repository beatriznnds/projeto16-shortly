import connection from "../database.js";

export async function validateShortUrl (req, res, next) {
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
}