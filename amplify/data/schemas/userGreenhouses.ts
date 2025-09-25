import { a } from '@aws-amplify/backend';

export const userGreenhousesV2Model = a.model({
    userId: a.string().required(),
    greenhouseId: a.string().required(),
    greenhouseName: a.string(),
    createdAt: a.datetime(),
    soilSensors: a.string().array(),
    co2Sensors: a.string().array(),
    solarSensors: a.string().array(),
    updatedAt: a.datetime(),  // 名前の変更などで更新される可能性あり
})
    .identifier(['userId', 'greenhouseId'])
    .authorization((allow) => [allow.publicApiKey(), allow.authenticated()]);

