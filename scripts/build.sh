#!/bin/bash
set -Eeuo pipefail

COZE_WORKSPACE_PATH="${COZE_WORKSPACE_PATH:-$(pwd)}"

cd "${COZE_WORKSPACE_PATH}"

echo "Cleaning cache..."
pnpm store prune

echo "Installing dependencies..."
pnpm install --no-frozen-lockfile

echo "Ensuring @tailwindcss/vite is installed..."
pnpm add @tailwindcss/vite@4 -D

echo "Building the Next.js project..."
cd src && pnpm next build

echo "Bundling server with tsup..."
cd .. && pnpm tsup src/server.ts --format cjs --platform node --target node20 --outDir dist --no-splitting --no-minify

echo "Build completed successfully!"
