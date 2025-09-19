import { defineData } from '@aws-amplify/backend';

export const data = defineData({
    UserGreenhouses: (model) =>
        model
            .identifier(['userId', 'greenhouseId']) // PK + SK
            .fields({
                userId: model.string().required(),
                greenhouseId: model.string().required(),
                // その他のセンサーデータ
                greenhouseName: model.string(),
                createdAt: model.float(),
            })
            .indexes({
                byUserAndGreenhouse: (index) =>
                    index
                        .partitionKey('userId')
                        .sortKey('greenhouseId'),
            })
            .authorization((allow) => [
                allow.authenticated(), // Cognitoユーザーのみアクセス可
            ]),
});