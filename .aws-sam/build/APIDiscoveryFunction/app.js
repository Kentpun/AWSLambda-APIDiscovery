const discovery = require('./aws/findServiceURL')

exports.handler = async function(event, context) {
  await discovery.generateEndpoints();
}

