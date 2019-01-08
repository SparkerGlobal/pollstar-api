/**
 * https://blog.pollstar.com/api/get-artist-detail/
 */

const Wreck = require('wreck');
const Boom = require('boom');

async function artistDetail(artistId) {
    try {
        const pollstarRequest = Wreck.request("get", `/artists/${artistId}`, this.options);
        await this.getTokens();
        const res = await pollstarRequest;
        const body = await Wreck.read(res);
        let resp = JSON.parse(body.toString());
        return resp;
    }
    catch (err) {
        return Boom.boomify(err, { statusCode: 400 });
    }
}

module.exports = artistDetail;