import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Input,
    Button,
    VStack,
    Box,
    Text,
    Stack,
    Spinner,
    Heading
} from '@chakra-ui/react';
import { generateClient } from 'aws-amplify/data';
import { getCurrentUser, signOut, deleteUser } from 'aws-amplify/auth';
import type { Schema } from '../../amplify/data/resource';
import { v4 as uuidv4 } from 'uuid';
import { toJSTISOString } from '../utils/uty';

const client = generateClient<Schema>();

// Amplify生成型を使用
type Greenhouse = Schema['UserGreenhouses']['type'];

const GreenhouseSetup = () => {
    const [name, setName] = useState('');
    const [greenhouses, setGreenhouses] = useState<Greenhouse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [signingOut, setSigningOut] = useState(false);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const navigate = useNavigate();

    // サインアウト処理
    const handleSignOut = async () => {
        try {
            setSigningOut(true);
            await signOut();
            navigate('/'); // サインイン画面へ遷移
        } catch (err) {
            console.error('サインアウトに失敗:', err);
            setError('サインアウトに失敗しました');
        } finally {
            setSigningOut(false);
        }
    };
    // アカウント削除処理
    const handleDeleteAccount = async () => {
        if (!confirm('本当にアカウントを削除しますか？この操作は元に戻せません。')) return;
        try {
            setSigningOut(true);
            await deleteUser();
            // 念のためサインアウトしてセッションをクリア
            try { await signOut(); } catch (_) { /* ignore */ }
            navigate('/'); // サインイン画面へ遷移
        } catch (err) {
            console.error('アカウント削除に失敗:', err);
            setError('アカウント削除に失敗しました');
        } finally {
            setSigningOut(false);
        }
    };    // ユーザーの温室データを取得
    useEffect(() => {
        const fetchUserGreenhouses = async () => {
            try {
                setLoading(true);

                // 現在のユーザーIDを取得
                const user = await getCurrentUser();
                const userId = user.userId;
                setCurrentUserId(userId);

                // DynamoDB UserGreenhousesテーブルからユーザーの登録した温室一覧を取得
                const { data: userGreenhouses } = await client.models.UserGreenhouses.list({
                    filter: {
                        userId: {
                            eq: userId
                        }
                    }
                });

                // デバッグ用ログ
                console.log('取得したデータ:', userGreenhouses);

                // nullや無効なデータをフィルタリング
                const validGreenhouses = (userGreenhouses || []).filter(
                    (greenhouse): greenhouse is NonNullable<typeof greenhouse> => {
                        const isValid = greenhouse !== null &&
                            greenhouse !== undefined &&
                            typeof greenhouse.userId === 'string' &&
                            typeof greenhouse.greenhouseId === 'string';

                        if (!isValid) {
                            console.log('無効なデータを除外:', greenhouse);
                        }
                        return isValid;
                    }
                ) as Greenhouse[];

                console.log('フィルタリング後のデータ:', validGreenhouses);

                setGreenhouses(validGreenhouses);
            } catch (err) {
                console.error('温室データの取得に失敗:', err);
                setError('温室データの取得に失敗しました');
            } finally {
                setLoading(false);
            }
        };

        fetchUserGreenhouses();
    }, []);

    // 新しい温室を登録
    const handleRegister = async () => {
        if (!currentUserId || name.trim() === '') return;

        try {
            const greenhouseId = uuidv4(); // 新しい温室IDを生成

            // UserGreenhousesテーブルに新しい温室を保存
            await client.models.UserGreenhouses.create({
                userId: currentUserId,
                greenhouseId,
                greenhouseName: name.trim(),
                createdAt: toJSTISOString(new Date()),
                updatedAt: toJSTISOString(new Date())
            });

            // 登録後、新しく登録したセンサーの状態を表示するSensorDashboardに遷移
            navigate('/dashboard', {
                state: {
                    greenhouse: {
                        id: greenhouseId,
                        name: name.trim()
                    }
                }
            });
        } catch (err) {
            console.error('温室の登録に失敗:', err);
            setError('温室の登録に失敗しました');
        }
    };

    // 既存の温室を選択
    const handleSelectGreenhouse = (greenhouse: Greenhouse) => {
        navigate('/dashboard', {
            state: {
                greenhouse: {
                    id: greenhouse.greenhouseId,
                    name: greenhouse.greenhouseName || '名前なし'
                }
            }
        });
    };

    if (loading) {
        return (
            <VStack gap={10} mt={10}>
                <Spinner size="xl" />
                <Text>温室データを読み込み中...</Text>
            </VStack>
        );
    }

    if (error) {
        return (
            <VStack gap={10} mt={10}>
                <Box p={4} bg="red.100" borderRadius="md" borderColor="red.300" borderWidth={1}>
                    <Text color="red.700">{error}</Text>
                </Box>
            </VStack>
        );
    }

    return (
        <VStack gap={10} mt={10}>
            {/* 右上にサインアウトボタン */}
            <Box width="100%" display="flex" justifyContent="flex-end">
                <Button
                    colorScheme="red"
                    variant="ghost"
                    onClick={handleSignOut}
                    loading={signingOut}
                >
                    サインアウト
                </Button>
            </Box>
            <Box width="100%" display="flex" justifyContent="flex-end">
                <Button
                    colorScheme="red"
                    variant="solid"
                    onClick={handleDeleteAccount}
                    loading={signingOut}
                >
                    アカウント削除
                </Button>
            </Box>
            {greenhouses.length > 0 ? (
                // 既存の温室がある場合：リスト表示
                <>
                    <Heading size="md">登録済みの温室</Heading>
                    <Box width="70%" maxWidth={600}>
                        <Stack gap={3}>
                            {greenhouses
                                .filter(greenhouse => greenhouse && greenhouse.greenhouseId)
                                .map((greenhouse) => (
                                    <Button
                                        key={greenhouse.greenhouseId}
                                        width="100%"
                                        variant="outline"
                                        colorScheme="teal"
                                        onClick={() => handleSelectGreenhouse(greenhouse)}
                                        p={4}
                                        h="auto"
                                    >
                                        <VStack gap={1}>
                                            <Text fontWeight="bold">
                                                {greenhouse.greenhouseName || '名前なし'}
                                            </Text>
                                            <Text fontSize="sm" color="gray.500">
                                                ID: {greenhouse.greenhouseId.slice(0, 8)}...
                                            </Text>
                                        </VStack>
                                    </Button>
                                ))}
                        </Stack>
                    </Box>

                    <Text fontSize="sm" color="gray.600">または新しい温室を追加:</Text>

                    <Input
                        width="70%"
                        maxWidth={600}
                        placeholder="新しい温室の名前を入力"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Button
                        onClick={handleRegister}
                        colorScheme="teal"
                        disabled={name.trim() === ''}
                    >
                        新しい温室を登録
                    </Button>
                </>
            ) : (
                // 温室がない場合：新規登録フォーム
                <>
                    <Heading size="md">温室を登録してください</Heading>
                    <Input
                        width="70%"
                        maxWidth={600}
                        placeholder="温室の名前を入力"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Button
                        onClick={handleRegister}
                        colorScheme="teal"
                        disabled={name.trim() === ''}
                    >
                        登録してセンサー一覧へ
                    </Button>
                </>
            )}
        </VStack>
    );
};

export default GreenhouseSetup;