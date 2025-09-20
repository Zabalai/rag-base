# backend_doc_processing

## Overview
Ingests, normalizes, and enriches documents, preparing them for chunking, embedding, and semantic search workflows.

## Main APIs
- POST /upload — Upload a document
- POST /process — Process/normalize/enrich document
- GET /documents/{id} — Get document metadata/status

## Configuration
- STORAGE_URL: Object storage endpoint
- DOC_PROCESSING_CONFIG: Processing options

## Usage
- Start service and configure storage/processing options
- Use API to upload and process documents

## Data Flow
- Receives documents from frontend or orchestrator
- Outputs processed documents to backend_vectorizer

## Security
- Credentials managed via secret_manager
- Access controls per client/tenant

## Extensibility
- Add new enrichment or normalization steps

## Maintainer
@yourteam
