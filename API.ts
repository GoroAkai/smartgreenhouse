/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type SensorData = {
  __typename: "SensorData",
  co2?: number | null,
  createdAt: string,
  ec?: number | null,
  greenhouseId: string,
  moisture?: number | null,
  sensorId: string,
  sensorType: string,
  solar?: number | null,
  temperature?: number | null,
  timestamp: string,
  updatedAt: string,
};

export type UserGreenhouses = {
  __typename: "UserGreenhouses",
  co2Sensors?: Array< string | null > | null,
  createdAt?: string | null,
  greenhouseId: string,
  greenhouseName?: string | null,
  soilSensors?: Array< string | null > | null,
  solarSensors?: Array< string | null > | null,
  updatedAt?: string | null,
  userId: string,
};

export type ModelSensorDataFilterInput = {
  and?: Array< ModelSensorDataFilterInput | null > | null,
  co2?: ModelFloatInput | null,
  createdAt?: ModelStringInput | null,
  ec?: ModelFloatInput | null,
  greenhouseId?: ModelStringInput | null,
  id?: ModelIDInput | null,
  moisture?: ModelFloatInput | null,
  not?: ModelSensorDataFilterInput | null,
  or?: Array< ModelSensorDataFilterInput | null > | null,
  sensorId?: ModelStringInput | null,
  sensorType?: ModelStringInput | null,
  solar?: ModelFloatInput | null,
  temperature?: ModelFloatInput | null,
  timestamp?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelFloatInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelStringKeyConditionInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
};

export type ModelSensorDataConnection = {
  __typename: "ModelSensorDataConnection",
  items:  Array<SensorData | null >,
  nextToken?: string | null,
};

export type ModelUserGreenhousesFilterInput = {
  and?: Array< ModelUserGreenhousesFilterInput | null > | null,
  co2Sensors?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  greenhouseId?: ModelStringInput | null,
  greenhouseName?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelUserGreenhousesFilterInput | null,
  or?: Array< ModelUserGreenhousesFilterInput | null > | null,
  soilSensors?: ModelStringInput | null,
  solarSensors?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelStringInput | null,
};

export type ModelUserGreenhousesConnection = {
  __typename: "ModelUserGreenhousesConnection",
  items:  Array<UserGreenhouses | null >,
  nextToken?: string | null,
};

