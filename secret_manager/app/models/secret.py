
from pydantic import BaseModel
from typing import Optional, Union

class ObjectStorageSecret(BaseModel):
    endpoint: str
    access_key: str
    secret_key: str
    bucket: Optional[str] = None

class EmailConnectorSecret(BaseModel):
    smtp_server: str
    smtp_user: str
    smtp_password: str

class ConnectorSecret(BaseModel):
    connector_name: str
    secret: Union[ObjectStorageSecret, EmailConnectorSecret]
