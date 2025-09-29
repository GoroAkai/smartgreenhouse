import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import { deleteUser } from '@aws-amplify/auth';
import outputs from '../amplify_outputs.json';
import './App.css';
import { I18n } from '@aws-amplify/core';
import { translations } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';

// Amplifyの設定
Amplify.configure(outputs);


I18n.putVocabularies(translations);
I18n.setLanguage('ja');
I18n.putVocabularies({
  ja: {
    'Password must have at least 8 characters': 'パスワードは8文字以上にしてください',
    'Password must have upper case letters': 'パスワードは大文字を含めてください',
    'Password must have lower case letters': 'パスワードは小文字を含めてください',
    'Password must have numbers': 'パスワードは数字を含めてください',
    'Password must have special characters': 'パスワードは特殊文字を含めてください',
    'Your passwords must match': 'パスワードが一致しません',
    'Incorrect username or password.': 'ユーザー名またはパスワードが正しくありません',
    'Enter your email': 'メールアドレスを入力してください',
    'Attempt limit exceeded, please try after some time.': '試行回数の制限を超えました。時間をおいてからやり直してください。',
    'Invalid verification code provided, please try again.': '無効な確認コードです。もう一度お試しください。',
  },
});

export function App() {
  // children のレンダープロップ内でフックを直接使わないようにする
  // signOut は optional で引数を受け取る可能性があるため any で許容する
  const AuthenticatedContent: React.FC<{ user: any; signOut?: (...args: any[]) => void }> = ({ user, signOut }) => {
    const navigate = useNavigate();

    // アカウント削除（確認ダイアログを出す）
    const handleDeleteAccount = async () => {
      if (confirm('本当にアカウントを削除しますか？この操作は元に戻せません。')) {
        try {
          await deleteUser();
          alert('アカウントが削除されました。');
          navigate('/'); // ホーム画面など適切な場所にリダイレクト
        } catch (error) {
          console.error('アカウント削除中にエラーが発生しました:', error);
          alert('アカウントの削除に失敗しました。もう一度お試しください。');
        }
      }
    };

    React.useEffect(() => {
      if (user) {
        navigate('/greenhousesetup');
      }
    }, [user, navigate]);

    return (
      <div>
        <h4>Hello, {user?.username}</h4>
        <hr />
        <div className="button-flex-group-row">
          <button onClick={() => signOut?.()}>サインアウト</button>
          <button onClick={handleDeleteAccount} style={{ color: 'white', background: 'crimson' }}>アカウント削除</button>
          {/* deleteUser を直接ボタンに渡すのは挙動が不明瞭なので削除／実装する場合は別処理に */}
          <button onClick={() => navigate('/greenhousesetup')}>温室登録へ</button>
        </div>
        <hr />
      </div>
    );
  };

  return (
    <div className="auth-wrapper">
      <Authenticator
        signUpAttributes={['email']}
        initialState="signIn"
      >
        {({ user, signOut }) => <AuthenticatedContent user={user} signOut={signOut} />}
      </Authenticator>
    </div >
  );
}

export default App;

