import connection from "../database.js";
import { userRepository } from "../repositories/userRepository.js";

export async function getMyUrls (req, res) {
    const { userId }  = res.locals;
    try {
        const { rows: userUrlsVisits } = await userRepository.getViewsFromUser(userId)
        const { rows: urlsFromUser } = await userRepository.getUrlsFromUser(userId);
        const info = { ...userUrlsVisits[0], shortenedUrls: urlsFromUser };
        res.send(info).status(200);

    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
}