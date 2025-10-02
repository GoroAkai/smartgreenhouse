import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';


// 環境に応じたサフィックスを決定
const getEnvironmentSuffix = () => {
  const branch = process.env.AWS_BRANCH;
  console.log('🔍 Environment variables:');
  console.log('  AWS_BRANCH:', branch);
  console.log('  NODE_ENV:', process.env.NODE_ENV);
  console.log('  All env vars:', Object.keys(process.env).filter(key => key.startsWith('AWS_')));

  if (!branch) return 'LOCAL'; // サンドボックス環境

  switch (branch) {
    case 'develop':
      return 'DEV';
    case 'main':
      return 'PROD';
    default:
      return branch.toUpperCase();
  }
};

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
export const backend = defineBackend({
  auth,
  data,
});

const { cfnUserPool } = backend.auth.resources.cfnResources;

const tables = backend.data.resources.tables;

// 環境サフィックスをログ出力
console.log(`Available tables:`, Object.keys(tables));
console.log('AWS_BRANCH:', process.env.AWS_BRANCH);

// DynamoDBテーブル名をカスタマイズ
const environmentSuffix = getEnvironmentSuffix();
console.log('Determined environment suffix:', environmentSuffix);

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

// シンプルなメールテンプレート
cfnUserPool.verificationMessageTemplate = {
  emailSubject: 'アカウント確認コード - スマート温室管理システム',
  emailMessage: 'スマート温室管理システムへのご登録ありがとうございます。<br><br>アカウントの確認コードは【{####}】です。 <br>この6桁の数字をアプリの「確認コード」欄に入力してください。<br><br>スマート温室管理システム チーム',
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
