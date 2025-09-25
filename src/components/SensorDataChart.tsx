import React from 'react';
import {
    DialogRoot,
    DialogContent,
    DialogHeader,
    DialogBody,
    DialogCloseTrigger,
    DialogBackdrop,
    DialogTitle,
    Spinner,
    Text,
    Box
} from '@chakra-ui/react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { type Schema } from '../../amplify/data/resource';

type SensorData = Schema['SensorDataV2']['type'];

interface SensorDataChartProps {
    isOpen: boolean;
    onClose: () => void;
    sensorId: string;
    dataType: 'temperature' | 'moisture' | 'ec' | 'co2' | 'solar';
    chartData: SensorData[];
    loading: boolean;
}

const SensorDataChart: React.FC<SensorDataChartProps> = ({
    isOpen,
    onClose,
    sensorId,
    dataType,
    chartData,
    loading
}) => {
    // データタイプに応じた表示設定
    const getChartConfig = (type: string) => {
        switch (type) {
            case 'temperature':
                return { label: '温度', unit: '°C', color: '#ff6b6b' };
            case 'moisture':
                return { label: '湿度', unit: '%', color: '#4ecdc4' };
            case 'ec':
                return { label: 'EC', unit: 'mS/cm', color: '#45b7d1' };
            case 'co2':
                return { label: 'CO2濃度', unit: 'ppm', color: '#96ceb4' };
            case 'solar':
                return { label: '日射量', unit: 'W/m²', color: '#feca57' };
            default:
                return { label: type, unit: '', color: '#6c5ce7' };
        }
    };

    const config = getChartConfig(dataType);

    // グラフ用データの変換
    const formatChartData = (data: SensorData[]) => {
        return data
            .filter(item => item[dataType] !== null && item[dataType] !== undefined)
            .map(item => ({
                timestamp: new Date(item.timestamp).toLocaleString('ja-JP', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                value: item[dataType],
                fullTimestamp: item.timestamp
            }))
            .sort((a, b) => new Date(a.fullTimestamp).getTime() - new Date(b.fullTimestamp).getTime());
    };

    const formattedData = formatChartData(chartData);

    return (
        <DialogRoot open={isOpen} onOpenChange={(e) => !e.open && onClose()} size="xl">
            <DialogBackdrop />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {config.label}グラフ - センサー: {sensorId}
                    </DialogTitle>
                    <DialogCloseTrigger />
                </DialogHeader>
                <DialogBody pb={6}>
                    {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="400px">
                            <Spinner size="xl" />
                        </Box>
                    ) : formattedData.length === 0 ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="400px">
                            <Text>データがありません</Text>
                        </Box>
                    ) : (
                        <Box height="400px">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={formattedData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="timestamp"
                                        angle={-45}
                                        textAnchor="end"
                                        height={80}
                                    />
                                    <YAxis
                                        label={{
                                            value: `${config.label} (${config.unit})`,
                                            angle: -90,
                                            position: 'insideLeft'
                                        }}
                                    />
                                    <Tooltip
                                        formatter={(value) => [`${value} ${config.unit}`, config.label]}
                                        labelFormatter={(label) => `時刻: ${label}`}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke={config.color}
                                        strokeWidth={2}
                                        dot={{ fill: config.color, strokeWidth: 2, r: 4 }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </Box>
                    )}
                </DialogBody>
            </DialogContent>
        </DialogRoot>
    );
};

export default SensorDataChart;