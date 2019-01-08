# pollstar-api

Pollstar API Node.js wrapper using Wreck for HTTP requests.

https://blog.pollstar.com/api/

# npm

`npm i pollstar-api`

# Example Usage

    let ps = new POLLSTAR_API(API_KEY, API_SECRET);

    await ps.routes.artistSearch("a", { page: 0, pageSize: 30 });

    await ps.routes.artistDetail("13157");

    await ps.routes.artistRoutebook("25061", { toDate: '02/20/2019', fromDate: '02/01/2019', page: 0, pageSize: 20 });

    await ps.routes.cityRoutebook("40643", { toDate: '02/20/2019', fromDate: '02/01/2019', page: 0, pageSize: 20 });

    await ps.routes.citySearch("new orleans", { page: 1, pageSize: 30 });

    await ps.routes.cityVenues("40643", { radius: 20, page: 1, pageSize: 30 });

    await ps.routes.upcomingEventInfo("7502158");

    await ps.routes.venueRoutebook("269161", { toDate: '02/20/2019', fromDate: '02/01/2019', page: 0, pageSize: 20 });
    
    await ps.routes.venueSearch("ti", { page: 2, pageSize: 30 });