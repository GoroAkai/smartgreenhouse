import { a } from '@aws-amplify/backend';

export const sensorInfoModel = a
    .model({
        sensorId: a.string().required(),
        greenhouseId: a.string().required(),
        sensorName: a.string(), // センサーの表示名
        sensorType: a.string().required(), // soil, co2, solar
        description: a.string(), // センサーの説明（オプション）
        location: a.string(), // 設置場所（オプション）
        isActive: a.boolean().default(true), // アクティブ状態
    })
    .identifier(['sensorId'])
    .secondaryIndexes((index) => [
        // 温室IDでセンサー情報を取得するためのGSI
        index('greenhouseId')
            .name('byGreenhouseId'),
    ])
    .authorization((allow) => [
        allow.publicApiKey(),
        allow.authenticated()
    ]);