# YouTube Growth Dashboard

Frontend React para o YouTube Growth Bot — demonstração full-stack para portfólio.

## Stack

- React + TypeScript
- Vite (proxy para API Express)
- API backend na raiz do repositório

## Pré-requisito

A API Express precisa estar rodando:

```bash
# Na raiz do projeto (projetosprogramacao/)
npm run build
npm run server
```

Configure `.env` com `YOUTUBE_API_KEY` e opcionalmente `GROQ_API_KEY`.

## Como rodar o dashboard

```bash
cd portfolio/youtube-dashboard
npm install
npm run dev
```

Acesse `http://localhost:5174`

## Funcionalidades

- Pesquisa de tendências
- Geração de títulos e descrições
- Ideias e scripts com IA
- Métricas do canal

## Destaques para currículo

- Frontend React consumindo REST API
- Proxy Vite para desenvolvimento
- UI com tabs e feedback de loading/erro
- Integração com APIs externas (YouTube + LLM)
