import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.

テーブル名はローカルのsamdboxで作成した場合には末尾に-NONEが付きます。
=========================================================================*/
const schema = a.schema({
  SensorData: a
    .model({
      sensorId: a.string().required(),   // パーティションキー
      timestampGreenhouseKey: a.string().required(),  // ソートキー
      timestamp: a.string().required(),     // タイムスタンプ
      greenhouseId: a.string().required(),  // 温室ID
      sensorType: a.string().required(),    // soil, co2, light など
      temperature: a.float().required(), // 土壌温度
      moisture: a.float().required(), // 水分率
      ec: a.float().required(), // 電気伝導率
      co2: a.float(),         // CO2
      solarlight: a.float(),  // 太陽光
    })
    .identifier(['sensorId', 'timestampGreenhouseKey'])  // 複合主キー（sensorId + houseName）
    .authorization((allow) => [allow.authenticated('identityPool')]),

  UserGreenhouses: a
    .model({
      userId: a.string().required(),       // Cognitoのsub
      greenhouseId: a.string().required(), // 紐づく温室ID
      greenhouseName: a.string(),
      createdAt: a.datetime(),
    })
    .identifier(['userId', 'greenhouseId'])
    .authorization((allow) => [allow.authenticated('identityPool')]),

});

export type Schema = ClientSchema<typeof schema>;
export const data = defineData({
  schema,
  name: "SoilSensorDataApi", // AppSyncやDynamoDBの識別名
  authorizationModes: {
    defaultAuthorizationMode: 'identityPool',
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
