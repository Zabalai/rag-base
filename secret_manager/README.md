# secret_manager

## Overview
Handles secure storage and retrieval of secrets (API keys, credentials, configs) using HashiCorp Vault.

## Main APIs
- Vault HTTP API (see https://www.vaultproject.io/api-docs)
- Endpoints for secret CRUD, authentication, and policy management

## Configuration
- VAULT_ADDR: Vault server URL
- VAULT_TOKEN: Admin/root token (for setup)
- VAULT_AUTH_METHOD: AppRole, JWT, etc.

## Usage
- Start Vault server (see official docs)
- Authenticate using AppRole or other method
- Store and retrieve secrets via Vault API

## Data Flow
- Services authenticate to Vault and fetch secrets at runtime
- Secrets are never hardcoded or stored in code/config files

## Security
- RBAC via Vault policies
- Audit logging and secret rotation
- Per-client isolation using namespaces or secret paths

## Extensibility
- Add new authentication methods or secret engines as needed

## Maintainer
@yourteam
