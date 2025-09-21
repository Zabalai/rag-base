from fastapi import APIRouter, HTTPException
from app.models.secret import ObjectStorageSecret, EmailConnectorSecret
from app.services.vault import store_secret, get_secret

router = APIRouter()

@router.post("/secrets/object-storage", status_code=201)
def store_object_storage_secret(secret: ObjectStorageSecret, user_id: str):
    store_secret(user_id, secret)
    return {"message": "Secret stored successfully."}

@router.get("/secrets/connectors-secret")
def get_connectors_secret(user_id: str):
    secret = get_secret(user_id)
    if not secret:
        raise HTTPException(status_code=404, detail="Secret not found.")
    return secret

# Email connector
@router.post("/secrets/email", status_code=201)
def store_email_connector_secret(secret: EmailConnectorSecret, user_id: str):
    store_secret(user_id, secret)
    return {"message": "Email secret stored successfully."}
