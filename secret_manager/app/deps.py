from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import os
from keycloak import KeycloakOpenID

KEYCLOAK_URL = os.getenv("KEYCLOAK_URL", "http://localhost:8080")
KEYCLOAK_REALM = os.getenv("KEYCLOAK_REALM", "zabalai")
KEYCLOAK_CLIENT_ID = os.getenv("KEYCLOAK_CLIENT_ID", "secret-manager")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

# Keycloak client setup
keycloak_openid = KeycloakOpenID(server_url=KEYCLOAK_URL, client_id=KEYCLOAK_CLIENT_ID, realm_name=KEYCLOAK_REALM)

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        userinfo = keycloak_openid.userinfo(token)
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials")
    user_id = userinfo.get("sub")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User ID not found in token")
    return user_id
