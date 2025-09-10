import { defineFunction } from '@aws-amplify/backend';

export const fetchLatestSensorData = defineFunction({
    name: 'fetch-latest-sensor-data',
    entry: './handler.ts',
    runtime: 'nodejs20.x',
    environment: {
        SENSOR_TABLE: 'SensorData',
    },
    permissions: {
        amplify: ['read', 'write'], // AppSync経由でSensorDataにアクセス
    },
});