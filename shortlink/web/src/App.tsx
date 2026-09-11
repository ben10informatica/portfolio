import { FormEvent, useEffect, useState } from 'react';
import { checkHealth, createLink, listLinks, type LinkItem } from './api';
import './App.css';

export default function App() {
  const [apiUp, setApiUp] = useState<boolean | null>(null);
  const [url, setUrl] = useState('https://example.com');
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [last, setLast] = useState<LinkItem | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function refresh() {
    setLinks(await listLinks());
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const healthy = await checkHealth();
      if (cancelled) return;
      setApiUp(healthy);
      if (healthy) {
        try {
          setLinks(await listLinks());
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Falha ao listar');
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError('');
    setCopied(false);
    try {
      const created = await createLink(url.trim());
      setLast(created);
      setUrl('');
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao encurtar');
    } finally {
      setBusy(false);
    }
  }

  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      setError('Não foi possível copiar. Selecione o link e copie manualmente.');
    }
  }

  return (
    <div className="app">
      <header>
        <p className="eyebrow">ShortLink</p>
        <h1>Encurtador local</h1>
        <p className="muted">
          Demo full-stack pequena: FastAPI + SQLite + React. O link curto aponta para a API em{' '}
          <code>http://127.0.0.1:8002/codigo</code> — não há domínio público.
        </p>
      </header>

      {apiUp === false && (
        <p className="banner error" role="status">
          API fora do ar. Suba <code>shortlink/api</code> na porta 8002.
        </p>
      )}
      {apiUp === true && (
        <p className="banner ok" role="status">
          API ok em /health.
        </p>
      )}

      <form onSubmit={onSubmit}>
        <label>
          URL original
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://…"
            required
          />
        </label>
        <button type="submit" disabled={busy || apiUp === false || !url.trim()}>
          {busy ? 'Encurtando…' : 'Encurtar'}
        </button>
      </form>

      {error && <p className="form-error">{error}</p>}

      {last && (
        <section className="result">
          <h2>Último link</h2>
          <p>
            <a href={last.short_url} target="_blank" rel="noreferrer">
              {last.short_url}
            </a>
          </p>
          <p className="muted">destino: {last.url}</p>
          <button type="button" className="ghost" onClick={() => copy(last.short_url)}>
            {copied ? 'Copiado' : 'Copiar'}
          </button>
        </section>
      )}

      <section>
        <h2>Recentes</h2>
        {links.length === 0 ? (
          <p className="muted">Nenhum link ainda. Encurte um acima.</p>
        ) : (
          <ul>
            {links.map((link) => (
              <li key={link.id}>
                <a href={link.short_url} target="_blank" rel="noreferrer">
                  {link.short_url}
                </a>
                <span className="clicks">{link.clicks} clique(s)</span>
                <span className="dest">{link.url}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
