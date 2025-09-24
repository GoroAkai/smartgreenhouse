import React, { useState, useEffect } from 'react';
import { Box, Text, Input, HStack, VStack, Spinner } from '@chakra-ui/react';
import { StatNumber, Stat, StatLabel } from '@chakra-ui/stat';
import { SensorReading } from '../types/sensor';

interface SensorCardProps {
    label: string;
    reading: SensorReading;
    sensorId?: string;
    sensorName?: string | null;
    onSensorNameUpdate?: (sensorId: string, newName: string) => Promise<void>;
    onDataClick?: () => void;
}

const SensorCard: React.FC<SensorCardProps> = ({
    label,
    reading,
    sensorId,
    sensorName,
    onSensorNameUpdate,
    onDataClick
}) => {
    const [isEditingName, setIsEditingName] = useState(false);
    const [editedName, setEditedName] = useState(sensorName || sensorId || '');
    const [nameUpdateLoading, setNameUpdateLoading] = useState(false);

    // sensorNameプロパティが変更された時にeditedNameを更新
    useEffect(() => {
        if (!isEditingName) { // 編集中でない場合のみ更新
            setEditedName(sensorName || sensorId || '');
        }
    }, [sensorName, sensorId, isEditingName]);

    // センサー名更新処理
    const updateSensorName = async () => {
        if (!sensorId || !onSensorNameUpdate || !editedName.trim()) {
            setIsEditingName(false);
            return;
        }

        setNameUpdateLoading(true);
        try {
            await onSensorNameUpdate(sensorId, editedName.trim());
            setIsEditingName(false);
        } catch (error) {
            console.error('センサー名の更新に失敗しました:', error);
            // エラー時は元の名前に戻す
            setEditedName(sensorName || sensorId || '');
        } finally {
            setNameUpdateLoading(false);
        }
    };

    // 編集キャンセル
    const cancelNameEdit = () => {
        setEditedName(sensorName || sensorId || '');
        setIsEditingName(false);
    };

    // キーボード操作
    const handleNameKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            updateSensorName();
        } else if (e.key === 'Escape') {
            cancelNameEdit();
        }
    };

    // データ部分のクリックハンドラー
    const handleDataClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // センサー名編集との競合を防ぐ
        if (onDataClick) {
            onDataClick();
        }
    };

    const displayName = sensorName || sensorId || 'Unknown Sensor';

    return (
        <Box borderWidth="1px" borderRadius="lg" p={4}>
            <VStack align="stretch" gap={2}>
                {/* センサー名表示・編集部分 */}
                {sensorId && onSensorNameUpdate ? (
                    <Box>
                        {isEditingName ? (
                            <HStack>
                                <Input
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    onKeyDown={handleNameKeyPress}
                                    onBlur={updateSensorName}
                                    autoFocus
                                    size="sm"
                                    fontSize="sm"
                                    fontWeight="semibold"
                                    disabled={nameUpdateLoading}
                                />
                                {nameUpdateLoading && <Spinner size="xs" />}
                            </HStack>
                        ) : (
                            <Text
                                fontSize="sm"
                                fontWeight="semibold"
                                color="blue.600"
                                cursor="pointer"
                                onClick={() => setIsEditingName(true)}
                                _hover={{ textDecoration: 'underline' }}
                                title="クリックして編集"
                            >
                                {displayName}
                            </Text>
                        )}
                    </Box>
                ) : (
                    <Text fontSize="sm" fontWeight="semibold" color="gray.600">
                        {displayName}
                    </Text>
                )}

                {/* センサーデータ表示部分 */}
                <Box
                    cursor={onDataClick ? "pointer" : "default"}
                    onClick={handleDataClick}
                    _hover={onDataClick ? { bg: 'gray.50' } : {}}
                    p={2}
                    borderRadius="md"
                >
                    <Stat>
                        <StatLabel>{label}</StatLabel>
                        <StatNumber>
                            {reading.value} {reading.unit}
                        </StatNumber>
                        <Text fontSize="sm" color="gray.500">
                            {new Date(reading.timestamp).toLocaleString()}
                        </Text>
                    </Stat>
                </Box>
            </VStack>
        </Box>
    );
};

export default SensorCard;