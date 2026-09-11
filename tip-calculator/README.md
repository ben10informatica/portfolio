# Tip Calculator

Calculadora de gorjeta **local** em React + TypeScript + Vite.

Não é um produto publicado: roda só na sua máquina. Sem backend, sem login e sem deploy. Este repositório (`portfolio`) **não tem GitHub Pages** — o currículo ao vivo é outro repo.

![Tip Calculator em funcionamento](docs/screenshot.png)

A captura acima é real: conta `100`, gorjeta `15%`, 2 pessoas → gorjeta `R$ 15,00`, total `R$ 115,00`, `R$ 57,50` por pessoa.

## Stack

React 18 · TypeScript · Vite 5

## O que faz

- Calcula gorjeta e total a partir do valor da conta
- Percentuais prontos (10, 15, 18, 20, 25) ou valor customizado
- Divide o resultado entre N pessoas (opcional)

## Como demonstrar (local)

```bash
cd tip-calculator
npm install
npm run dev
```

Abra **http://localhost:5177** e:

1. Valor da conta: `100`
2. Preset `15%` (já vem selecionado)
3. Pessoas: `2`
4. Confira gorjeta `R$ 15,00`, total `R$ 115,00` e total por pessoa `R$ 57,50`
5. Clique em **Outro** e teste `12,5`
6. **Limpar** zera os campos

Build de verificação (não publica nada):

```bash
npm run build
```

## Limitações (honestas)

- Sem persistência: recarregar a página zera os campos
- Sem moeda configurável — formata em Real (BRL)
- Sem testes automatizados além do `npm run build` no CI
- Sem URL pública / GitHub Pages neste repo
