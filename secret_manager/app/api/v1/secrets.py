
from fastapi import APIRouter, HTTPException
from app.models.secret import ConnectorSecret
from app.services.vault import store_secret, get_secret

router = APIRouter()

# Unified POST endpoint for connectors
@router.post("/secrets/connector", status_code=201)
def store_connector_secret(payload: ConnectorSecret, user_id: str):
    connector_name = payload.connector_name
    secret = payload.secret
    store_secret(user_id, secret, connector_name)
    return {"message": f"{connector_name} secret stored successfully."}

# Unified GET endpoint for connectors
@router.get("/secrets/connector")
def get_connector_secret(connector_name: str, user_id: str):
    secret = get_secret(user_id, connector_name)
    if not secret:
        raise HTTPException(status_code=404, detail="Secret not found.")
    return secret
