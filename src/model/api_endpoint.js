const dynamoose = require('dynamoose')

const waitTimeRangeSchema = new dynamoose.Schema(
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

module.exports = waitTimeRangeSchema
