import { generateClient } from 'aws-amplify/data';
import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime';
import { env } from '$amplify/env/fetch-latest-sensor-data';
import { Amplify } from 'aws-amplify';
import { type Schema } from '../../data/resource';

export const handler = async () => {
  // AppSyncクライアントの構成を取得
  const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(env);
  Amplify.configure(resourceConfig, libraryOptions);

  const client = generateClient<Schema>();

  // 書き込むセンサーデータ（例）
  const result = await client.models.SensorData.create({
    sensorId: 'sensor-001',
    timestampGreenhouseKey: '2025-09-10#GH01',
    timestamp: new Date().toISOString(),
    greenhouseId: 'GH01',
    sensorType: 'soil',
    temperature: 23.5,
    moisture: 45.2,
    ec: 1.8,
    co2: 400,
    solarlight: 1200,
  });

  console.log('SensorData created:', result);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'SensorData written successfully' }),
  };
};