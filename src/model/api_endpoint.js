const dynamoose = require('dynamoose')

const apiEndpointSchema = new dynamoose.Schema(
    {
        endpoint_name: {
            type: String,
            hashKey: true,
        },
        value: String,
    },
    {
        timestamps: {
            createdAt: 'createDate',
            updatedAt: 'updateDate',
        },
    }
)

module.exports = apiEndpointSchema
