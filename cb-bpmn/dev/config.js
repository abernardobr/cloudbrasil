let host;
let port;
let ssl;
let corsOrigin;
let redisOptions
let mongo;

switch (process.env.servertype) {
    case 'dev':
        ssl = false;
        host = '127.0.0.1';
        port = 3456;
        corsOrigin = ['http://127.0.0.1:8080'];
        redisOptions = {
            prefix: 'cbmerge',
            enabled: true,
            dbId: 4,
            config: {
                host: '127.0.0.1',
                port: 6379
            }
        };
        mongo = { host: 'mongodb://localhost/cb_bpmn', options: { useNewUrlParser: true } };
        break;
    case 'docker-dev':
        ssl = false;
        host = '0.0.0.0';
        port = 3456;
        corsOrigin = ['http://127.0.0.1:8080'];
        redisOptions = {
            prefix: 'cbmerge',
            enabled: true,
            dbId: 4,
            config: {
                host: '127.0.0.1',
                port: 6379
            }
        };
        break;
    case 'test':
        break;
    case 'docker-uat':
        ssl = false;
        host = "0.0.0.0";
        port = 80;
        corsOrigin = ['http://uat.cloudbrasil.io', 'https://uat.cloudbrasil.io'];
        redisOptions = {
            prefix: 'cbmerge',
            enabled: true,
            dbId: 2,
            config: {
                host: '10.142.0.6',
                port: 6379,
                auth_pass: 'Eovth3Cw'
            }
        };
        break;
    case 'prod':
        break;
    case 'docker-prod':
        ssl = false;
        host = "0.0.0.0";
        port = 80;
        corsOrigin = ['http://cloudbrasil.io', 'https://cloudbrasil.io'];
        redisOptions = {
            prefix: 'cbmerge',
            enabled: true,
            dbId: 4,
            config: {
                host: '10.142.0.6',
                port: 6379,
                auth_pass: 'Eovth3Cw'
            }
        };
        mongo = { host: 'mongodb://localhost/cb_bpmn', options: { useNewUrlParser: true } };
        break;
}

module.exports = {
    server: {
        port: port,
        host: host,
        hapi: {
            routes: {
                cors: {
                    origin: corsOrigin,
                    credentials: 'true',
                    headers: ['Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials', 'Authorization', 'Content-Type', 'If-None-Match', 'Cache-Control', 'X-Requested-With', 'X-Frame-Options']
                },
                files: {
                    relativeTo: __dirname
                }
            }
        }
    },
    apikeys: '5b2f0b2f-0e27-49a6-9d41-51b701035ebb',
    cache: {
        mergefile:  5 * 60 * 60      // 5hr
    },
    redis: redisOptions,
    mongo
};
