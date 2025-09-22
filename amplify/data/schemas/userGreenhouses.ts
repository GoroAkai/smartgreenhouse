import { a } from '@aws-amplify/backend';
export const userGreenhousesModel = a.model({
    userId: a.string().required(),
    greenhouseId: a.string().required(),
    greenhouseName: a.string(),
    createdAt: a.datetime(),
    soilSensors: a.string().array(),
    co2Sensors: a.string().array(),
    solarSensors: a.string().array(),
})
    .identifier(['userId', 'greenhouseId'])
    .authorization((allow) => [allow.publicApiKey(), allow.authenticated()]);

