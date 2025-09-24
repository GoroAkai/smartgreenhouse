import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resources';
// import { fetchLatestSensorData } from './functions/fetch-latest-sensor-data/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
export const backend = defineBackend({
  auth,
  data,
  // fetchLatestSensorData,
});
const { cfnUserPool } = backend.auth.resources.cfnResources;

// パスワードポリシーを変更
cfnUserPool.policies = {
  passwordPolicy: {
    minimumLength: 8,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: false,
    requireUppercase: true,
  },
};

// Lambda関数にテーブル名を環境変数として渡す（後で使用）
// const sensorDataTable = backend.data.resources.tables["SensorData"];
// const userGreenhousesTable = backend.data.resources.tables["UserGreenhouses"];
// backend.fetchLatestSensorData.addEnvironment("SENSOR_DATA_TABLE_NAME", sensorDataTable.tableName);
// backend.fetchLatestSensorData.addEnvironment("USER_GREENHOUSES_TABLE_NAME", userGreenhousesTable.tableName);
