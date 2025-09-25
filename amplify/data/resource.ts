import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { sensorDataV2Model } from './schemas/sensorData';
import { userGreenhousesV2Model } from './schemas/userGreenhouses';
import { sensorInfoV2Model } from './schemas/sensorInfo';

const schema = a.schema({
    SensorDataV2: sensorDataV2Model,
    UserGreenhousesV2: userGreenhousesV2Model,
    SensorInfoV2: sensorInfoV2Model,
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