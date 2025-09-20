# backend_orchestrator

## Overview
Central service for managing pipeline configs, triggering events, and coordinating workflows across the RAG platform. Integrates with Kafka for event production and Vault for secret management.

## Main APIs
- POST /pipeline — Create pipeline config
- GET /pipeline/{id} — Get pipeline config
- POST /trigger — Trigger pipeline execution
- GET /status — Workflow status

## Configuration
- VAULT_ADDR: HashiCorp Vault address
- KAFKA_BROKER_URL: Kafka broker address
- ORCHESTRATOR_CONFIG: Path to orchestrator settings

## Usage
- Start orchestrator service
- Configure Vault and Kafka integration
- Use API to manage pipelines and trigger events

## Data Flow
- Reads pipeline configs per user/role
- Produces events to Kafka topics for downstream services
- Generates presigned URLs for file access and includes them in Kafka messages

## Security
- Authenticates to Vault for secrets
- RBAC for pipeline access
- Audit logging of orchestration actions

## Extensibility
- Add new pipeline types and triggers
- Integrate with additional services via Kafka

## Maintainer
@yourteam
