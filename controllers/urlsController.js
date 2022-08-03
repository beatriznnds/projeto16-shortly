import connection from "../database.js";
import { nanoid } from 'nanoid';

export async function makeShortUrl (req, res) {
    const { url } = req.body;
    const { token } = res.locals;
    try {
        const shortUrl = nanoid();
        await connection.query(`INSERT INTO urls ("shortUrl", url, "userId") VALUES ($1, $2, $3)`, [shortUrl, url, token[0].userId]);
        res.status(201).send({ shortUrl });
    } catch (e) {
        res.sendStatus(500);
    }
}

export async function getUrlById (req, res) {
    const { id } = req.params;
    try {
        const { rows: searchedUrl } = await connection.query(`SELECT * FROM urls WHERE id = $1`, [id]);
        res.status(200).send(searchedUrl);
    } catch (e) {
        res.sendStatus(500);
    }
}