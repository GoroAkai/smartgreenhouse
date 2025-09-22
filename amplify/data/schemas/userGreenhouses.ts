import { a } from '@aws-amplify/backend';
export const userGreenhousesModel = a
    .model({
        userId: a.string().required(),
        greenhouseId: a.string().required(),
        greenhouseName: a.string(),
        createdAt: a.datetime(),
        // センサーIDのリスト
        soilSensors: a.listOf(a.string()),
        co2Sensors: a.listOf(a.string()),
        solarSensors: a.listOf(a.string()),
    })
    .identifier(['userId', 'greenhouseId'])
    .authorization((allow) => [allow.publicApiKey(), allow.authenticated()]);
