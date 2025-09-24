import { a } from '@aws-amplify/backend';

export const sensorDataModel = a
    .model({
        sensorId: a.string().required(),
        timestamp: a.string().required(),
        greenhouseId: a.string().required(),
        sensorType: a.string().required(),
        temperature: a.float(),
        moisture: a.float(),
        ec: a.float(),
        co2: a.float(),
        solar: a.float(),
    })
    .identifier(['sensorId', 'timestamp'])
    .authorization((allow) => [
        allow.publicApiKey(),
        allow.authenticated()
    ]);