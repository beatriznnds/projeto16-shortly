import connection from "../database.js";
import signInSchema from "../schemas/signInSchema.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';


export async function validateSignIn (req, res, next) {
    const { email, password } = req.body;
    const { error } = signInSchema.validate({ email, password });
    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }
    try {
        const { rows: validUser } = await connection.query(`SELECT * FROM users WHERE email = 1`, [email]);
        const checkPassword = bcrypt.compareSync(password, validUser.password);
        if (!validUser || !checkPassword) {
            return res.sendStatus(401);
        }
    } catch (e) {
        return res.sendStatus(500);
    }
    next();
}