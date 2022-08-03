import connection from "../database.js";
import bcrypt from "bcrypt";
import { v4 as uuid} from 'uuid';

export async function signUp (req, res) {
    const { name, email, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
    try {
        await connection.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [name, email, passwordHash]);
        res.sendStatus(201);
    } catch (e) {
        res.sendStatus(500);
    }
};

export async function signIn (req, res) {
    const { email, password } = req.body;
    const validUser = await connection.query(`SELECT * FROM users WHERE email = $1`, [email]);
    const checkPassword = bcrypt.compareSync(password, validUser.rows[0].password);
    if (validUser.rowCount === 0 || !checkPassword) {
        res.locals.user = validUser;
        return res.sendStatus(401);
    }
    try {
        const token = uuid();
        const id = validUser.rows[0].id;
        await connection.query(`INSERT INTO sessions (token, "userId") VALUES ($1, $2)`, [token, id]);
        res.status(200).send(token);
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }

}