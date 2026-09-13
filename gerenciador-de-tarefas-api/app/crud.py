"""Operações no banco de dados."""
from sqlalchemy.orm import Session
from app import models, schemas
from app.auth import get_password_hash


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_tasks(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    return db.query(models.Task).filter(
        models.Task.owner_id == user_id
    ).offset(skip).limit(limit).all()


def create_task(db: Session, task: schemas.TaskCreate, user_id: int):
    db_task = models.Task(**task.dict(), owner_id=user_id)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


def update_task(db: Session, task_id: int, task: schemas.TaskUpdate, user_id: int):
    db_task = db.query(models.Task).filter(
        models.Task.id == task_id,
        models.Task.owner_id == user_id
    ).first()
    if not db_task:
        return None
    
    update_data = task.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_task, field, value)
    
    db.commit()
    db.refresh(db_task)
    return db_task


def delete_task(db: Session, task_id: int, user_id: int):
    db_task = db.query(models.Task).filter(
        models.Task.id == task_id,
        models.Task.owner_id == user_id
    ).first()
    if not db_task:
        return False
    
    db.delete(db_task)
    db.commit()
    return True
