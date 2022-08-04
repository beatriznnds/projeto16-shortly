import connection from "../database.js";

async function addNewUser (name, email, passwordHash) {
    return connection.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [name, email, passwordHash]);
}

async function searchUserByEmail (email) {
    return connection.query(`SELECT * FROM users WHERE email = $1`, [email]);
}

async function login (token, id) {
    return connection.query(`INSERT INTO sessions (token, "userId") VALUES ($1, $2)`, [token, id]);
}

async function getViewsFromUser (userId) {
     return connection.query(`SELECT urls."userId" AS id, users.name AS name, SUM (urls.views) AS "visitCount"
        FROM urls
        JOIN users ON users.id = urls."userId"
        WHERE urls."userId" = $1
        GROUP BY urls."userId", users.name
        `, [userId])
}

async function getUrlsFromUser (userId) {
    return connection.query(`SELECT id, "shortUrl", url, views AS "visitCount" FROM urls WHERE "userId" = $1`, [userId]);
}

export const userRepository = {
    addNewUser,
    searchUserByEmail,
    login,
    getViewsFromUser,
    getUrlsFromUser
}