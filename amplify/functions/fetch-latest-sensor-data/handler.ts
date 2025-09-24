import type { Handler } from 'aws-lambda';
import { toJSTISOString } from '../../../src/utils/uty';

export const handler: Handler = async (event) => {
  try {
    console.log('Lambda function executed - DynamoDB change detection');
    console.log('Event:', JSON.stringify(event, null, 2));

    console.log('Environment variables:', {
      AWS_REGION: process.env.AWS_REGION,
      SENSOR_DATA_TABLE_NAME: process.env.SENSOR_DATA_TABLE_NAME,
      USER_GREENHOUSES_TABLE_NAME: process.env.USER_GREENHOUSES_TABLE_NAME
    });

    // 基本的な処理のログ
    console.log('Processing DynamoDB change event...');

    // イベントの種類を判定
    let eventType = 'unknown';
    if (event.httpMethod) {
      eventType = 'http';
    } else if (event.Records) {
      eventType = 'dynamodb-stream';
    } else if (event.source) {
      eventType = event.source;
    }

    console.log('Event type detected:', eventType);

    // 簡単なデータ処理のシミュレーション
    const processedData = {
      timestamp: toJSTISOString(new Date()),
      eventType: eventType,
      recordCount: event.Records ? event.Records.length : 0,
      message: 'DynamoDB change processed successfully'
    };

    console.log('Processed data:', processedData);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Lambda function executed successfully',
        data: processedData,
        environment: {
          region: process.env.AWS_REGION,
          sensorDataTableName: process.env.SENSOR_DATA_TABLE_NAME,
          userGreenhousesTableName: process.env.USER_GREENHOUSES_TABLE_NAME
        }
      }),
    };
  } catch (error) {
    console.error('Error in Lambda function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error processing request',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: toJSTISOString(new Date())
      }),
    };
  }
};