import { a } from '@aws-amplify/backend';

export const sensorDataModel = a
    .model({
        sensorId: a.string().required(),
        timestampGreenhouseKey: a.string().required(),
        timestamp: a.string().required(),
        greenhouseId: a.string().required(),
        sensorType: a.string().required(),
        temperature: a.float().required(),
        moisture: a.float().required(),
        ec: a.float().required(),
        co2: a.float(),
        solarlight: a.float(),
    })
    .identifier(['sensorId', 'timestampGreenhouseKey'])
    .authorization((allow) => [allow.publicApiKey(), allow.authenticated()]);