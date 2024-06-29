const client = require('../config/eureka');

function getTargetServiceUrl(serviceName) {
    const instance = client.getInstancesByAppId(serviceName);
    if (instance.length > 0) {
        const { ipAddr, port } = instance[0];
        return `http://${ipAddr}:${port.$}`;
    }
    return null;
}

module.exports = { getTargetServiceUrl };
