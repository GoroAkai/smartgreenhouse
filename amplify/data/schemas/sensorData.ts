import { a } from '@aws-amplify/backend';

export const sensorDataModel = a
    .model({
        sensorId: a.string().required(),
        timestampGreenhouseId: a.string().required(),
        greenhouseId: a.string().required(),
        timestamp: a.string().required(),
        sensorType: a.string(),
        temperature: a.float(),
        moisture: a.float(),
        ec: a.float(),
        co2: a.float(),
        solar: a.float(),
    })
    .identifier(['sensorId', 'timestampGreenhouseId'])
    .secondaryIndexes((index) => [
        index('greenhouseId').sortKeys(['timestamp']).name('byGreenhouseAndTime'),
    ])
    .authorization((allow) => [allow.authenticated()]);