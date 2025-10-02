#!/bin/bash
set -euo pipefail

# スクリプトのディレクトリを取得
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 環境変数または引数で設定可能
ENVIRONMENT="${ENVIRONMENT:-${1:-develop}}"
AWS_REGION="${AWS_REGION:-ap-northeast-1}"
STACK_NAME="smartgreenhouse-tables-${ENVIRONMENT}"

echo "Deploying DynamoDB tables: environment=${ENVIRONMENT}, region=${AWS_REGION}, stack=${STACK_NAME}"

# 必要な AWS 認証情報が設定されていることを事前に確認
if [[ -z "${AWS_ACCESS_KEY_ID:-}" || -z "${AWS_SECRET_ACCESS_KEY:-}" ]]; then
  echo "Warning: AWS credentials not found in environment. Ensure AWS CLI/profile or env vars are configured."
fi

# CloudFormationでDynamoDBテーブルをデプロイ
aws cloudformation deploy \
  --template-file "${SCRIPT_DIR}/template.yaml" \
  --stack-name $STACK_NAME \
  --region $AWS_REGION \
  --parameter-overrides Environment=$ENVIRONMENT

echo "Deployment completed successfully!"
echo "Created tables:"
echo "  - SensorData-${ENVIRONMENT}"
echo "  - UserGreenhouses-${ENVIRONMENT}"
echo "  - SensorInfo-${ENVIRONMENT}"

#削除するときは下記
# aws cloudformation delete-stack --stack-name smartgreenhouse-tables-local --region ap-northeast-1
# aws cloudformation delete-stack --stack-name smartgreenhouse-tables-develop --region ap-northeast-1
# aws cloudformation delete-stack --stack-name smartgreenhouse-tables-prod --region ap-northeast-1