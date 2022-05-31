const dynamoose = require('dynamoose')

const isOffline = process.env.IS_OFFLINE
const region = process.env.DYNAMO_DB_REGION

dynamoose.aws.sdk.config.update({
  region
})

if (isOffline === 'true') {
  dynamoose.aws.ddb.local('http://localhost:8000')
} else {
  const ddb = new dynamoose.aws.sdk.DynamoDB()
  dynamoose.aws.ddb.set(ddb)
}

dynamoose.model.defaults.set(require('./general_config'));

module.exports = {
  StoreWaitTime: dynamoose.model('APIEndpoint', require('./api_endpoint')),
}
