/**
 * https://blog.pollstar.com/api/get-event/
 */

const Wreck = require('wreck');
const Boom = require('boom');

async function eventDetail(eventid, options) {
    try {
        await this.getTokens();
        const pollstarRequest = Wreck.request("get", `/events/${eventid}`, this.options);
        const res = await pollstarRequest;
        const body = await Wreck.read(res);
        let resp = JSON.parse(body.toString());
        return resp;
    }
    catch (err) {
        return Boom.boomify(err, { statusCode: 400 });
    }
}

module.exports = eventDetail;