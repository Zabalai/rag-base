# backend_vectorizer

## Overview
Processes documents to generate chunks and embeddings, preparing data for vector DB storage and semantic search workflows.

## Main APIs
- POST /chunk — Chunk a document
- POST /embed — Generate embeddings for chunks
- GET /status — Get processing status

## Configuration
- MODEL_PATH: Path to embedding model
- VECTOR_DB_URL: Endpoint for vector DB

## Usage
- Start service and configure model/vector DB connection
- Use API to chunk documents and generate embeddings

## Data Flow
- Receives processed documents from backend_doc_processing
- Outputs chunks/embeddings to backend_vector_db


## Security
- This service authenticates directly to Vault (secret_manager) for its own credentials and secrets.
- Vault policies grant only the minimum required privileges (principle of least privilege).
- Access controls per client/tenant.

## Extensibility
- Add new chunking or embedding strategies

## Maintainer
@yourteam
