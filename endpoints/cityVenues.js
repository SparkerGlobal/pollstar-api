/**
 * https://blog.pollstar.com/api/get-local-venues/
 * 
 * radius
 * page
 * pageSize
 */

const Wreck = require('wreck');
const Querystring = require('querystring');
const Boom = require('boom');

async function cityVenues(cityId, query) {
    try {
        let url = `/cities/${cityId}/venues/`;

        if (typeof query !== "undefined") {
            url += `?${Querystring.stringify({
                radius: (query.radius) ? query.radius : 0,
                page: (query.page) ? query.page : 0,
                pageSize: (query.pageSize) ? query.pageSize : 20
            })}`
        }

        await this.getTokens();
        const pollstarRequest = Wreck.request("get", url, this.options);
        const res = await pollstarRequest;
        const body = await Wreck.read(res);
        let resp = JSON.parse(body.toString());
        return resp;
    }
    catch (err) {
        return Boom.boomify(err, { statusCode: 400 });
    }
}

module.exports = cityVenues;