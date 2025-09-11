import { defineFunction } from '@aws-amplify/backend';

export const fetchLatestSensorData = defineFunction({
  name: 'fetch-latest-sensor-data',
  entry: './handler.ts',
  timeoutSeconds: 60, // DynamoDB Stream処理用に長めに設定
  memoryMB: 256,
});