import { useLocation } from 'react-router-dom';
import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import SensorCard from '../components/SensorCard';
import { Greenhouse } from '../types/sensor';

const SensorDashboard = () => {
    const location = useLocation();
    const greenhouse = location.state?.greenhouse as Greenhouse;

    // TODO: DynamoDBからセンサー値を取得する処理を追加
    const dummySensors = greenhouse.sensors ?? {
        soil: {
            temperature: { type: 'soil', value: 22.5, unit: '°C', timestamp: '...' },
            moisture: { type: 'soil', value: 45, unit: '%', timestamp: '...' },
            conductivity: { type: 'soil', value: 1.2, unit: 'mS/cm', timestamp: '...' },
        },
        co2: { type: 'co2', value: 800, unit: 'ppm', timestamp: '...' },
        sunlight: { type: 'sunlight', value: 300, unit: 'W/m²', timestamp: '...' },
    };

    return (
        <Box p={6}>
            <Heading mb={4}>{greenhouse.name} のセンサー一覧</Heading>
            <SimpleGrid columns={[1, 2, 3]} spacing={4}>
                {dummySensors.soil?.temperature && (
                    <SensorCard label="土壌温度" reading={dummySensors.soil.temperature} />
                )}
                {dummySensors.soil?.moisture && (
                    <SensorCard label="水分率" reading={dummySensors.soil.moisture} />
                )}
                {dummySensors.soil?.conductivity && (
                    <SensorCard label="電気伝導率" reading={dummySensors.soil.conductivity} />
                )}
                {dummySensors.co2 && (
                    <SensorCard label="CO₂濃度" reading={dummySensors.co2} />
                )}
                {dummySensors.sunlight && (
                    <SensorCard label="日射量" reading={dummySensors.sunlight} />
                )}
            </SimpleGrid>
        </Box>
    );
};

export default SensorDashboard;