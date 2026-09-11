from datetime import datetime

from pydantic import BaseModel, Field, HttpUrl


class LinkCreate(BaseModel):
    url: HttpUrl


class LinkResponse(BaseModel):
    id: int
    code: str
    url: str
    short_url: str
    clicks: int
    created_at: datetime

    model_config = {"from_attributes": True}


class HealthResponse(BaseModel):
    status: str = Field(examples=["ok"])
