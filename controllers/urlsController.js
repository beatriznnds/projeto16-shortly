import { nanoid } from 'nanoid';
import { urlRepository } from "../repositories/urlRepository.js";

export async function makeShortUrl (req, res) {
    const { url } = req.body;
    const { userId } = res.locals;
    try {
        const shortUrl = nanoid();
        await urlRepository.addNewShortUrl(shortUrl, url, userId);
        return res.status(201).send({ shortUrl });
    } catch (e) {
        console.log(e)
        return res.sendStatus(500);
    }
}

export async function getUrlById (req, res) {
    const { id } = req.params;
    try {
        const { rows: searchedUrl } = await urlRepository.searchUrlById(id);
        return res.status(200).send(searchedUrl);
    } catch (e) {
       return res.sendStatus(500);
    }
}

export async function getShortUrl (req, res) {
    const { shortUrl } = req.params;
    try {
        const { rows: searchedShortUrl }  = await urlRepository.searchShortUrl(shortUrl);
        const newView = Number(searchedShortUrl[0].views) + 1;
        await urlRepository.addNewView(newView, searchedShortUrl[0].id);
        return res.redirect(searchedShortUrl[0].url)
    } catch (e) {
       return res.sendStatus(500);
    }
}

export async function deleteUrl (req, res) {
    const { id } = req.params;
    try {
        await urlRepository.deleteUrl(id);
        return res.sendStatus(204);
    } catch (e) {
        return res.sendStatus(500);
    }
}