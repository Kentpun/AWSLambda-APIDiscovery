const AWS = require('aws-sdk')
var apigw = new AWS.APIGateway()
const region = process.env.Region

module.exports = {
    getEndpoint: async function(path, environment) {
        var position = null
        while (true) {
            var [id, vpceid, nextPosition] = await this.findEndpoint(path, environment, position);
            if (id != null) return await this.generateEndpoint(id, vpceid)
            if (nextPosition == null) break
            position = nextPosition
        }
        return "No Endpoint Found"
    },
    findEndpoint: async function(path, environment, position) {
        var maxResults = '25'
        var params = {
            limit: maxResults,
        };
        if (position) params.position = position
        return new Promise((resolve, reject) => {
            apigw.getRestApis(params, function(err, data) {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                }
                var apiObject = data.items.find(out =>  out.name.substr(0, out.name.indexOf('-')) === path && out.name.substr(out.name.lastIndexOf('-') + 1) === environment);
                resolve([(apiObject) ? ((apiObject.id) ? apiObject.id : null) : null, (apiObject) ? ((apiObject.endpointConfiguration.vpcEndpointIds) ? apiObject.endpointConfiguration.vpcEndpointIds[0] : null) : null, (data) ? (data.position) ? data.position : null : null])
            })
        })
    },
    generateEndpoint: async function(id, vpceid) {
        if (vpceid != null) {
            return `https://${id}-${vpceid}.execute-api.${region}.amazonaws.com`
        }
        else {
            return `https://${id}.execute-api.${region}.amazonaws.com`
        }
    }
}

