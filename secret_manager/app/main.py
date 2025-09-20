from fastapi import FastAPI
from app.api.v1.secrets import router as secrets_router

app = FastAPI()
app.include_router(secrets_router, prefix="/api/v1")
