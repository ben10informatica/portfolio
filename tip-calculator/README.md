# Tip Calculator

Calculadora de gorjeta **local** em React + TypeScript + Vite.

Não é um produto publicado: roda só na sua máquina. Sem backend, sem login e sem deploy.

## Stack

React 18 · TypeScript · Vite 5

## O que faz

- Calcula gorjeta e total a partir do valor da conta
- Percentuais prontos (10, 15, 18, 20, 25) ou valor customizado
- Divide o resultado entre N pessoas (opcional)

## Como rodar

```bash
cd tip-calculator
npm install
npm run dev
```

Abra `http://localhost:5177`.

Build de verificação (não publica nada):

```bash
npm run build
```

## Limitações (honestas)

- Sem persistência: recarregar a página zera os campos
- Sem moeda configurável — formata em Real (BRL)
- Sem testes automatizados além do `npm run build` no CI
- Sem URL pública
