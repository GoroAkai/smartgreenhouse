/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getSensorData = /* GraphQL */ `query GetSensorData($sensorId: String!, $timestamp: String!) {
  getSensorData(sensorId: $sensorId, timestamp: $timestamp) {
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
` as GeneratedQuery<
  APITypes.GetSensorDataQueryVariables,
  APITypes.GetSensorDataQuery
>;
export const getUserGreenhouses = /* GraphQL */ `query GetUserGreenhouses($greenhouseId: String!, $userId: String!) {
  getUserGreenhouses(greenhouseId: $greenhouseId, userId: $userId) {
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
` as GeneratedQuery<
  APITypes.GetUserGreenhousesQueryVariables,
  APITypes.GetUserGreenhousesQuery
>;
export const listSensorData = /* GraphQL */ `query ListSensorData(
  $filter: ModelSensorDataFilterInput
  $limit: Int
  $nextToken: String
  $sensorId: String
  $sortDirection: ModelSortDirection
  $timestamp: ModelStringKeyConditionInput
) {
  listSensorData(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sensorId: $sensorId
    sortDirection: $sortDirection
    timestamp: $timestamp
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSensorDataQueryVariables,
  APITypes.ListSensorDataQuery
>;
export const listSensorDataByGreenhouseIdAndTimestamp = /* GraphQL */ `query ListSensorDataByGreenhouseIdAndTimestamp(
  $filter: ModelSensorDataFilterInput
  $greenhouseId: String!
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
  $timestamp: ModelStringKeyConditionInput
) {
  listSensorDataByGreenhouseIdAndTimestamp(
    filter: $filter
    greenhouseId: $greenhouseId
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
    timestamp: $timestamp
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSensorDataByGreenhouseIdAndTimestampQueryVariables,
  APITypes.ListSensorDataByGreenhouseIdAndTimestampQuery
>;
export const listSensorDataBySensorIdAndTimestamp = /* GraphQL */ `query ListSensorDataBySensorIdAndTimestamp(
  $filter: ModelSensorDataFilterInput
  $limit: Int
  $nextToken: String
  $sensorId: String!
  $sortDirection: ModelSortDirection
  $timestamp: ModelStringKeyConditionInput
) {
  listSensorDataBySensorIdAndTimestamp(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sensorId: $sensorId
    sortDirection: $sortDirection
    timestamp: $timestamp
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSensorDataBySensorIdAndTimestampQueryVariables,
  APITypes.ListSensorDataBySensorIdAndTimestampQuery
>;
export const listUserGreenhouses = /* GraphQL */ `query ListUserGreenhouses(
  $filter: ModelUserGreenhousesFilterInput
  $greenhouseId: ModelStringKeyConditionInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
  $userId: String
) {
  listUserGreenhouses(
    filter: $filter
    greenhouseId: $greenhouseId
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
    userId: $userId
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserGreenhousesQueryVariables,
  APITypes.ListUserGreenhousesQuery
>;
