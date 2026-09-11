from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "sqlite:///./shortlink.db"
    base_url: str = "http://127.0.0.1:8002"

    class Config:
        env_file = ".env"


settings = Settings()
