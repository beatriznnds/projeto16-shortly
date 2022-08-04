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

export async function getShortUrl (req, res) {
    const { shortUrl } = req.params;
    try {
        const { rows: searchedShortUrl }  = await connection.query(`SELECT * FROM urls WHERE "shortUrl" = $1`, [shortUrl]);
        const newView = Number(searchedShortUrl[0].views) + 1;
        await connection.query(`UPDATE urls SET views = $1 WHERE id = $2`, [newView, searchedShortUrl[0].id]);
        res.redirect(searchedShortUrl[0].url)
    } catch (e) {
        res.sendStatus(500);
    }
}

export async function deleteUrl (req, res) {
    const { id } = req.params;
    try {
        await connection.query(`DELETE FROM urls WHERE id = $1`, [id]);
        res.sendStatus(204);
    } catch (e) {
        res.sendStatus(500);
    }
}