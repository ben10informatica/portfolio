"EOF"
cat > gerenciador-de-tarefas-api/app/routers/tasks.py << 'EOF'
"""Endpoints de tarefas."""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from app import crud, schemas
from app.database import get_db
from app.auth import get_current_user
from app.models import User

router = APIRouter()


@router.post("/", response_model=schemas.Task, status_code=201)
def create_task(
    task: schemas.TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return crud.create_task(db, task, current_user.id)


@router.get("/", response_model=List[schemas.Task])
def list_tasks(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return crud.get_tasks(db, current_user.id, skip, limit)


@router.get("/{task_id}", response_model=schemas.Task)
def get_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    task = db.query(models.Task).filter(
        models.Task.id == task_id,
        models.Task.owner_id == current_user.id
    ).first()
    if not task:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    return task


@router.put("/{task_id}", response_model=schemas.Task)
def update_task(
    task_id: int,
    task: schemas.TaskUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    updated = crud.update_task(db, task_id, task, current_user.id)
    if not updated:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    return updated


@router.delete("/{task_id}", status_code=204)
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    deleted = crud.delete_task(db, task_id, current_user.id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
