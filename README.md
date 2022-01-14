# AWSLambda-APIDiscovery

### Independent API Discovery Function for AWS Serverless Lambda Architecture
#### Rules
1. Each service is associated with one API Gateway API resource with unique API basepath
2. During Deployment, the basepath should be registered and stored in AWS SSM Parameter Store: 
`/[env]/API/basepath/[service name]: [basepath]`
3. APIDiscovery Function gets all basepaths, looks up their corresponding API Gateway endpoint, and store in AWS SSM Parameter Store: 
`/[env]/API/Endpoint/[service name]: [API endpoint]`
