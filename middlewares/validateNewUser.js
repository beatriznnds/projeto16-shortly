import connection from "../database.js";
import newUserSchema from "../schemas/newUserSchema.js";

export async function validateNewUser (req, res, next) {
    const { name, email, password, confirmPassword } = req.body;
    const { error } = newUserSchema.validate({ name, email, password, confirmPassword });
    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }
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
