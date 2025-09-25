import { a } from '@aws-amplify/backend';

export const sensorDataModel = a
    .model({
        // テーブル名を明示的に指定して競合を回避
        tableName: 'SensorDataV2',
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
    .secondaryIndexes((index) => [
        // センサーIDで最新データを効率的に取得するためのGSI
        index('sensorId')
            .sortKeys(['timestamp'])
            .name('bySensorIdAndTimestamp'),
        // 温室IDで最新データを効率的に取得するためのGSI
        index('greenhouseId')
            .sortKeys(['timestamp'])
            .name('byGreenhouseIdAndTimestamp'),
    ])
    .authorization((allow) => [
        allow.publicApiKey(),
        allow.authenticated()
    ]);