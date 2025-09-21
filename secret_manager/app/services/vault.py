import hvac
import os
from app.models.secret import ObjectStorageSecret
# TODO: Add robust error handling for Vault failures in all functions
# TODO: Add secret update and delete endpoints for full CRUD functionality
# TODO: Change to verify=True and use proper TLS certs in production

VAULT_ADDR = os.getenv("VAULT_ADDR", "https://vault.localhost.com")
VAULT_TOKEN = os.getenv("VAULT_TOKEN", "")
vault_client = hvac.Client(url=VAULT_ADDR, token=VAULT_TOKEN, verify=False)

def store_secret(user_id: str, secret: ObjectStorageSecret):
    vault_client.secrets.kv.v2.create_or_update_secret(
        mount_point="connectors",
        path=f"users/{user_id}",
        secret=secret.dict()
    )

def get_secret(user_id: str):
    read_response = vault_client.secrets.kv.v2.read_secret_version(
        mount_point="connectors",
        path=f"users/{user_id}"
    )
    return read_response.get("data", {}).get("data")
