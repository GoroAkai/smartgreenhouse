import { defineData } from '@aws-amplify/backend';

export const data = defineData({
    UserGreenhouses: (model) =>
        model
            .identifier(['userId', 'greenhouseId'])
            .fields({
                userId: model.string().required(),
                greenhouseId: model.string().required(),
                greenhouseName: model.string(),
                createdAt: model.datetime(),

                // 正しい配列型の定義
                soilSensors: model.listOf(model.string()),
                co2Sensors: model.listOf(model.string()),
                solarSensors: model.listOf(model.string()),
            })
            .authorization((allow) => [allow.authenticated()]),
});