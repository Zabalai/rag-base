from pydantic import BaseModel
from typing import Optional

class ObjectStorageSecret(BaseModel):
    endpoint: str
    access_key: str
    secret_key: str
    bucket: Optional[str] = None
