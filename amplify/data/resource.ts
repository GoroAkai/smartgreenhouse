import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { sensorDataModel } from './schemas/sensorData';
import { userGreenhousesModel } from './schemas/userGreenhouses';

const schema = a.schema({
    SensorData: sensorDataModel,
    UserGreenhouses: userGreenhousesModel,
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