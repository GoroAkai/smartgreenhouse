// import { defineData } from '@aws-amplify/backend';

// export const data = defineData({
//     UserGreenhouses: (model) =>
//         model
//             .identifier(['userId', 'greenhouseId']) // PK + SK
//             .fields({
//                 userId: model.string().required(),
//                 greenhouseId: model.string().required(),
//                 // その他のセンサーデータ
//                 greenhouseName: model.string(),
//                 createdAt: model.float(),
//             })
//             .indexes({
//                 byUserAndGreenhouse: (index) =>
//                     index
//                         .partitionKey('userId')
//                         .sortKey('greenhouseId'),
//             })
//             .authorization((allow) => [
//                 allow.authenticated(), // Cognitoユーザーのみアクセス可
//             ]),
// });

import { defineData } from '@aws-amplify/backend';

export const data = defineData({
    schema: `
    type UserGreenhouses @model
    @auth(rules: [
        { allow: public, provider: apiKey, operations: [read] },
        { allow: authenticated, operations: [create, read, update, delete] }
    ]) {
        userId: String!
        greenhouseId: String!
        greenhouseName: String!
        createdAt: String!
      }
  `,
});
