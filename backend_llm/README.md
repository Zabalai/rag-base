# backend_llm

## Overview
Handles LLM queries and answer generation, using retrieved context from vector DB and orchestrator workflows.

## Main APIs
- POST /query — Submit a query with context
- GET /status — Get query status/results

## Configuration
- LLM_PROVIDER_URL: Endpoint for LLM service
- LLM_AUTH: Credentials (managed via secret_manager)

## Usage
- Start service and configure LLM provider
- Use API to submit queries and retrieve answers

## Data Flow
- Receives queries and context from orchestrator or frontend
- Uses context from backend_vector_db for answer generation
- Returns answers to orchestrator or frontend

## Security
- Credentials managed via secret_manager
- Access controls per client/tenant

## Extensibility
- Add support for additional LLM providers or answer strategies

## Maintainer
@yourteam
