from fastapi import APIRouter, Depends, HTTPException
from app.models.secret import ObjectStorageSecret
from app.services.vault import store_secret, get_secret

router = APIRouter()

@router.post("/secrets/object-storage", status_code=201)
def store_object_storage_secret(secret: ObjectStorageSecret, user_id: str):
    store_secret(user_id, secret)
    return {"message": "Secret stored successfully."}

@router.get("/secrets/object-storage")
def get_object_storage_secret(user_id: str):
    secret = get_secret(user_id)
    if not secret:
        raise HTTPException(status_code=404, detail="Secret not found.")
    return secret
