import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Box,
    Heading,
    SimpleGrid,
    Spinner,
    Text,
    VStack,
    Alert,
    Input,
    HStack,
    IconButton
} from '@chakra-ui/react';
import { generateClient } from 'aws-amplify/data';
import { getCurrentUser } from 'aws-amplify/auth';
import type { Schema } from '../../amplify/data/resources';
import SensorCard from '../components/SensorCard';
import SensorDataChart from '../components/SensorDataChart';
import { SensorReading, SensorType } from '../types/sensor';

const client = generateClient<Schema>();

interface GreenhouseState {
    id: string;
    name: string;
}

// Amplify生成型を使用
type SensorData = Schema['SensorData']['type'];

const SensorDashboard = () => {
    const location = useLocation();
    const greenhouse = location.state?.greenhouse as GreenhouseState;

    const [sensorData, setSensorData] = useState<SensorData[]>([]);
    const [sensorInfoMap, setSensorInfoMap] = useState<Map<string, Schema['SensorInfo']['type']>>(() => {
        // ローカルストレージからセンサー名を復元
        try {
            const stored = localStorage.getItem(`sensorNames_${greenhouse?.id}`);
            if (stored) {
                const parsed = JSON.parse(stored);
                return new Map(Object.entries(parsed));
            }
        } catch (error) {
            console.error('ローカルストレージからのセンサー名復元に失敗:', error);
        }
        return new Map();
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // グラフ表示用の状態
    const [chartModalOpen, setChartModalOpen] = useState(false);
    const [chartData, setChartData] = useState<SensorData[]>([]);
    const [chartLoading, setChartLoading] = useState(false);
    const [selectedSensorId, setSelectedSensorId] = useState<string>('');
    const [selectedDataType, setSelectedDataType] = useState<'temperature' | 'moisture' | 'ec' | 'co2' | 'solar'>('temperature');

    // 温室名編集用の状態
    const [isEditingName, setIsEditingName] = useState(false);
    const [editedName, setEditedName] = useState(greenhouse?.name || '');
    const [nameUpdateLoading, setNameUpdateLoading] = useState(false);

    useEffect(() => {
        const fetchSensorData = async () => {
            if (!greenhouse?.id) {
                setError('温室情報が見つかりません');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                // センサー情報を取得（テーブルが存在しない場合はスキップ）
                let infoMap = new Map();
                console.log('SensorInfoテーブルの存在確認:', !!client.models.SensorInfo);

                if (client.models.SensorInfo) {
                    try {
                        console.log('SensorInfoテーブルからデータを取得中...');
                        const { data: sensorInfoData } = await client.models.SensorInfo.list({
                            filter: {
                                greenhouseId: { eq: greenhouse.id }
                            }
                        });

                        console.log('SensorInfoデータ取得成功:', sensorInfoData);
                        // センサー情報をMapに変換
                        if (sensorInfoData) {
                            sensorInfoData.forEach(info => {
                                if (info) {
                                    infoMap.set(info.sensorId, info);
                                }
                            });
                        }
                    } catch (sensorInfoError) {
                        console.error('SensorInfoテーブルからのデータ取得に失敗:', sensorInfoError);
                    }
                } else {
                    console.log('SensorInfoテーブルがまだ作成されていません。ローカルストレージから復元します。');
                }
                setSensorInfoMap(infoMap);

                // 現在のユーザーIDを取得
                const user = await getCurrentUser();
                const userId = user.userId;

                // UserGreenhousesテーブルから温室情報とセンサーIDリストを取得
                const { data: userGreenhouseData } = await client.models.UserGreenhouses.get({
                    userId: userId,
                    greenhouseId: greenhouse.id
                });

                if (!userGreenhouseData) {
                    setError('温室データが見つかりません');
                    setLoading(false);
                    return;
                }

                // 登録されているセンサーIDを収集
                const allSensorIds = [
                    ...(userGreenhouseData.soilSensors || []),
                    ...(userGreenhouseData.co2Sensors || []),
                    ...(userGreenhouseData.solarSensors || [])
                ].filter(id => id !== null && id !== undefined);

                if (allSensorIds.length === 0) {
                    setSensorData([]);
                    setLoading(false);
                    return;
                }

                // 各センサーIDの最新データを効率的に取得
                const sensorDataPromises = allSensorIds.map(async (sensorId) => {
                    try {
                        // 通常のlistメソッドを使用（GSIの問題を回避）
                        const { data: sensorReadings } = await client.models.SensorData.list({
                            filter: {
                                sensorId: { eq: sensorId },
                                greenhouseId: { eq: greenhouse.id }
                            }
                        });

                        if (!sensorReadings || sensorReadings.length === 0) {
                            return null;
                        }

                        // timestampで降順ソートして最新のデータを取得
                        const sortedReadings = sensorReadings
                            .filter(reading => reading && reading.timestamp)
                            .sort((a, b) => {
                                const dateA = new Date(a.timestamp);
                                const dateB = new Date(b.timestamp);
                                return dateB.getTime() - dateA.getTime();
                            });

                        return sortedReadings[0] || null;
                    } catch (error) {
                        console.error(`センサー ${sensorId} のデータ取得に失敗:`, error);
                        return null;
                    }
                });

                const results = await Promise.all(sensorDataPromises);
                const validSensorData = results.filter((data): data is NonNullable<typeof data> => data !== null);

                setSensorData(validSensorData);

            } catch (err) {
                setError('センサーデータの取得に失敗しました');
            } finally {
                setLoading(false);
            }
        };

        fetchSensorData();
    }, [greenhouse?.id]);

    // 温室情報が変更された時に編集状態をリセット
    useEffect(() => {
        setEditedName(greenhouse?.name || '');
        setIsEditingName(false);
    }, [greenhouse?.name]);

    // グラフ用データ取得関数
    const fetchChartData = async (sensorId: string, dataType: 'temperature' | 'moisture' | 'ec' | 'co2' | 'solar') => {
        setChartLoading(true);
        try {
            // 過去30件のデータを取得
            const { data: historicalData } = await client.models.SensorData.list({
                filter: {
                    sensorId: { eq: sensorId },
                    greenhouseId: { eq: greenhouse.id }
                }
            });

            if (historicalData) {
                // timestampで降順ソート（新しい順）して最新30件に制限
                const sortedData = historicalData
                    .filter(item => item && item.timestamp)
                    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                    .slice(0, 30); // 最新30件に制限

                setChartData(sortedData);
            }
        } catch (error) {
            console.error('グラフデータの取得に失敗しました:', error);
            setChartData([]);
        } finally {
            setChartLoading(false);
        }
    };

    // センサーデータクリックハンドラー
    const handleSensorDataClick = (sensorId: string, dataType: 'temperature' | 'moisture' | 'ec' | 'co2' | 'solar') => {
        setSelectedSensorId(sensorId);
        setSelectedDataType(dataType);
        setChartModalOpen(true);
        fetchChartData(sensorId, dataType);
    };

    // 温室名更新関数
    const updateGreenhouseName = async () => {
        if (!greenhouse?.id || !editedName.trim()) return;

        setNameUpdateLoading(true);
        try {
            const user = await getCurrentUser();
            const userId = user.userId;

            // UserGreenhousesテーブルの温室名を更新
            await client.models.UserGreenhouses.update({
                userId: userId,
                greenhouseId: greenhouse.id,
                greenhouseName: editedName.trim()
            });

            // ローカル状態を更新（画面の即座の反映のため）
            greenhouse.name = editedName.trim();
            setIsEditingName(false);
        } catch (error) {
            console.error('温室名の更新に失敗しました:', error);
            setError('温室名の更新に失敗しました');
            // エラー時は元の名前に戻す
            setEditedName(greenhouse?.name || '');
        } finally {
            setNameUpdateLoading(false);
        }
    };

    // センサー名更新関数
    const updateSensorName = async (sensorId: string, newName: string) => {
        // SensorInfoテーブルが存在するかチェック（一時的に無効化）
        const sensorInfoExists = false; // client.models.SensorInfo !== undefined;

        if (sensorInfoExists) {
            try {
                const existingSensorInfo = sensorInfoMap.get(sensorId);

                if (existingSensorInfo) {
                    // 既存のセンサー情報を更新
                    await client.models.SensorInfo.update({
                        sensorId: sensorId,
                        sensorName: newName
                    });
                } else {
                    // 新しいセンサー情報を作成
                    const currentSensorData = sensorData.find(sensor => sensor.sensorId === sensorId);
                    await client.models.SensorInfo.create({
                        sensorId: sensorId,
                        greenhouseId: greenhouse.id,
                        sensorName: newName,
                        sensorType: currentSensorData?.sensorType || 'unknown',
                        isActive: true
                    });
                }
                console.log(`センサー名をデータベースに保存: ${sensorId} -> ${newName}`);
            } catch (error) {
                console.error('データベース更新に失敗、ローカル状態のみ更新:', error);
            }
        } else {
            console.log('SensorInfoテーブルがまだ利用できません。ローカル状態のみ更新します。');
        }

        // 常にローカル状態を更新（データベース更新の成功/失敗に関わらず）
        console.log(`センサー名をローカル状態で更新: ${sensorId} -> ${newName}`);
        setSensorInfoMap(prevMap => {
            const newMap = new Map(prevMap);
            const existingSensorInfo = prevMap.get(sensorId);
            const updatedInfo = existingSensorInfo
                ? { ...existingSensorInfo, sensorName: newName }
                : {
                    sensorId,
                    greenhouseId: greenhouse.id,
                    sensorName: newName,
                    sensorType: sensorData.find(s => s.sensorId === sensorId)?.sensorType || 'unknown',
                    description: null,
                    location: null,
                    isActive: true
                } as any; // 型エラーを回避
            newMap.set(sensorId, updatedInfo);
            console.log('更新後のsensorInfoMap:', Array.from(newMap.entries()));

            // ローカルストレージにも保存
            try {
                const sensorNamesObj: Record<string, any> = {};
                newMap.forEach((value, key) => {
                    sensorNamesObj[key] = value;
                });
                localStorage.setItem(`sensorNames_${greenhouse.id}`, JSON.stringify(sensorNamesObj));
                console.log('センサー名をローカルストレージに保存しました');
            } catch (error) {
                console.error('ローカルストレージへの保存に失敗:', error);
            }

            return newMap;
        });
    };

    // 編集キャンセル
    const cancelNameEdit = () => {
        setEditedName(greenhouse?.name || '');
        setIsEditingName(false);
    };

    // Enterキーで保存
    const handleNameKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            updateGreenhouseName();
        } else if (e.key === 'Escape') {
            cancelNameEdit();
        }
    };

    // センサーデータを表示用の形式に変換
    const createSensorReading = (value: number, unit: string, timestamp: string, type: SensorType): SensorReading => ({
        type,
        value,
        unit,
        timestamp
    });

    if (loading) {
        return (
            <VStack gap={10} mt={10}>
                <Spinner size="xl" />
                <Text>センサーデータを読み込み中...</Text>
            </VStack>
        );
    }

    if (error) {
        return (
            <VStack gap={10} mt={10}>
                <Alert.Root status="error">
                    <Alert.Indicator />
                    <Alert.Title>{error}</Alert.Title>
                </Alert.Root>
            </VStack>
        );
    }

    if (!greenhouse) {
        return (
            <VStack gap={10} mt={10}>
                <Alert.Root status="warning">
                    <Alert.Indicator />
                    <Alert.Title>温室情報が見つかりません</Alert.Title>
                </Alert.Root>
            </VStack>
        );
    }

    return (
        <Box p={6}>
            <HStack mb={4} align="center">
                {isEditingName ? (
                    <HStack>
                        <Input
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            onKeyDown={handleNameKeyPress}
                            onBlur={updateGreenhouseName}
                            autoFocus
                            size="lg"
                            fontSize="2xl"
                            fontWeight="bold"
                            maxW="400px"
                            disabled={nameUpdateLoading}
                        />
                        <Text fontSize="2xl" fontWeight="bold">のセンサー一覧</Text>
                        {nameUpdateLoading && <Spinner size="sm" />}
                    </HStack>
                ) : (
                    <Heading
                        mb={0}
                        cursor="pointer"
                        onClick={() => setIsEditingName(true)}
                        _hover={{ color: 'blue.500', textDecoration: 'underline' }}
                        title="クリックして編集"
                    >
                        {greenhouse.name} のセンサー一覧
                    </Heading>
                )}
            </HStack>

            {sensorData.length === 0 ? (
                <Text>センサーデータが登録されていません</Text>
            ) : (
                <SimpleGrid columns={[1, 2, 3]} gap={4}>
                    {sensorData.map((sensor) => {
                        const sensorCards = [];

                        // 土壌センサーデータ
                        if (sensor.sensorType === 'soil') {
                            if (sensor.temperature !== null && sensor.temperature !== undefined) {
                                sensorCards.push(
                                    <SensorCard
                                        key={`${sensor.sensorId}-temperature`}
                                        label="土壌温度"
                                        reading={createSensorReading(sensor.temperature, '°C', sensor.timestamp, 'soil' as SensorType)}
                                        sensorId={sensor.sensorId}
                                        sensorName={sensorInfoMap.get(sensor.sensorId)?.sensorName}
                                        onSensorNameUpdate={updateSensorName}
                                        onDataClick={() => handleSensorDataClick(sensor.sensorId, 'temperature')}
                                    />
                                );
                            }
                            if (sensor.moisture !== null && sensor.moisture !== undefined) {
                                sensorCards.push(
                                    <SensorCard
                                        key={`${sensor.sensorId}-moisture`}
                                        label="水分率"
                                        reading={createSensorReading(sensor.moisture, '%', sensor.timestamp, 'soil' as SensorType)}
                                        sensorId={sensor.sensorId}
                                        sensorName={sensorInfoMap.get(sensor.sensorId)?.sensorName}
                                        onSensorNameUpdate={updateSensorName}
                                        onDataClick={() => handleSensorDataClick(sensor.sensorId, 'moisture')}
                                    />
                                );
                            }
                            if (sensor.ec !== null && sensor.ec !== undefined) {
                                sensorCards.push(
                                    <SensorCard
                                        key={`${sensor.sensorId}-ec`}
                                        label="電気伝導率"
                                        reading={createSensorReading(sensor.ec, 'mS/cm', sensor.timestamp, 'soil' as SensorType)}
                                        sensorId={sensor.sensorId}
                                        sensorName={sensorInfoMap.get(sensor.sensorId)?.sensorName}
                                        onSensorNameUpdate={updateSensorName}
                                        onDataClick={() => handleSensorDataClick(sensor.sensorId, 'ec')}
                                    />
                                );
                            }
                        }

                        // CO2センサーデータ
                        if (sensor.sensorType === 'co2' && sensor.co2 !== null && sensor.co2 !== undefined) {
                            sensorCards.push(
                                <SensorCard
                                    key={`${sensor.sensorId}-co2`}
                                    label="CO₂濃度"
                                    reading={createSensorReading(sensor.co2, 'ppm', sensor.timestamp, 'co2' as SensorType)}
                                    sensorId={sensor.sensorId}
                                    sensorName={sensorInfoMap.get(sensor.sensorId)?.sensorName}
                                    onSensorNameUpdate={updateSensorName}
                                    onDataClick={() => handleSensorDataClick(sensor.sensorId, 'co2')}
                                />
                            );
                        }

                        // 日射量センサーデータ
                        if (sensor.sensorType === 'solar' && sensor.solar !== null && sensor.solar !== undefined) {
                            sensorCards.push(
                                <SensorCard
                                    key={`${sensor.sensorId}-solar`}
                                    label="日射量"
                                    reading={createSensorReading(sensor.solar, 'W/m²', sensor.timestamp, 'sunlight' as SensorType)}
                                    sensorId={sensor.sensorId}
                                    sensorName={sensorInfoMap.get(sensor.sensorId)?.sensorName}
                                    onSensorNameUpdate={updateSensorName}
                                    onDataClick={() => handleSensorDataClick(sensor.sensorId, 'solar')}
                                />
                            );
                        }

                        return sensorCards;
                    }).flat()}
                </SimpleGrid>
            )}

            {/* グラフ表示ダイアログ */}
            <SensorDataChart
                isOpen={chartModalOpen}
                onClose={() => setChartModalOpen(false)}
                sensorId={selectedSensorId}
                dataType={selectedDataType}
                chartData={chartData}
                loading={chartLoading}
            />
        </Box>
    );
};

export default SensorDashboard;