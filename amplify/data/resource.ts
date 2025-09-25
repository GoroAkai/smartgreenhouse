/**
 * 下記にbackendについて詳細が載っている
 * https://docs.amplify.aws/react/build-a-backend/data/set-up-data/
 */
import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { sensorDataModel } from './schemas/sensorData';
import { userGreenhousesModel } from './schemas/userGreenhouses';
import { sensorInfoModel } from './schemas/sensorInfo';

const schema = a.schema({
    SensorData: sensorDataModel,
    UserGreenhouses: userGreenhousesModel,
    SensorInfo: sensorInfoModel,
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: 'userPool',
        apiKeyAuthorizationMode: {
            expiresInDays: 30,
        },
    },
});