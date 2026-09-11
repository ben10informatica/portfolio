from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    secret_key: str = "dev-secret-change-in-production"
    database_url: str = "sqlite:///./taskflow.db"
    access_token_expire_minutes: int = 60
    algorithm: str = "HS256"

    class Config:
        env_file = ".env"


settings = Settings()
