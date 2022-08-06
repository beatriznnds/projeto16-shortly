import connection from "../database.js"

export async function getViews (req, res) {
    try {
        const { rows: body } = await connection.query(`SELECT urls."userId" AS id, users.name AS name, COUNT(urls.views) AS "linkCount",
        COALESCE(SUM(urls.views),0) AS "visitCount"
        FROM users
        LEFT JOIN urls ON users.id = urls."userId"
        GROUP BY users.name, users.id
        ORDER BY "visitCount" DESC
        LIMIT 10`);
        return res.send(body).status(200);
    } catch (e) {
        console.log(e)
       return res.sendStatus(500);
    }
}