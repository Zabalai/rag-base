#!/bin/bash
set -e

# -------------------------------
# Build & optionally push Hub Docker image
# -------------------------------

# Load .env
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
else
    echo "❌ .env file not found!"
    exit 1
fi

# Check required env vars
if [ -z "$IMAGE" ]; then
    echo "❌ IMAGE not set in .env"
    exit 1
fi

echo "Building Docker image $IMAGE..."
docker build -t $IMAGE .

# Check if --push flag was provided
if [[ "$1" == "--push" ]]; then
    if [ -z "$DOCKER_HUB_USERNAME" ] || [ -z "$DOCKER_HUB_PASSWORD" ]; then
        echo "❌ DOCKER_HUB_USERNAME or DOCKER_HUB_PASSWORD not set in .env"
        exit 1
    fi

    echo "Logging in to Docker Hub..."
    echo "$DOCKER_HUB_PASSWORD" | docker login -u "$DOCKER_HUB_USERNAME" --password-stdin

    echo "Pushing $IMAGE to Docker Hub..."
    docker push $IMAGE
    echo "✅ Hub app uploaded to Docker Hub!"
else
    echo "⚠️ --push flag not provided. Skipping Docker Hub push."
fi
