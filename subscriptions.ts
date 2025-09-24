/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateSensorData = /* GraphQL */ `subscription OnCreateSensorData(
  $filter: ModelSubscriptionSensorDataFilterInput
) {
  onCreateSensorData(filter: $filter) {
    co2
    createdAt
    ec
    greenhouseId
    moisture
    sensorId
    sensorType
    solar
    temperature
    timestamp
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateSensorDataSubscriptionVariables,
  APITypes.OnCreateSensorDataSubscription
>;
export const onCreateUserGreenhouses = /* GraphQL */ `subscription OnCreateUserGreenhouses(
  $filter: ModelSubscriptionUserGreenhousesFilterInput
) {
  onCreateUserGreenhouses(filter: $filter) {
    co2Sensors
    createdAt
    greenhouseId
    greenhouseName
    soilSensors
    solarSensors
    updatedAt
    userId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserGreenhousesSubscriptionVariables,
  APITypes.OnCreateUserGreenhousesSubscription
>;
export const onDeleteSensorData = /* GraphQL */ `subscription OnDeleteSensorData(
  $filter: ModelSubscriptionSensorDataFilterInput
) {
  onDeleteSensorData(filter: $filter) {
    co2
    createdAt
    ec
    greenhouseId
    moisture
    sensorId
    sensorType
    solar
    temperature
    timestamp
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteSensorDataSubscriptionVariables,
  APITypes.OnDeleteSensorDataSubscription
>;
export const onDeleteUserGreenhouses = /* GraphQL */ `subscription OnDeleteUserGreenhouses(
  $filter: ModelSubscriptionUserGreenhousesFilterInput
) {
  onDeleteUserGreenhouses(filter: $filter) {
    co2Sensors
    createdAt
    greenhouseId
    greenhouseName
    soilSensors
    solarSensors
    updatedAt
    userId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserGreenhousesSubscriptionVariables,
  APITypes.OnDeleteUserGreenhousesSubscription
>;
export const onUpdateSensorData = /* GraphQL */ `subscription OnUpdateSensorData(
  $filter: ModelSubscriptionSensorDataFilterInput
) {
  onUpdateSensorData(filter: $filter) {
    co2
    createdAt
    ec
    greenhouseId
    moisture
    sensorId
    sensorType
    solar
    temperature
    timestamp
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateSensorDataSubscriptionVariables,
  APITypes.OnUpdateSensorDataSubscription
>;
export const onUpdateUserGreenhouses = /* GraphQL */ `subscription OnUpdateUserGreenhouses(
  $filter: ModelSubscriptionUserGreenhousesFilterInput
) {
  onUpdateUserGreenhouses(filter: $filter) {
    co2Sensors
    createdAt
    greenhouseId
    greenhouseName
    soilSensors
    solarSensors
    updatedAt
    userId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserGreenhousesSubscriptionVariables,
  APITypes.OnUpdateUserGreenhousesSubscription
>;
