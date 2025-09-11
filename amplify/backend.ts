import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { fetchLatestSensorData } from './functions/fetch-latest-sensor-data/resource';


/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
export const backend = defineBackend({
  auth,
  data,
  fetchLatestSensorData,
});

// Lambda関数にテーブル名を環境変数として渡す
const sensorDataTable = backend.data.resources.tables["SensorData"];
const userGreenhousesTable = backend.data.resources.tables["UserGreenhouses"];

// 複数のテーブル名を環境変数として設定
backend.fetchLatestSensorData.addEnvironment("SENSOR_DATA_TABLE_NAME", sensorDataTable.tableName);
backend.fetchLatestSensorData.addEnvironment("USER_GREENHOUSES_TABLE_NAME", userGreenhousesTable.tableName);
