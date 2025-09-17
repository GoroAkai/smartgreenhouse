import { Box, Text } from '@chakra-ui/react';
import { StatNumber, Stat, StatLabel } from '@chakra-ui/stat';
import { SensorReading } from '../types/sensor';

const SensorCard = ({ label, reading }: { label: string; reading: SensorReading }) => (
    <Box borderWidth="1px" borderRadius="lg" p={4}>
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
);

export default SensorCard;