# backend_object_storage

## Overview
Manages file uploads, downloads, and storage integration. Supports MinIO/S3 and user-provided storage connectors. Provides presigned URLs for secure access. Credentials and secrets are managed via HashiCorp Vault (see `secret_manager`).

## Main APIs
- POST /upload — Upload a file
- GET /download/{id} — Download a file
- POST /presign — Generate presigned URL
- GET /files — List/search files
- Connector endpoints for external storage (Google Drive, S3, etc.)

## Configuration
- STORAGE_TYPE: minio, s3, user_connector
- STORAGE_ENDPOINT: URL for storage backend
- STORAGE_ACCESS_KEY, STORAGE_SECRET_KEY: Credentials (fetched from secret_manager/HashiCorp Vault)

## Usage
- Start service and configure storage backend
- Use API to upload/download files and generate presigned URLs

## Data Flow
- Receives files from frontend, orchestrator, or other services
- Orchestrator generates presigned URLs and sends them via Kafka messages for secure, time-limited access
- Stores files in configured backend


## Security
- This service authenticates directly to HashiCorp Vault (secret_manager) for its own credentials and secrets.
- Vault policies grant only the minimum required privileges (principle of least privilege).
- Presigned URLs prevent credential sharing.
- Per-client isolation via buckets/prefixes.

## Extensibility
- Implements a storage interface that can be overwritten/extended by each provider (MinIO, S3, Google Drive, etc.)
- Add new connectors for external storage by implementing the interface
- Support additional storage backends

## Orchestrator & Kafka Integration
- Orchestrator has access to Vault and generates presigned URLs for file access
- Presigned URLs are distributed to consumers via Kafka messages

## Maintainer
@yourteam
