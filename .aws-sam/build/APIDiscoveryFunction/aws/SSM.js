const AWS = require('aws-sdk');
const region = process.env.Region

// Set the region 
const AWSConfig = {
    region: region
}
AWS.config.update(AWSConfig);

// Create the SQS service object
const ssm = new AWS.SSM({apiVersion: '2015-10-07', region: region})
module.exports = ssm