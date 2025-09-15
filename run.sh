#!/bin/bash
set -e

# Load .env
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
else
    echo "❌ .env file not found!"
    exit 1
fi

if [ -z "$IMAGE" ]; then
    echo "❌ IMAGE not set in .env"
    exit 1
fi

# Stop any existing container named 'hub'
if [ "$(docker ps -q -f name=hub)" ]; then
    echo "Stopping existing 'hub' container..."
    docker stop hub
fi

echo "Running $IMAGE locally on port 8501..."
docker run --name hub -p 8501:8501 --rm $IMAGE
