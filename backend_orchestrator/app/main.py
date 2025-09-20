from fastapi import FastAPI
from app.api.v1.status import router as status_router

app = FastAPI()
app.include_router(status_router, prefix="/api/v1/status")

# TODO: Add startup event to load orchestrator config file
