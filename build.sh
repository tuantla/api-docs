#!/usr/bin/env bash
TIMESTAMP=$(date "+%Y%m%d-%H%M")
cd "$(dirname "${BASH_SOURCE[0]}")"

npm install
npm run build
docker build -t indexing/api-docs .
#docker push  indexing/api-docs
