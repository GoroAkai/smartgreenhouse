import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { useState, useEffect } from 'react';
import { getCurrentUser, signOut, signIn, deleteUser } from 'aws-amplify/auth';
import './App.css';
import { I18n } from '@aws-amplify/core';
import { translations } from '@aws-amplify/ui-react';
I18n.putVocabularies(translations);
I18n.setLanguage('ja');
I18n.putVocabularies({
  ja: { // 日本語の翻訳を追加
    'Password must have at least 8 characters': 'パスワードは8文字以上にしてください',
    'Password must have upper case letters': 'パスワードは大文字を含めてください',
    'Password must have lower case letters': 'パスワードは小文字を含めてください',
    'Password must have numbers': 'パスワードは数字を含めてください',
    'Password must have special characters': 'パスワードは特殊文字を含めてください',
    'Your passwords must match': 'パスワードが一致しません',
    'Incorrect username or password.': 'ユーザー名またはパスワードが正しくありません',
    'Enter your email': 'メールアドレスを入力してください',
  },
});
export function App() {
  // const [user, setUser] = useState<any>(null);
  // const [loading, setLoading] = useState(true);

  return (
    <div className="auth-wrapper">
      <Authenticator>
        {({ user, signOut }) => (
          <div>
            <h4>Hello, {user?.username}</h4>
            <hr />
            <div className="button-flex-group-row">
              <button onClick={signOut}>サインアウト</button>
              <button onClick={deleteUser}>アカウント削除</button>
            </div>
          </div>
        )}
      </Authenticator>
    </div>
  );
}
export default App;


// import { Authenticator } from '@aws-amplify/ui-react';
// import '@aws-amplify/ui-react/styles.css';
// import { Amplify } from 'aws-amplify';
// import { generateClient } from 'aws-amplify/data';
// import { I18n } from '@aws-amplify/core';
// import { translations } from '@aws-amplify/ui-react';
// import type { Schema } from '../amplify/data/resource';

// Try to import amplify_outputs.json, fallback to environment variables if not available
// let outputs;
// try {
//   outputs = require("./amplify_outputs.json");
// } catch (error) {
// Fallback configuration for production deployment
//   outputs = {
//     auth: {
//       user_pool_id: process.env.REACT_APP_USER_POOL_ID,
//       aws_region: process.env.REACT_APP_AWS_REGION || 'ap-northeast-1',
//       user_pool_client_id: process.env.REACT_APP_USER_POOL_CLIENT_ID,
//       identity_pool_id: process.env.REACT_APP_IDENTITY_POOL_ID,
//       // Add other necessary configuration
//     },
//     data: {
//       url: process.env.REACT_APP_GRAPHQL_URL,
//       aws_region: process.env.REACT_APP_AWS_REGION || 'ap-northeast-1',
//       default_authorization_type: "AWS_IAM",
//       authorization_types: ["AMAZON_COGNITO_USER_POOLS"]
//     }
//   };
// }
// I18n.putVocabularies(translations);
// I18n.setLanguage('ja');
// I18n.putVocabularies({
//   ja: { // 日本語の翻訳を追加
//     'Password must have at least 8 characters': 'パスワードは8文字以上にしてください',
//     'Password must have upper case letters': 'パスワードは大文字を含めてください',
//     'Password must have lower case letters': 'パスワードは小文字を含めてください',
//     'Password must have numbers': 'パスワードは数字を含めてください',
//     'Password must have special characters': 'パスワードは特殊文字を含めてください',
//     'Your passwords must match': 'パスワードが一致しません',
//     'Incorrect username or password.': 'ユーザー名またはパスワードが正しくありません',
//     'Enter your email': 'メールアドレスを入力してください',
//   },
// });
// Amplify UI に翻訳を適用（Amplify.configure() の前に呼び出す）
// Amplify.configure(outputs);

// const client = generateClient<Schema>();



// export default App;

// export default function App() {
//   const [sensorData, setSensorData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   const fetchSensorData = async () => {
//     setLoading(true);
//     try {
//       const result = await client.models.SensorData.list();
//       setSensorData(result.data || []);
//     } catch (error) {
//       console.error('Error fetching sensor data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createSampleData = async () => {
//     try {
//       await client.models.SensorData.create({
//         sensorId: `sensor-${Date.now()}`,
//         timestampGreenhouseKey: `${new Date().toISOString().split('T')[0]}#GH01`,
//         timestamp: new Date().toISOString(),
//         greenhouseId: 'GH01',
//         sensorType: 'soil',
//         temperature: Math.random() * 10 + 20, // 20-30度
//         moisture: Math.random() * 20 + 40,    // 40-60%
//         ec: Math.random() * 1 + 1.5,          // 1.5-2.5
//         co2: Math.random() * 200 + 350,       // 350-550ppm
//         solarlight: Math.random() * 500 + 800, // 800-1300
//       });
//       fetchSensorData(); // データを再取得
//     } catch (error) {
//       console.error('Error creating sensor data:', error);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <Authenticator>
//         {({ signOut, user }) => (
//           <main className="main-content">
//             <h1>こんにちは {user?.username}</h1>
//             <div style={{ margin: '20px 0' }}>
//               <button onClick={signOut} style={{ marginRight: '10px' }}>
//                 サインアウト
//               </button>
//               <button onClick={fetchSensorData} disabled={loading} style={{ marginRight: '10px' }}>
//                 {loading ? '読み込み中...' : 'センサーデータを取得'}
//               </button>
//               <button onClick={createSampleData}>
//                 サンプルデータを作成
//               </button>
//             </div>

//             <div>
//               <h2>センサーデータ ({sensorData.length}件)</h2>
//               {sensorData.length > 0 ? (
//                 <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
//                   {sensorData.map((data, index) => (
//                     <div key={data.id || index} style={{
//                       border: '1px solid #ccc',
//                       margin: '10px 0',
//                       padding: '10px',
//                       borderRadius: '5px'
//                     }}>
//                       <p><strong>センサーID:</strong> {data.sensorId}</p>
//                       <p><strong>温室ID:</strong> {data.greenhouseId}</p>
//                       <p><strong>温度:</strong> {data.temperature}°C</p>
//                       <p><strong>湿度:</strong> {data.moisture}%</p>
//                       <p><strong>EC:</strong> {data.ec}</p>
//                       <p><strong>CO2:</strong> {data.co2}ppm</p>
//                       <p><strong>太陽光:</strong> {data.solarlight}</p>
//                       <p><strong>タイムスタンプ:</strong> {new Date(data.timestamp).toLocaleString('ja-JP')}</p>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p>データがありません。「サンプルデータを作成」ボタンでデータを追加してください。</p>
//               )}
//             </div>
//           </main>
//         )}
//       </Authenticator>
//     </div>
//   );
// }
