import connection from "../database.js";

export async function getMyUrls (req, res) {
    const { userId }  = res.locals;
    console.log(userId)
    try {
        const { rows: userUrlsVisits } = await connection.query(`SELECT urls."userId" AS id, users.name AS name, SUM (urls.views) AS "visitCount"
        FROM urls
        JOIN users ON users.id = urls."userId"
        WHERE urls."userId" = $1
        GROUP BY urls."userId", users.name
        `, [userId])
        const { rows: urlsFromUser } = await connection.query(`SELECT id, "shortUrl", url, views AS "visitCount" FROM urls WHERE "userId" = $1`, [userId]);
        const info = { ...userUrlsVisits[0], shortenedUrls: urlsFromUser };
        res.send(info).status(200);

    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
}