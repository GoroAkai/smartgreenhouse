// 環境識別ユーティリティ
export const getEnvironmentInfo = () => {
    const hostname = window.location.hostname;

    if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
        return {
            environment: 'LOCAL',
            suffix: 'LOCAL',
            isDevelopment: true
        };
    } else if (hostname.includes('develop')) {
        return {
            environment: 'DEV',
            suffix: 'DEV',
            isDevelopment: true
        };
    } else {
        return {
            environment: 'PROD',
            suffix: 'PROD',
            isDevelopment: false
        };
    }
};

// デバッグ用：現在の環境を表示
export const logEnvironmentInfo = () => {
    const env = getEnvironmentInfo();
    console.log('Current Environment:', env);
    return env;
};