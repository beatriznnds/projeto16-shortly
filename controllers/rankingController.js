import connection from "../database.js"

export async function getViews (req, res) {
    try {
        const { rows: body } = await connection.query(`SELECT urls."userId" AS id, users.name AS name, COUNT(urls.views) AS "linkCount", SUM(urls.views) AS "visitCount"
        FROM urls
        JOIN users ON users.id = urls."userId"
        GROUP BY users.name, urls."userId"
        ORDER BY "visitCount" DESC
        LIMIT 10`);
        res.send(body).status(200);
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
}