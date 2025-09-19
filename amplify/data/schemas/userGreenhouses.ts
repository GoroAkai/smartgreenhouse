import { a } from '@aws-amplify/backend';

export const userGreenhousesModel = a
    .model({
        userId: a.string().required(),
        greenhouseId: a.string().required(),
        greenhouseName: a.string(),
        createdAt: a.timestamp(),
    })
    .identifier(['userId', 'greenhouseId'])
    .secondaryIndexes((index) => [
        index('userId').sortKeys(['greenhouseId']).name('byUserAndGreenhouse'),
    ])
    .authorization((allow) => [allow.authenticated()]);