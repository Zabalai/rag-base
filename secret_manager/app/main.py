from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.secrets import router as secrets_router

app = FastAPI()

app.add_middleware(
	CORSMiddleware,
	allow_origins=["http://localhost:3000", "https://secret-manager.localhost.com"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"]
)

app.include_router(secrets_router, prefix="/api/v1")
