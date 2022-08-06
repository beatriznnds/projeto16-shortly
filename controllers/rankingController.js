import connection from "../database.js"

export async function getViews (req, res) {
    try {
        const { rows: body } = await connection.query(`SELECT urls."userId" AS id, users.name AS name, COUNT(urls.views) AS "linkCount",
        COALESCE(SUM(urls.views),0) AS "visitCount"
        FROM urls
        LEFT JOIN users ON users.id = urls."userId"
        GROUP BY users.name, urls."userId"
        ORDER BY "visitCount" DESC
        LIMIT 10`);
        return res.send(body).status(200);
    } catch (e) {
        console.log(e)
       return res.sendStatus(500);
    }
}