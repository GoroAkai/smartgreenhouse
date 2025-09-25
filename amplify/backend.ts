import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
// import { fetchLatestSensorData } from './functions/fetch-latest-sensor-data/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
export const backend = defineBackend({
  auth,
  data,
  // fetchLatestSensorData,
});
const { cfnUserPool } = backend.auth.resources.cfnResources;

// パスワードポリシーを変更
cfnUserPool.policies = {
  passwordPolicy: {
    minimumLength: 8,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: false,
    requireUppercase: true,
  },
};

// メールテンプレートを日本語にカスタマイズ
cfnUserPool.verificationMessageTemplate = {
  emailSubject: 'アカウント確認コード - スマート温室管理システム',
  emailMessage: `
スマート温室管理システムへのご登録ありがとうございます。

アカウントの確認コードは以下の通りです：

{####}

このコードをアプリケーションに入力してアカウントの確認を完了してください。
  `,
  defaultEmailOption: 'CONFIRM_WITH_CODE',
};

// パスワードリセット用のメールテンプレートも日本語化
cfnUserPool.emailConfiguration = {
  emailSendingAccount: 'COGNITO_DEFAULT',
};

// 招待メールのテンプレートも日本語化
cfnUserPool.adminCreateUserConfig = {
  allowAdminCreateUserOnly: false,
  inviteMessageTemplate: {
    emailSubject: 'スマート温室管理システムへの招待',
    emailMessage: `
こんにちは！

スマート温室管理システムにご招待いたします。

ユーザー名: {username}
仮パスワード: {####}

初回ログイン時にパスワードの変更が必要です。

ログインURL: https://your-app-url.com

よろしくお願いいたします。

スマート温室管理システム チーム
    `,
  },
};

// Lambda関数にテーブル名を環境変数として渡す（後で使用）
// const sensorDataTable = backend.data.resources.tables["SensorData"];
// const userGreenhousesTable = backend.data.resources.tables["UserGreenhouses"];
// backend.fetchLatestSensorData.addEnvironment("SENSOR_DATA_TABLE_NAME", sensorDataTable.tableName);
// backend.fetchLatestSensorData.addEnvironment("USER_GREENHOUSES_TABLE_NAME", userGreenhousesTable.tableName);
