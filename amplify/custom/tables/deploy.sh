#!/bin/bash
set -euo pipefail
# 環境変数または引数で設定可能
AWS_BRANCH="${AWS_BRANCH:-${1:-develop}}"
: "${AWS_APP_ID:?AWS_APP_ID を環境変数か第1引数で指定してください}"
AWS_REGION="${AWS_REGION:-us-east-1}"

echo "Deploying Amplify app: appId=${AWS_APP_ID}, branch=${AWS_BRANCH}, region=${AWS_REGION}"

# 必要な AWS 認証情報が設定されていることを事前に確認
if [[ -z "${AWS_ACCESS_KEY_ID:-}" || -z "${AWS_SECRET_ACCESS_KEY:-}" ]]; then
  echo "Warning: AWS credentials not found in environment. Ensure AWS CLI/profile or env vars are configured."
fi
# Amplify Gen2 の pipeline-deploy を実行
npx --yes ampx pipeline-deploy \
  --branch $AWS_BRANCH \
  --app-id $AWS_APP_ID \
  --outputs-format json \
  --outputs-version 1.4