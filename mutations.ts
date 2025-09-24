/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createSensorData = /* GraphQL */ `mutation CreateSensorData(
  $condition: ModelSensorDataConditionInput
  $input: CreateSensorDataInput!
) {
  createSensorData(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateSensorDataMutationVariables,
  APITypes.CreateSensorDataMutation
>;
export const createUserGreenhouses = /* GraphQL */ `mutation CreateUserGreenhouses(
  $condition: ModelUserGreenhousesConditionInput
  $input: CreateUserGreenhousesInput!
) {
  createUserGreenhouses(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateUserGreenhousesMutationVariables,
  APITypes.CreateUserGreenhousesMutation
>;
export const deleteSensorData = /* GraphQL */ `mutation DeleteSensorData(
  $condition: ModelSensorDataConditionInput
  $input: DeleteSensorDataInput!
) {
  deleteSensorData(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteSensorDataMutationVariables,
  APITypes.DeleteSensorDataMutation
>;
export const deleteUserGreenhouses = /* GraphQL */ `mutation DeleteUserGreenhouses(
  $condition: ModelUserGreenhousesConditionInput
  $input: DeleteUserGreenhousesInput!
) {
  deleteUserGreenhouses(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteUserGreenhousesMutationVariables,
  APITypes.DeleteUserGreenhousesMutation
>;
export const updateSensorData = /* GraphQL */ `mutation UpdateSensorData(
  $condition: ModelSensorDataConditionInput
  $input: UpdateSensorDataInput!
) {
  updateSensorData(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateSensorDataMutationVariables,
  APITypes.UpdateSensorDataMutation
>;
export const updateUserGreenhouses = /* GraphQL */ `mutation UpdateUserGreenhouses(
  $condition: ModelUserGreenhousesConditionInput
  $input: UpdateUserGreenhousesInput!
) {
  updateUserGreenhouses(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateUserGreenhousesMutationVariables,
  APITypes.UpdateUserGreenhousesMutation
>;
