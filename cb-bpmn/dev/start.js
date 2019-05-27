const _ = require('lodash');
const Hapi = require('hapi');
const Async = require('async');
const Args = require('commander');
const HD = require('@docbrasil/hd-tools');

/**
 * Class to start the application
 * @class
 */
class StartApp {
    constructor() {
        const self = this;
        self.server = null;
        self.serverConfig = {};
    }
    initArgs(next) {
        const self = this;

        // Set Args
        Args
            .version('0.0.1')
            .option('-s, --servertype [type]', 'Type of the server location: dev, test, accept or prod')
            .parse(process.argv);

        process.env["servertype"] = Args.servertype ? Args.servertype : "dev";
        self.routes = ['rest'];
        next();
    }
    getServerConfig(next) {
        const self = this;
        self.serverConfig = HD.serverconfig();
        next();
    }
    initLoaders(next) {
        HD.init({
            domains: require('./domains')
        });
        next();
    }
    createServer(next) {
        const self = this;
        self.server = new Hapi.Server(self.serverConfig.server.hapi);
        next();
    }
    initRoutes(next) {
        const self = this;
        let finalRoutes = [];
        _.each(self.routes, function(routeType){
            let reqRout = require("./routes/" + routeType);
            finalRoutes = _.union(finalRoutes, reqRout);
        });
        _.each(finalRoutes, (route) => {
            self.server.route(route);
        });
        next();
    }

    initCache(next) {
        const self = this;
        let cacheConfig = {
            connection: self.serverConfig.redis,
            list: self.serverConfig.cache
        };
        HD.cache().init(cacheConfig);
        HD.cache().connect(() => {
            next();
        });
    }

    initMongo(next) {
        const self = this;
        HD.mongo().setConfig(self.serverConfig.mongo);
        HD.mongo().connect(() => {
            next();
        });
    }

    async startServer(next) {
        const self = this;
        await self.server.start();
        next();
    }

    start() {
        const self = this;
        let funcs = [];

        funcs.push(next => self.initArgs(next));
        funcs.push(next => self.initLoaders(next));
        funcs.push(next => self.getServerConfig(next));
        funcs.push(next => self.initCache(next));
        funcs.push(next => self.initMongo(next));
        funcs.push(next => self.createServer(next));
        funcs.push(next => self.initRoutes(next));
        funcs.push(next => self.startServer(next));

        Async.series(funcs, err => {
            if (err) {
                console.dir(err);
            } else {
                const dt = new Date();
                console.log(`Server started with URI ${self.server.info.uri} at ${dt.toTimeString()} with options: -s: ${process.env["servertype"]}`);
            }
        });
    }
}

const app = new StartApp();
app.start();
