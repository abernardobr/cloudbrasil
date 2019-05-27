const _ = require('lodash');

const routesInfo = [];

let routes = [];
_.each(routesInfo, function(info) {
    routes = _.union(routes, require("../domains/" + info.domain + "/controllers/" + info.entity).routes);
});

module.exports = routes;
