const Eureka = require('eureka-js-client').Eureka;

const EUREKA_HOST = 'localhost';
const EUREKA_PORT = 8761;
const PORT = 8080;

const client = new Eureka({
    instance: {
        app: 'Web-ApiGateway',
        hostName: 'localhost',
        ipAddr: '127.0.0.1',
        port: { '$': PORT, '@enabled': 'true' },
        vipAddress: 'Web-ApiGateway',
        dataCenterInfo: { '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo', name: 'MyOwn' },
    },
    eureka: {
        host: EUREKA_HOST,
        port: EUREKA_PORT,
        servicePath: '/eureka/apps/',
    },
});

client.start();

module.exports = client;
