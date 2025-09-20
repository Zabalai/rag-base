# backend_vector_db

## Overview
Handles storage, indexing, and retrieval of vector embeddings and document chunks for semantic search and retrieval workflows.

## Main APIs
- POST /vectors — Store new vectors/chunks
- GET /vectors/search — Search for similar vectors
- GET /vectors/{id} — Retrieve vector/chunk by ID
- PUT /vectors/{id} — Update vector/chunk
- DELETE /vectors/{id} — Delete vector/chunk

## Configuration
- VECTOR_DB_URL: Database endpoint
- VECTOR_DB_AUTH: Credentials (managed via secret_manager)

## Usage
- Start service and configure database connection
- Use API to store, search, and manage vectors/chunks

## Data Flow
- Receives chunks/embeddings from backend_vectorizer
- Provides semantic search results to backend_llm or orchestrator


## Security
- This service authenticates directly to Vault (secret_manager) for its own credentials and secrets.
- Vault policies grant only the minimum required privileges (principle of least privilege).
- Access controls per client/tenant.

## Extensibility
- Support additional vector DBs or indexing strategies

## Maintainer
@yourteam
