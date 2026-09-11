import { useMemo, useState } from 'react';
import { calculateTip, formatMoney, parseAmount } from './calc';
import './App.css';

const PRESETS = [10, 15, 18, 20, 25];

export default function App() {
  const [bill, setBill] = useState('');
  const [tipPercent, setTipPercent] = useState(15);
  const [customTip, setCustomTip] = useState('');
  const [useCustom, setUseCustom] = useState(false);
  const [people, setPeople] = useState('1');

  const billValue = parseAmount(bill);
  const customValue = parseAmount(customTip);
  const peopleValue = parseAmount(people);
  const effectiveTip = useCustom ? customValue : tipPercent;
  const split = peopleValue !== null && peopleValue >= 1 ? Math.floor(peopleValue) : 1;

  const result = useMemo(() => {
    if (billValue === null || effectiveTip === null) return null;
    return calculateTip(billValue, effectiveTip, split);
  }, [billValue, effectiveTip, split]);

  const billError = bill !== '' && (billValue === null || billValue < 0);
  const tipError = useCustom && customTip !== '' && (customValue === null || customValue < 0);
  const peopleError = people !== '' && (peopleValue === null || peopleValue < 1);

  function reset() {
    setBill('');
    setTipPercent(15);
    setCustomTip('');
    setUseCustom(false);
    setPeople('1');
  }

  function selectPreset(percent: number) {
    setTipPercent(percent);
    setUseCustom(false);
  }

  return (
    <div className="app">
      <header>
        <p className="eyebrow">Tip Calculator</p>
        <h1>Gorjeta e divisão da conta</h1>
        <p className="muted">
          Frontend local em React + TypeScript + Vite. Sem backend, sem login e sem URL pública.
        </p>
      </header>

      <div className="layout">
        <section className="card" aria-labelledby="inputs-title">
          <h2 id="inputs-title">Conta</h2>

          <label>
            Valor da conta (R$)
            <input
              type="text"
              inputMode="decimal"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              placeholder="0,00"
              aria-invalid={billError}
            />
          </label>
          {billError && <p className="form-error">Informe um valor maior ou igual a zero.</p>}

          <fieldset className="presets">
            <legend>Gorjeta</legend>
            <div className="preset-row">
              {PRESETS.map((percent) => (
                <button
                  key={percent}
                  type="button"
                  className={!useCustom && tipPercent === percent ? 'active' : ''}
                  onClick={() => selectPreset(percent)}
                >
                  {percent}%
                </button>
              ))}
              <button
                type="button"
                className={useCustom ? 'active' : ''}
                onClick={() => setUseCustom(true)}
              >
                Outro
              </button>
            </div>
            {useCustom && (
              <label>
                Percentual customizado
                <input
                  type="text"
                  inputMode="decimal"
                  value={customTip}
                  onChange={(e) => setCustomTip(e.target.value)}
                  placeholder="12,5"
                  aria-invalid={tipError}
                />
              </label>
            )}
            {tipError && <p className="form-error">Informe um percentual maior ou igual a zero.</p>}
          </fieldset>

          <label>
            Dividir entre quantas pessoas?
            <input
              type="number"
              min={1}
              step={1}
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              aria-invalid={peopleError}
            />
          </label>
          {peopleError && <p className="form-error">Use pelo menos 1 pessoa.</p>}

          <button type="button" className="ghost" onClick={reset}>
            Limpar
          </button>
        </section>

        <section className="card results" aria-labelledby="results-title">
          <h2 id="results-title">Resultado</h2>
          {result ? (
            <dl>
              <div>
                <dt>Gorjeta</dt>
                <dd>{formatMoney(result.tipAmount)}</dd>
              </div>
              <div>
                <dt>Total</dt>
                <dd className="total">{formatMoney(result.total)}</dd>
              </div>
              {split > 1 && (
                <>
                  <div>
                    <dt>Gorjeta por pessoa</dt>
                    <dd>{formatMoney(result.tipPerPerson)}</dd>
                  </div>
                  <div>
                    <dt>Total por pessoa</dt>
                    <dd>{formatMoney(result.totalPerPerson)}</dd>
                  </div>
                </>
              )}
            </dl>
          ) : (
            <p className="muted">
              Digite o valor da conta{useCustom ? ' e o percentual' : ''} para ver a gorjeta e o
              total.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
