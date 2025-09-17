export type SensorType = 'soil' | 'co2' | 'sunlight';

export interface SensorReading {
    type: SensorType;
    timestamp: string;
    value: number;
    unit: string;
}

export interface Greenhouse {
    id: string; // UUID
    name: string;
    timestamp: string; // ISO 8601 format
    location: {
        latitude: number;
        longitude: number;
    };
    sensors: Partial<{
        soil: {
            temperature: SensorReading;
            moisture: SensorReading;
            conductivity: SensorReading;
        };
        co2: SensorReading;
        sunlight: SensorReading;
    }>;
}