import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { sensorDataModel } from './schemas/sensorData';
import { userGreenhousesModel } from './schemas/userGreenhouses';
import { sensorInfoModel } from './schemas/sensorInfo';

const schema = a.schema({
    SensorDataV2: sensorDataModel,
    UserGreenhousesV2: userGreenhousesModel,
    SensorInfoV2: sensorInfoModel,
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