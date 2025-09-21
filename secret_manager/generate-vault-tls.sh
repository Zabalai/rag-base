#!/bin/bash
# Generate self-signed TLS certificates for Vault local development
set -e

mkdir -p vault-tls
cd vault-tls

# Generate CA key and certificate
openssl genrsa -out vault-ca.key 2048
openssl req -x509 -new -nodes -key vault-ca.key -sha256 -days 3650 -out vault-ca.pem -subj "/CN=Vault CA"

# Generate Vault key
openssl genrsa -out vault-key.pem 2048

# Generate Vault certificate signing request (CSR)
openssl req -new -key vault-key.pem -out vault.csr -subj "/CN=vault.localhost.com"

# Sign Vault certificate with CA
openssl x509 -req -in vault.csr -CA vault-ca.pem -CAkey vault-ca.key -CAcreateserial -out vault-cert.pem -days 365 -sha256

# Clean up
rm vault-ca.key vault.csr vault-ca.srl

echo "Vault TLS files generated: vault-cert.pem, vault-key.pem, vault-ca.pem"
