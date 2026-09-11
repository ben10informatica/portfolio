# Portfólio — João Victor

Projetos para currículo, com foco em vagas remotas.

## O que tem aqui

| Projeto | O que é | Pasta |
|---------|---------|-------|
| Site | Landing page em React + TypeScript + Vite | [`site/`](./site/) |
| TaskFlow API | API de tarefas com JWT, Swagger e Docker | [`taskflow-api/`](./taskflow-api/) |
| AI Workspace | Chat web com Groq (Llama) | [`ai-workspace/`](./ai-workspace/) |
| YouTube Dashboard | Painel React para métricas e ideias de conteúdo | [`youtube-dashboard/`](./youtube-dashboard/) |

## Como rodar

```bash
git clone https://github.com/ben10informatica/portfolio.git
cd portfolio
```

**Site**

```bash
cd site
npm install
npm run dev
```

**TaskFlow API**

```bash
cd taskflow-api
cp .env.example .env
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**AI Workspace**

```bash
cd ai-workspace
cp .env.example .env
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

**YouTube Dashboard**

```bash
cd youtube-dashboard
npm install
npm run dev
```

Cada pasta tem o próprio README com mais detalhe.

## Contato

- GitHub: [ben10informatica](https://github.com/ben10informatica)
- Currículo: [curriculo](https://github.com/ben10informatica/curriculo)
