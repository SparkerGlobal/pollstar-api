/**
 * https://blog.pollstar.com/api/get-city-routebook/
 * 
 * radius - integer
 * fromDate - mm/dd/yyy
 * toDate
 * page
 * pageSize
 */

const Wreck = require('wreck');
const Querystring = require('querystring');
const Boom = require('boom');

async function cityRoutebook(cityId, query) {
    try {
        let url = `/cities/${cityId}/routebook`;

        if (typeof query !== "undefined") {
            url += `?${Querystring.stringify({
                fromDate: (query.fromDate) ? query.fromDate : "",
                toDate: (query.toDate) ? query.toDate : "",
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

module.exports = cityRoutebook;