export type ModelSensorDataConditionInput = {
  and?: Array< ModelSensorDataConditionInput | null > | null,
  co2?: ModelFloatInput | null,
  createdAt?: ModelStringInput | null,
  ec?: ModelFloatInput | null,
  greenhouseId?: ModelStringInput | null,
  moisture?: ModelFloatInput | null,
  not?: ModelSensorDataConditionInput | null,
  or?: Array< ModelSensorDataConditionInput | null > | null,
  sensorType?: ModelStringInput | null,
  solar?: ModelFloatInput | null,
  temperature?: ModelFloatInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateSensorDataInput = {
  co2?: number | null,
  ec?: number | null,
  greenhouseId: string,
  moisture?: number | null,
  sensorId: string,
  sensorType: string,
  solar?: number | null,
  temperature?: number | null,
  timestamp: string,
};

export type ModelUserGreenhousesConditionInput = {
  and?: Array< ModelUserGreenhousesConditionInput | null > | null,
  co2Sensors?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  greenhouseName?: ModelStringInput | null,
  not?: ModelUserGreenhousesConditionInput | null,
  or?: Array< ModelUserGreenhousesConditionInput | null > | null,
  soilSensors?: ModelStringInput | null,
  solarSensors?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateUserGreenhousesInput = {
  co2Sensors?: Array< string | null > | null,
  createdAt?: string | null,
  greenhouseId: string,
  greenhouseName?: string | null,
  soilSensors?: Array< string | null > | null,
  solarSensors?: Array< string | null > | null,
  updatedAt?: string | null,
  userId: string,
};

export type DeleteSensorDataInput = {
  sensorId: string,
  timestamp: string,
};

export type DeleteUserGreenhousesInput = {
  greenhouseId: string,
  userId: string,
};

export type UpdateSensorDataInput = {
  co2?: number | null,
  ec?: number | null,
  greenhouseId?: string | null,
  moisture?: number | null,
  sensorId: string,
  sensorType?: string | null,
  solar?: number | null,
  temperature?: number | null,
  timestamp: string,
};

export type UpdateUserGreenhousesInput = {
  co2Sensors?: Array< string | null > | null,
  createdAt?: string | null,
  greenhouseId: string,
  greenhouseName?: string | null,
  soilSensors?: Array< string | null > | null,
  solarSensors?: Array< string | null > | null,
  updatedAt?: string | null,
  userId: string,
};

export type ModelSubscriptionSensorDataFilterInput = {
  and?: Array< ModelSubscriptionSensorDataFilterInput | null > | null,
  co2?: ModelSubscriptionFloatInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  ec?: ModelSubscriptionFloatInput | null,
  greenhouseId?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  moisture?: ModelSubscriptionFloatInput | null,
  or?: Array< ModelSubscriptionSensorDataFilterInput | null > | null,
  sensorId?: ModelSubscriptionStringInput | null,
  sensorType?: ModelSubscriptionStringInput | null,
  solar?: ModelSubscriptionFloatInput | null,
  temperature?: ModelSubscriptionFloatInput | null,
  timestamp?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionFloatInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionUserGreenhousesFilterInput = {
  and?: Array< ModelSubscriptionUserGreenhousesFilterInput | null > | null,
  co2Sensors?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  greenhouseId?: ModelSubscriptionStringInput | null,
  greenhouseName?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionUserGreenhousesFilterInput | null > | null,
  soilSensors?: ModelSubscriptionStringInput | null,
  solarSensors?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionStringInput | null,
};

export type GetSensorDataQueryVariables = {
  sensorId: string,
  timestamp: string,
};

export type GetSensorDataQuery = {
  getSensorData?:  {
    __typename: "SensorData",
    co2?: number | null,
    createdAt: string,
    ec?: number | null,
    greenhouseId: string,
    moisture?: number | null,
    sensorId: string,
    sensorType: string,
    solar?: number | null,
    temperature?: number | null,
    timestamp: string,
    updatedAt: string,
  } | null,
};

export type GetUserGreenhousesQueryVariables = {
  greenhouseId: string,
  userId: string,
};

export type GetUserGreenhousesQuery = {
  getUserGreenhouses?:  {
    __typename: "UserGreenhouses",
    co2Sensors?: Array< string | null > | null,
    createdAt?: string | null,
    greenhouseId: string,
    greenhouseName?: string | null,
    soilSensors?: Array< string | null > | null,
    solarSensors?: Array< string | null > | null,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type ListSensorDataQueryVariables = {
  filter?: ModelSensorDataFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sensorId?: string | null,
  sortDirection?: ModelSortDirection | null,
  timestamp?: ModelStringKeyConditionInput | null,
};

export type ListSensorDataQuery = {
  listSensorData?:  {
    __typename: "ModelSensorDataConnection",
    items:  Array< {
      __typename: "SensorData",
      co2?: number | null,
      createdAt: string,
      ec?: number | null,
      greenhouseId: string,
      moisture?: number | null,
      sensorId: string,
      sensorType: string,
      solar?: number | null,
      temperature?: number | null,
      timestamp: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListSensorDataByGreenhouseIdAndTimestampQueryVariables = {
  filter?: ModelSensorDataFilterInput | null,
  greenhouseId: string,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
  timestamp?: ModelStringKeyConditionInput | null,
};

export type ListSensorDataByGreenhouseIdAndTimestampQuery = {
  listSensorDataByGreenhouseIdAndTimestamp?:  {
    __typename: "ModelSensorDataConnection",
    items:  Array< {
      __typename: "SensorData",
      co2?: number | null,
      createdAt: string,
      ec?: number | null,
      greenhouseId: string,
      moisture?: number | null,
      sensorId: string,
      sensorType: string,
      solar?: number | null,
      temperature?: number | null,
      timestamp: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListSensorDataBySensorIdAndTimestampQueryVariables = {
  filter?: ModelSensorDataFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sensorId: string,
  sortDirection?: ModelSortDirection | null,
  timestamp?: ModelStringKeyConditionInput | null,
};

export type ListSensorDataBySensorIdAndTimestampQuery = {
  listSensorDataBySensorIdAndTimestamp?:  {
    __typename: "ModelSensorDataConnection",
    items:  Array< {
      __typename: "SensorData",
      co2?: number | null,
      createdAt: string,
      ec?: number | null,
      greenhouseId: string,
      moisture?: number | null,
      sensorId: string,
      sensorType: string,
      solar?: number | null,
      temperature?: number | null,
      timestamp: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUserGreenhousesQueryVariables = {
  filter?: ModelUserGreenhousesFilterInput | null,
  greenhouseId?: ModelStringKeyConditionInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
  userId?: string | null,
};

export type ListUserGreenhousesQuery = {
  listUserGreenhouses?:  {
    __typename: "ModelUserGreenhousesConnection",
    items:  Array< {
      __typename: "UserGreenhouses",
      co2Sensors?: Array< string | null > | null,
      createdAt?: string | null,
      greenhouseId: string,
      greenhouseName?: string | null,
      soilSensors?: Array< string | null > | null,
      solarSensors?: Array< string | null > | null,
      updatedAt?: string | null,
      userId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreateSensorDataMutationVariables = {
  condition?: ModelSensorDataConditionInput | null,
  input: CreateSensorDataInput,
};

export type CreateSensorDataMutation = {
  createSensorData?:  {
    __typename: "SensorData",
    co2?: number | null,
    createdAt: string,
    ec?: number | null,
    greenhouseId: string,
    moisture?: number | null,
    sensorId: string,
    sensorType: string,
    solar?: number | null,
    temperature?: number | null,
    timestamp: string,
    updatedAt: string,
  } | null,
};

export type CreateUserGreenhousesMutationVariables = {
  condition?: ModelUserGreenhousesConditionInput | null,
  input: CreateUserGreenhousesInput,
};

export type CreateUserGreenhousesMutation = {
  createUserGreenhouses?:  {
    __typename: "UserGreenhouses",
    co2Sensors?: Array< string | null > | null,
    createdAt?: string | null,
    greenhouseId: string,
    greenhouseName?: string | null,
    soilSensors?: Array< string | null > | null,
    solarSensors?: Array< string | null > | null,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type DeleteSensorDataMutationVariables = {
  condition?: ModelSensorDataConditionInput | null,
  input: DeleteSensorDataInput,
};

export type DeleteSensorDataMutation = {
  deleteSensorData?:  {
    __typename: "SensorData",
    co2?: number | null,
    createdAt: string,
    ec?: number | null,
    greenhouseId: string,
    moisture?: number | null,
    sensorId: string,
    sensorType: string,
    solar?: number | null,
    temperature?: number | null,
    timestamp: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserGreenhousesMutationVariables = {
  condition?: ModelUserGreenhousesConditionInput | null,
  input: DeleteUserGreenhousesInput,
};

export type DeleteUserGreenhousesMutation = {
  deleteUserGreenhouses?:  {
    __typename: "UserGreenhouses",
    co2Sensors?: Array< string | null > | null,
    createdAt?: string | null,
    greenhouseId: string,
    greenhouseName?: string | null,
    soilSensors?: Array< string | null > | null,
    solarSensors?: Array< string | null > | null,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type UpdateSensorDataMutationVariables = {
  condition?: ModelSensorDataConditionInput | null,
  input: UpdateSensorDataInput,
};

export type UpdateSensorDataMutation = {
  updateSensorData?:  {
    __typename: "SensorData",
    co2?: number | null,
    createdAt: string,
    ec?: number | null,
    greenhouseId: string,
    moisture?: number | null,
    sensorId: string,
    sensorType: string,
    solar?: number | null,
    temperature?: number | null,
    timestamp: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserGreenhousesMutationVariables = {
  condition?: ModelUserGreenhousesConditionInput | null,
  input: UpdateUserGreenhousesInput,
};

export type UpdateUserGreenhousesMutation = {
  updateUserGreenhouses?:  {
    __typename: "UserGreenhouses",
    co2Sensors?: Array< string | null > | null,
    createdAt?: string | null,
    greenhouseId: string,
    greenhouseName?: string | null,
    soilSensors?: Array< string | null > | null,
    solarSensors?: Array< string | null > | null,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type OnCreateSensorDataSubscriptionVariables = {
  filter?: ModelSubscriptionSensorDataFilterInput | null,
};

export type OnCreateSensorDataSubscription = {
  onCreateSensorData?:  {
    __typename: "SensorData",
    co2?: number | null,
    createdAt: string,
    ec?: number | null,
    greenhouseId: string,
    moisture?: number | null,
    sensorId: string,
    sensorType: string,
    solar?: number | null,
    temperature?: number | null,
    timestamp: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserGreenhousesSubscriptionVariables = {
  filter?: ModelSubscriptionUserGreenhousesFilterInput | null,
};

export type OnCreateUserGreenhousesSubscription = {
  onCreateUserGreenhouses?:  {
    __typename: "UserGreenhouses",
    co2Sensors?: Array< string | null > | null,
    createdAt?: string | null,
    greenhouseId: string,
    greenhouseName?: string | null,
    soilSensors?: Array< string | null > | null,
    solarSensors?: Array< string | null > | null,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type OnDeleteSensorDataSubscriptionVariables = {
  filter?: ModelSubscriptionSensorDataFilterInput | null,
};

export type OnDeleteSensorDataSubscription = {
  onDeleteSensorData?:  {
    __typename: "SensorData",
    co2?: number | null,
    createdAt: string,
    ec?: number | null,
    greenhouseId: string,
    moisture?: number | null,
    sensorId: string,
    sensorType: string,
    solar?: number | null,
    temperature?: number | null,
    timestamp: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserGreenhousesSubscriptionVariables = {
  filter?: ModelSubscriptionUserGreenhousesFilterInput | null,
};

export type OnDeleteUserGreenhousesSubscription = {
  onDeleteUserGreenhouses?:  {
    __typename: "UserGreenhouses",
    co2Sensors?: Array< string | null > | null,
    createdAt?: string | null,
    greenhouseId: string,
    greenhouseName?: string | null,
    soilSensors?: Array< string | null > | null,
    solarSensors?: Array< string | null > | null,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type OnUpdateSensorDataSubscriptionVariables = {
  filter?: ModelSubscriptionSensorDataFilterInput | null,
};

export type OnUpdateSensorDataSubscription = {
  onUpdateSensorData?:  {
    __typename: "SensorData",
    co2?: number | null,
    createdAt: string,
    ec?: number | null,
    greenhouseId: string,
    moisture?: number | null,
    sensorId: string,
    sensorType: string,
    solar?: number | null,
    temperature?: number | null,
    timestamp: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserGreenhousesSubscriptionVariables = {
  filter?: ModelSubscriptionUserGreenhousesFilterInput | null,
};

export type OnUpdateUserGreenhousesSubscription = {
  onUpdateUserGreenhouses?:  {
    __typename: "UserGreenhouses",
    co2Sensors?: Array< string | null > | null,
    createdAt?: string | null,
    greenhouseId: string,
    greenhouseName?: string | null,
    soilSensors?: Array< string | null > | null,
    solarSensors?: Array< string | null > | null,
    updatedAt?: string | null,
    userId: string,
  } | null,
};
