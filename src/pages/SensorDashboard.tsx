import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Box,
    Heading,
    SimpleGrid,
    Spinner,
    Text,
    VStack,
    Alert
} from '@chakra-ui/react';
import { generateClient } from 'aws-amplify/data';
import { getCurrentUser } from 'aws-amplify/auth';
import type { Schema } from '../../amplify/data/resource';
import SensorCard from '../components/SensorCard';
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

                // 各センサーIDの最新データを取得
                const sensorDataPromises = allSensorIds.map(async (sensorId) => {
                    try {
                        // SensorDataテーブルから特定のsensorIdの全データを取得
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
                                return dateB.getTime() - dateA.getTime(); // 降順ソート
                            });

                        return sortedReadings[0] || null;
                    } catch (error) {
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
            <Heading mb={4}>{greenhouse.name} のセンサー一覧</Heading>

            {sensorData.length === 0 ? (
                <Text>センサーデータが登録されていません</Text>
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