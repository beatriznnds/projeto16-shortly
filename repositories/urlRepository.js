import connection from "../database.js";

async function addNewShortUrl (url, shortUrl, id) {
    return connection.query(`INSERT INTO urls ("shortUrl", url, "userId") VALUES ($1, $2, $3)`, [shortUrl, url, token[0].userId]);
}

async function searchUrlById (id) {
    return connection.query(`SELECT * FROM urls WHERE id = $1`, [id]);
}

async function addNewView (shortUrl) {
    return connection.query(`UPDATE urls SET views = $1 WHERE id = $2`, [newView, searchedShortUrl[0].id]);
}

async function searchShortUrl (shortUrl) {
    return connection.query(`SELECT * FROM urls WHERE "shortUrl" = $1`, [shortUrl]);
}

async function deleteUrl (id) {
    return connection.query(`DELETE FROM urls WHERE id = $1`, [id]);
}

export const urlRepository = {
    addNewShortUrl,
    searchUrlById,
    addNewView,
    searchShortUrl,
    deleteUrl
};