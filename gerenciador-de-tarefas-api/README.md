# 🧠 Gerenciador de Tarefas API

API RESTful completa para gerenciamento de tarefas com autenticação JWT, documentação Swagger e banco de dados SQLite.

## 🚀 Tecnologias

- **Python 3.11+**
- **FastAPI** - Framework web moderno e rápido
- **SQLAlchemy** - ORM para banco de dados
- **Pydantic** - Validação de dados
- **JWT (JSON Web Tokens)** - Autenticação segura
- **SQLite** - Banco de dados leve
- **Uvicorn** - Servidor ASGI

## ✨ Funcionalidades

- Cadastro e login de usuários
- CRUD completo de tarefas (Criar, Listar, Atualizar, Deletar)
- Filtros por status (pendente, em andamento, concluída)
- Paginação e ordenação de resultados
- Documentação automática via Swagger UI
- Testes unitários com pytest

## 📁 Estrutura do Projeto

```
gerenciador-de-tarefas-api/
├── app/
│   ├── __init__.py
│   ├── main.py          # Entry point da aplicação
│   ├── database.py      # Configuração do banco
│   ├── models.py        # Modelos SQLAlchemy
│   ├── schemas.py       # Schemas Pydantic
│   ├── crud.py          # Operações no banco
│   ├── auth.py          # Autenticação JWT
│   └── routers/
│       ├── tasks.py     # Endpoints de tarefas
│       └── users.py     # Endpoints de usuários
├── tests/
│   └── test_tasks.py    # Testes unitários
├── requirements.txt
├── README.md
└── .env.example
```

## 🛠️ Como Executar

```bash
# Clone o repositório
git clone https://github.com/dev-joaovictor/portfolio.git

# Entre na pasta do projeto
cd portfolio/gerenciador-de-tarefas-api

# Crie um ambiente virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou venv\Scriptsctivate  # Windows

# Instale as dependências
pip install -r requirements.txt

# Execute o servidor
uvicorn app.main:app --reload
```

## 📚 Documentação

Após iniciar o servidor, acesse o Swagger UI na porta 8000.

## 📧 Contato

- joaovictortrabalho084@gmail.com
- https://github.com/dev-joaovictor
