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
    Button
} from '@chakra-ui/react';
import { generateClient } from 'aws-amplify/data';
import { getCurrentUser } from 'aws-amplify/auth';
import type { Schema } from '../../amplify/data/resource';
import SensorCard from '../components/SensorCard';
import { SensorReading, SensorType } from '../types/sensor';
import { toJSTISOString } from '../utils/uty';

const client = generateClient<Schema>();

interface GreenhouseState {
    id: string;
    name: string;
}

interface SensorData {
    sensorId: string;
    timestamp: string;
    greenhouseId: string;
    sensorType: string;
    temperature?: number;
    moisture?: number;
    ec?: number;
    co2?: number;
    solar?: number;
}

const SensorDashboard = () => {
    const location = useLocation();
    const greenhouse = location.state?.greenhouse as GreenhouseState;

    const [sensorData, setSensorData] = useState<SensorData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // userGreenhouseは削除（使用されていないため）

    useEffect(() => {
        const fetchSensorData = async () => {
            if (!greenhouse?.id) {
                setError('温室情報が見つかりません');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

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

                // userGreenhouseDataは直接使用

                // 登録されているセンサーIDを収集
                console.log('UserGreenhouseデータ:', {
                    soilSensors: userGreenhouseData.soilSensors,
                    co2Sensors: userGreenhouseData.co2Sensors,
                    solarSensors: userGreenhouseData.solarSensors
                });

                const allSensorIds = [
                    ...(userGreenhouseData.soilSensors || []),
                    ...(userGreenhouseData.co2Sensors || []),
                    ...(userGreenhouseData.solarSensors || [])
                ].filter(id => id !== null && id !== undefined);

                console.log('フィルタリング後のセンサーID一覧:', allSensorIds);
                console.log('対象温室ID:', greenhouse.id);

                // 実際のセンサーIDでテスト（画像から確認できるID）
                const knownSensorIds = [
                    "e8d687a2-5cc6-422a-a715-332f9f440537", // soil
                    "a2593fc5-dfc3-4b7c-8a27-f26dfed1429d", // co2
                    "8884b00f-2003-451a-b1d0-d6fc4e71e982"  // solar
                ];

                console.log('既知のセンサーIDでもテスト:', knownSensorIds);

                // センサーIDが取得できない場合は、既知のIDでテスト
                const testSensorIds = allSensorIds.length > 0 ? allSensorIds : [
                    "e8d687a2-5cc6-422a-a715-332f9f440537", // soil
                    "a2593fc5-dfc3-4b7c-8a27-f26dfed1429d", // co2
                    "8884b00f-2003-451a-b1d0-d6fc4e71e982"  // solar
                ];

                console.log('使用するセンサーID:', testSensorIds);

                if (testSensorIds.length === 0) {
                    setSensorData([]);
                    setLoading(false);
                    return;
                }

                // 各センサーIDの最新データを取得
                const sensorDataPromises = testSensorIds.map(async (sensorId) => {
                    try {
                        console.log(`センサーID ${sensorId} のデータを取得中...`);

                        // まず全データを取得してテーブル構造を確認
                        console.log('=== SensorDataテーブル全体の確認 ===');
                        const { data: allSensorData, errors: listErrors } = await client.models.SensorData.list();
                        console.log(`全SensorData取得エラー:`, listErrors);
                        if (listErrors && listErrors.length > 0) {
                            listErrors.forEach((error, index) => {
                                console.error(`エラー ${index}:`, error);
                            });
                        }
                        console.log(`全SensorDataの件数:`, allSensorData?.length);
                        console.log(`全SensorDataの最初の3件:`, allSensorData?.slice(0, 3));

                        // 実際のテーブル名やスキーマ情報を確認
                        console.log('SensorDataモデルの情報:', client.models.SensorData);

                        // 特定のsensorIdでフィルタリング
                        console.log(`=== センサーID ${sensorId} の詳細クエリ ===`);
                        const { data: sensorReadings, errors: filterErrors } = await client.models.SensorData.list({
                            filter: {
                                sensorId: { eq: sensorId }
                            }
                        });

                        console.log(`フィルタリングエラー:`, filterErrors);
                        if (filterErrors && filterErrors.length > 0) {
                            filterErrors.forEach((error, index) => {
                                console.error(`フィルタリングエラー ${index}:`, error);
                            });
                        }
                        console.log(`フィルタリング結果の件数:`, sensorReadings?.length);

                        // 代替案：フィルターなしで全データを取得し、クライアントサイドでフィルタリング
                        if (!sensorReadings || sensorReadings.length === 0) {
                            console.log('代替案：全データからクライアントサイドフィルタリング');
                            const matchingSensors = allSensorData?.filter(data =>
                                data && data.sensorId === sensorId
                            );
                            console.log(`クライアントサイドフィルタリング結果:`, matchingSensors);

                            if (matchingSensors && matchingSensors.length > 0) {
                                // 代替データを使用
                                const altSensorReadings = matchingSensors;
                                console.log('代替データを使用:', altSensorReadings);

                                // timestampで降順ソート
                                const sortedAltReadings = altSensorReadings
                                    .filter(reading => reading && reading.timestamp)
                                    .sort((a, b) => {
                                        const dateA = new Date(a.timestamp);
                                        const dateB = new Date(b.timestamp);
                                        return dateB.getTime() - dateA.getTime();
                                    });

                                return sortedAltReadings[0] || null;
                            }
                        }

                        console.log(`センサーID ${sensorId} の取得結果:`, sensorReadings);

                        // 実際のデータで直接getメソッドを試してみる
                        try {
                            // 実際のtimestampを使用
                            const realTimestamp = "2025-09-22T06:15:36+09:00";
                            const { data: directGet } = await client.models.SensorData.get({
                                sensorId: sensorId,
                                timestamp: realTimestamp
                            });
                            console.log(`直接get結果 (${sensorId}):`, directGet);

                            if (directGet) {
                                console.log('直接getで取得成功！データ:', {
                                    sensorId: directGet.sensorId,
                                    timestamp: directGet.timestamp,
                                    sensorType: directGet.sensorType,
                                    temperature: directGet.temperature,
                                    moisture: directGet.moisture,
                                    ec: directGet.ec,
                                    co2: directGet.co2,
                                    solar: directGet.solar
                                });
                                return directGet;
                            }
                        } catch (getError) {
                            console.log(`直接get失敗 (${sensorId}):`, getError);
                        }

                        if (!sensorReadings || sensorReadings.length === 0) {
                            console.log(`センサーID ${sensorId} のデータが見つかりません`);
                            return null;
                        }

                        // 取得したデータの詳細をログ出力
                        sensorReadings.forEach((reading, index) => {
                            console.log(`データ ${index}:`, {
                                sensorId: reading?.sensorId,
                                timestamp: reading?.timestamp,
                                greenhouseId: reading?.greenhouseId,
                                sensorType: reading?.sensorType,
                                temperature: reading?.temperature,
                                moisture: reading?.moisture,
                                ec: reading?.ec,
                                co2: reading?.co2,
                                solar: reading?.solar
                            });
                        });

                        // timestampで降順ソートして最新のデータを取得
                        const sortedReadings = sensorReadings
                            .filter(reading => reading && reading.timestamp)
                            .sort((a, b) => {
                                const dateA = new Date(a.timestamp);
                                const dateB = new Date(b.timestamp);
                                return dateB.getTime() - dateA.getTime(); // 降順ソート
                            });

                        const latestReading = sortedReadings[0];
                        console.log(`センサーID ${sensorId} の最新データ:`, latestReading);

                        return latestReading || null;
                    } catch (error) {
                        console.error(`センサーID ${sensorId} のデータ取得に失敗:`, error);
                        return null;
                    }
                });

                const results = await Promise.all(sensorDataPromises);
                console.log('取得した全センサーデータ:', results);
                const validSensorData = results.filter(data => data !== null) as SensorData[];

                console.log('取得したセンサーデータ:', validSensorData);
                console.log('各センサーの最新timestamp:', validSensorData.map(data => ({
                    sensorId: data.sensorId,
                    timestamp: data.timestamp,
                    sensorType: data.sensorType
                })));

                setSensorData(validSensorData);

            } catch (err) {
                console.error('センサーデータの取得に失敗:', err);
                setError('センサーデータの取得に失敗しました');
            } finally {
                setLoading(false);
            }
        };

        fetchSensorData();
    }, [greenhouse?.id]);

    // センサーデータを表示用の形式に変換
    const createSensorReading = (value: number, unit: string, timestamp: string, type: SensorType): SensorReading => ({
        type,
        value,
        unit,
        timestamp
    });

    // テストデータを作成する関数
    const createTestData = async () => {
        if (!greenhouse?.id) return;

        try {
            const testSensorId = "8884b00f-2003-451a-b1d0-d6fc4e71e982";
            const testTimestamp = toJSTISOString(new Date());

            await client.models.SensorData.create({
                sensorId: testSensorId,
                timestamp: testTimestamp,
                greenhouseId: greenhouse.id,
                sensorType: "solar",
                solar: 2.0
            });

            console.log('テストデータを作成しました');
            // ページをリロードしてデータを再取得
            window.location.reload();
        } catch (error) {
            console.error('テストデータ作成に失敗:', error);
        }
    };

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
            <Heading mb={4}>{greenhouse.name} のセンサー一覧</Heading>

            {sensorData.length === 0 ? (
                <VStack gap={4}>
                    <Text>センサーデータが登録されていません</Text>
                    <Button onClick={createTestData} colorScheme="blue">
                        テストデータを作成
                    </Button>
                </VStack>
            ) : (
                <SimpleGrid columns={[1, 2, 3]} gap={4}>
                    {sensorData.map((sensor) => {
                        const sensorCards = [];

                        // 土壌センサーデータ
                        if (sensor.sensorType === 'soil') {
                            if (sensor.temperature !== undefined) {
                                sensorCards.push(
                                    <SensorCard
                                        key={`${sensor.sensorId}-temperature`}
                                        label="土壌温度"
                                        reading={createSensorReading(sensor.temperature, '°C', sensor.timestamp, 'soil' as SensorType)}
                                    />
                                );
                            }
                            if (sensor.moisture !== undefined) {
                                sensorCards.push(
                                    <SensorCard
                                        key={`${sensor.sensorId}-moisture`}
                                        label="水分率"
                                        reading={createSensorReading(sensor.moisture, '%', sensor.timestamp, 'soil' as SensorType)}
                                    />
                                );
                            }
                            if (sensor.ec !== undefined) {
                                sensorCards.push(
                                    <SensorCard
                                        key={`${sensor.sensorId}-ec`}
                                        label="電気伝導率"
                                        reading={createSensorReading(sensor.ec, 'mS/cm', sensor.timestamp, 'soil' as SensorType)}
                                    />
                                );
                            }
                        }

                        // CO2センサーデータ
                        if (sensor.sensorType === 'co2' && sensor.co2 !== undefined) {
                            sensorCards.push(
                                <SensorCard
                                    key={`${sensor.sensorId}-co2`}
                                    label="CO₂濃度"
                                    reading={createSensorReading(sensor.co2, 'ppm', sensor.timestamp, 'co2' as SensorType)}
                                />
                            );
                        }

                        // 日射量センサーデータ
                        if (sensor.sensorType === 'solar' && sensor.solar !== undefined) {
                            sensorCards.push(
                                <SensorCard
                                    key={`${sensor.sensorId}-solar`}
                                    label="日射量"
                                    reading={createSensorReading(sensor.solar, 'W/m²', sensor.timestamp, 'sunlight' as SensorType)}
                                />
                            );
                        }

                        return sensorCards;
                    }).flat()}
                </SimpleGrid>
            )}
        </Box>
    );
};

export default SensorDashboard;