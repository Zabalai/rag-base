
# ZabalAI RAG Platform

## Architecture Overview

This repository contains a modular, event-driven Retrieval-Augmented Generation (RAG) platform designed for scalable, secure, multi-tenant document processing and LLM-powered search. The system is composed of several microservices, each responsible for a specific part of the pipeline.

### Core Services

- **frontend/**
  - Next.js dashboard for file management, pipeline editor, results visualization, and connector management.

- **backend_orchestrator/**
  - Reads user pipeline configs (stored per user/role)
  - Triggers events via Kafka (producer)
  - Coordinates workflow execution across services
  - Centralized monitoring and logging

- **backend_vector_db/**
  - Stores and indexes embeddings/chunks
  - Handles similarity search queries
  - Manages vector updates/deletes
  - Retrieves context for LLM

- **backend_vectorizer/**
  - Receives processed documents from doc_processing
  - Performs chunking (various strategies)
  - Generates embeddings for chunks
  - Enriches chunk metadata
  - Prepares data for vector DB

- **backend_doc_processing/**
  - Ingests and normalizes documents
  - Extracts text and metadata
  - Cleans, enriches, and validates documents
  - Handles OCR, translation, redaction, etc.

- **backend_object_storage/**
  - Manages file uploads/downloads
  - Integrates with MinIO/S3/user storage
  - Handles intermediate and final storage
  - Provides presigned URLs for secure access

- **backend_llm/**
  - Receives queries + retrieved context
  - Calls LLMs for answer generation
  - Returns completions/answers

- **backend_kafka/**
  - Kafka setup/configuration
  - Utilities for topic management, monitoring

## Data Flow & Pipeline Steps

1. **Document Ingestion**
   - User uploads or syncs documents (UI, connectors, APIs)
   - backend_object_storage and backend_doc_processing handle initial storage and normalization

2. **Document Processing**
   - backend_doc_processing extracts, cleans, and enriches documents

3. **Chunking & Embedding**
   - backend_vectorizer chunks documents and generates embeddings
   - Prepares chunk objects for vector DB

4. **Vector Storage & Retrieval**
   - backend_vector_db stores, indexes, and retrieves vectors/chunks

5. **Query Handling & LLM Augmentation**
   - backend_llm receives queries and context, calls LLMs, returns answers

6. **Result Storage & Delivery**
   - Results stored in object storage or sent to Kafka for downstream consumers

7. **Orchestration**
   - backend_orchestrator manages pipeline configs, triggers events, coordinates services, and centralizes monitoring

## Security & Multi-Tenancy

- **Keycloak** for authentication and RBAC
- Per-client isolation via Kafka topics, storage buckets/prefixes, and config files
- Presigned URLs for secure object storage access
- Strict IAM policies and access controls
- Configs stored securely (encrypted, access controlled)

## Extensibility & Connectors

- Object storage connectors: support MinIO, S3, Google Drive, etc.
- Pluggable backend pattern for easy integration of new storage or processing services
- UI/API for users to add/manage connectors and credentials

## Infrastructure

- Infrastructure-as-code (Terraform, Helm, Docker Compose) recommended for reproducible deployments (kept in a separate repo)
- Microservices can be deployed per user/subscription for isolation and scalability
- Resource controls for free trials and production users

## Monitoring & Logging

- Centralized monitoring and logging in backend_orchestrator
- Audit logs, metrics, and alerts for suspicious activity or resource spikes


## Folder Summary

| Folder                | Main Actions/Responsibilities                                 |
|-----------------------|--------------------------------------------------------------|
| frontend              | Dashboard, file management, pipeline editor, results, connectors|
| backend_orchestrator  | Pipeline configs, event triggering, workflow coordination, monitoring|
| backend_vector_db     | Vector storage, indexing, search, retrieval                  |
| backend_vectorizer    | Chunking, embedding, enrichment, prep for vector DB          |
| backend_doc_processing| Document ingestion, normalization, enrichment, validation    |
| backend_object_storage| File management, storage integration, presigned URLs         |
| backend_llm           | LLM calls, answer/completion generation                      |
| backend_kafka         | Kafka setup, topic utilities                                 |
| secret_manager        | HashiCorp Vault integration for secure secret storage and retrieval |

## Getting Started

1. Clone this repo and set up your environment variables for each service.
2. Deploy Kafka and MinIO (or your chosen object storage).
3. Start backend services and frontend dashboard.
4. Configure Keycloak for authentication and RBAC.
5. Use the dashboard to upload documents, create pipelines, and view results.

---

For more details, see individual service READMEs and architecture docs.
