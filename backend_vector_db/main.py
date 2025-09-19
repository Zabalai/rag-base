from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2AuthorizationCodeBearer
import os
import re

app = FastAPI()

# Example endpoint
@app.get("/api/rag/mock")
def rag_mock():
    return {"result": "This is a mock RAG response."}
