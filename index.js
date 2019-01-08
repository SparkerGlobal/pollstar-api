const POLLSTAR_BASE = 'https://www.pollstar.com/api/v2/';
const Wreck = require('wreck');
const Querystring = require('querystring');

class POLLSTAR_API {
    constructor(client_id, client_secret) {
        this.client_id = client_id;
        this.client_secret = client_secret;

        this.options = {
            baseUrl: POLLSTAR_BASE,
                headers: {
                'Accept': 'application/json'
            }
        }
    }
    async getTokens() {
        if (this.options.tokenExpireTime) {
            if (this.options.tokenExpireTime > new Date()) {
                return false;
            }
        }

        let tokens = await this.oAuth();
        let date = new Date();
        this.options.tokenExpireTime = date.setTime(date.getTime() + (20 * 60 * 1000));
        this.options.headers['Authorization'] = `Bearer ${tokens.access_token}`;
    }
    get oAuthRequestOptions() {
        return {
            baseUrl: POLLSTAR_BASE,
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            payload: this.oAuthPayload
        }
    }
    get oAuthPayload() {
        return Querystring.stringify({
            client_id: this.client_id,
            client_secret: this.client_secret,
            grant_type: "client_credentials"
        })
    }
    async oAuth() {
        const promise = Wreck.request("post", "token", this.oAuthRequestOptions);

        try {
            const res = await promise;
            const body = await Wreck.read(res);
            let resp = JSON.parse(body.toString());
            return resp;
        }
        catch (err) {
            console.log(err);
        }
    }
    get routes() {
        return {
            artistRoutebook: require('./endpoints/artistRoutebook').bind(this),
            artistSearch: require('./endpoints/artistSearch').bind(this),
            artistDetail: require('./endpoints/artistDetail').bind(this),
            cityRoutebook: require('./endpoints/cityRoutebook').bind(this),
            citySearch: require('./endpoints/citySearch').bind(this),
            cityVenues: require('./endpoints/cityVenues').bind(this),
            upcomingEventInfo: require('./endpoints/upcomingEventInfo').bind(this),
            venueRoutebook: require('./endpoints/venueRoutebook').bind(this),
            venueSearch: require('./endpoints/venueSearch').bind(this)
        }
    }
}

module.exports = POLLSTAR_API;
