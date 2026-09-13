"""Endpoints de usuários."""
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from app import crud, schemas
from app.database import get_db
from app.auth import (
    authenticate_user,
    create_access_token,
    ACCESS_TOKEN_EXPIRE_MINUTES
)

router = APIRouter()


@router.post("/", response_model=schemas.User, status_code=201)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, user.email)
    if db_user:
        raise HTTPException(
            status_code=400,
            detail="Email já registrado"
        )
    db_user = crud.get_user_by_username(db, user.username)
    if db_user:
        raise HTTPException(
            status_code=400,
            detail="Username já está em uso"
        )
    return crud.create_user(db, user)


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciais incorretas",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username},
        expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "Bearer"}
