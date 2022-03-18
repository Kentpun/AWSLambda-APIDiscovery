const ssm = require('./SSM')
const api = require('../api-discovery')

module.exports = {
  findURL: async function(path, environment, service) {
        var endpoint = await api.getEndpoint(path, environment)
        var name = String("/" + process.env.API_Stage + "/API/Endpoint/" + service)
        const params = {
            Name: name, /* required */
            Value: endpoint, /* required */
            DataType: 'text',
            Description: 'endpoint for API for service: ' + service,
            Overwrite: true,
            Type: "String"
        }
        await ssm.putParameter(params).promise();
  },
  generateEndpoints: async function() {
        var token = null
        while (true) {
            var {Parameters, NextToken} = await this.getP(token);
            for (const par of Parameters) {
                var nameSeparate = par.Name.split('/')
                await this.findURL(par.Value, nameSeparate[1], nameSeparate[nameSeparate.length-1])
            }
            if (NextToken == null) break
            token = NextToken
        }
    },
  getP: async function(token){
    var paramPattern = String("/" + process.env.API_Stage + "/API/basepath/")
    var params = {
      Path: paramPattern, /* required */
      MaxResults: 10,
        /* more items */
      Recursive: true,
      WithDecryption: false

    };
    if (token) params.NextToken = token;
    var request = await ssm.getParametersByPath(params).promise();

    return request;
  }
}
