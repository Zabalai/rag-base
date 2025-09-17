# Backend (FastAPI)

## Setup

1. Create and activate virtual environment:
   ```sh
   python3 -m venv venv
   source venv/bin/activate
   ```
2. Install dependencies:
   ```sh
   pip install fastapi uvicorn python-keycloak
   ```
3. Copy `.env.example` to `.env` and fill in your Keycloak details.

## Run

```sh
uvicorn main:app --reload
```

## Endpoints
- `/api/check-login`: Checks if user is logged in via Keycloak
- `/api/rag/mock`: Mock RAG response
