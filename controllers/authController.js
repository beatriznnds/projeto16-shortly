import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';
import { userRepository } from "../repositories/userRepository.js";

export async function signUp (req, res) {
    const { name, email, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
    try {
        await userRepository.addNewUser(name, email, passwordHash);
        res.sendStatus(201);
    } catch (e) {
        res.sendStatus(500);
    }
};

export async function signIn (req, res) {
    const { email, password } = req.body;    
    try {
        const validUser = await userRepository.searchUserByEmail(email);
        const userRows = validUser.rows[0];
        if (validUser.rowCount === 0 ) {
            return res.sendStatus(401);
        }
        if (bcrypt.compareSync(password, userRows.password)) {
            res.locals.user = validUser;
        }
        else {
            return res.sendStatus(401);
        }
       
        const token = uuid();
        const id = validUser.rows[0].id;
        await userRepository.login(token, id);
        return res.status(200).send(token);
    } catch (e) {
        return res.sendStatus(500);
    }

}