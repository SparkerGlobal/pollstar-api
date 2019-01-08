/**
 * https://blog.pollstar.com/api/artist-search/
 * page
 * pageSize
 */

const Wreck = require('wreck');
const Querystring = require('querystring');
const Boom = require('boom');

async function artistSearch(artistName, query) {
    try {
        let url = `/artists/search/${artistName}`;

        if (typeof query !== "undefined") {
            url += `?${Querystring.stringify({
                page: (query.page) ? query.page : 0,
                pageSize: (query.pageSize) ? query.pageSize : 20
            })}`
        }

        await this.getTokens();
        const pollstarRequest = Wreck.request("post", url, this.options);
        const res = await pollstarRequest;
        const body = await Wreck.read(res);
        let resp = JSON.parse(body.toString());
        return resp;
    }
    catch (err) {
        return Boom.boomify(err, { statusCode: 400 });
    }
}

module.exports = artistSearch;