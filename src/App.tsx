import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// import { useState, useEffect } from 'react';
import { deleteUser } from 'aws-amplify/auth';
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

