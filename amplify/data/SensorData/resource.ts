import { defineData } from '@aws-amplify/backend';

export const data = defineData({
    SensorData: (model) =>
        model
            .identifier(['sensorId', 'timestampGreenhouseId']) // PK + SK
            .fields({
                sensorId: model.string().required(),

                // SKを構成する複合値（timestamp#greenhouseId）
                timestampGreenhouseId: model.string().required(),

                // GSI用のフィールド
                greenhouseId: model.string().required(),
                timestamp: model.string().required(),

                // その他のセンサーデータ
                sensorType: model.string(),
                temperature: model.float(),
                moisture: model.float(),
                ec: model.float(),
                co2: model.float(),
                solar: model.float(),
            })
            .indexes({
                byGreenhouseAndTime: (index) =>
                    index
                        .partitionKey('greenhouseId')
                        .sortKey('timestamp'),
            })
            .authorization((allow) => [
                allow.authenticated(), // Cognitoユーザーのみアクセス可
            ]),
});