import { defineData } from '@aws-amplify/backend';

export const data = defineData({
    schema: `
    type SensorData @model
      @auth(rules: [
        { allow: public, provider: apiKey, operations: [read] },
        { allow: authenticated, operations: [create, read, update, delete] }
      ]) {
      sensorId: String!
      timestampGreenhouseId: String!
      greenhouseId: String!
      timestamp: String!
      sensorType: String
      temperature: Float
      moisture: Float
      ec: Float
      co2: Float
      solar: Float
    }
  `,
});


// import { defineData } from '@aws-amplify/backend';

// export const data = defineData({
//     schema: {
//         SensorData: (model) =>
//             model
//                 .identifier(['sensorId', 'timestampGreenhouseId']) // PK + SK
//                 .fields({
//                     sensorId: model.string().required(),
//                     // SKを構成する複合値（timestamp#greenhouseId）
//                     timestampGreenhouseId: model.string().required(),

//                     // GSI用のフィールド
//                     greenhouseId: model.string().required(),
//                     timestamp: model.string().required(),

//                     // その他のセンサーデータ
//                     sensorType: model.string(),
//                     temperature: model.float(),
//                     moisture: model.float(),
//                     ec: model.float(),
//                     co2: model.float(),
//                     solar: model.float(),
//                 })
//                 .indexes({
//                     byGreenhouseAndTime: (index) =>
//                         index
//                             .partitionKey('greenhouseId')
//                             .sortKey('timestamp'),
//                 })
//                 .authorization((allow) => [
//                     allow.authenticated(), // Cognitoユーザーのみアクセス可
//                 ]),
//     }
// });