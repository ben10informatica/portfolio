import { useState } from 'react';
import { api } from './api';
import './App.css';

type Tab = 'trends' | 'content' | 'ai' | 'metrics';

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'trends', label: 'Tendências', icon: '📈' },
  { id: 'content', label: 'Conteúdo', icon: '📝' },
  { id: 'ai', label: 'IA', icon: '🤖' },
  { id: 'metrics', label: 'Métricas', icon: '📊' },
];

export default function App() {
  const [tab, setTab] = useState<Tab>('trends');
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function run(action: () => Promise<unknown>) {
    setLoading(true);
    setError('');
    setResult('');
    try {
      const data = await action();
      setResult(typeof data === 'string' ? data : JSON.stringify(data, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dashboard">
      <header className="header">
        <div className="header-brand">
          <span className="logo">▶</span>
          <div>
            <h1>YouTube Growth Dashboard</h1>
            <p>Full-Stack · React + Express + IA</p>
          </div>
        </div>
        <span className="badge">Portfólio</span>
      </header>

      <nav className="tabs">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`tab ${tab === t.id ? 'active' : ''}`}
            onClick={() => { setTab(t.id); setResult(''); setError(''); }}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </nav>

      <main className="content">
        <div className="panel">
          {tab === 'trends' && (
            <>
              <h2>Pesquisar Tendências</h2>
              <p className="hint">Analisa vídeos populares e sugere palavras-chave</p>
              <div className="form-row">
                <input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Ex: programação python"
                />
                <button onClick={() => run(() => api.trends(topic))} disabled={!topic || loading}>
                  Buscar
                </button>
              </div>
            </>
          )}

          {tab === 'content' && (
            <>
              <h2>Gerador de Conteúdo</h2>
              <p className="hint">Títulos e descrições otimizados para SEO</p>
              <div className="form-row">
                <input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Tópico do vídeo"
                />
              </div>
              <div className="btn-group">
                <button onClick={() => run(() => api.title(topic))} disabled={!topic || loading}>
                  Gerar Títulos
                </button>
                <button onClick={() => run(() => api.description(topic))} disabled={!topic || loading}>
                  Gerar Descrição
                </button>
              </div>
            </>
          )}

          {tab === 'ai' && (
            <>
              <h2>Ferramentas de IA</h2>
              <p className="hint">Ideias, scripts e otimização com Groq LLM</p>
              <div className="form-row">
                <input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Nicho ou tópico"
                />
              </div>
              <div className="btn-group">
                <button onClick={() => run(() => api.ideas(topic))} disabled={!topic || loading}>
                  Ideias de Vídeo
                </button>
                <button onClick={() => run(() => api.script(topic))} disabled={!topic || loading}>
                  Gerar Script
                </button>
              </div>
            </>
          )}

          {tab === 'metrics' && (
            <>
              <h2>Métricas do Canal</h2>
              <p className="hint">Estatísticas do canal configurado no .env</p>
              <button onClick={() => run(() => api.metrics())} disabled={loading}>
                Carregar Métricas
              </button>
            </>
          )}
        </div>

        <div className="panel result-panel">
          <h3>Resultado</h3>
          {loading && <p className="loading">Processando...</p>}
          {error && <p className="error">{error}</p>}
          {result && <pre className="result">{result}</pre>}
          {!loading && !error && !result && (
            <p className="placeholder">
              {tab === 'metrics'
                ? 'Clique em "Carregar Métricas" para ver os dados do canal.'
                : 'Preencha o campo e clique em uma ação.'}
            </p>
          )}
        </div>
      </main>

      <footer className="footer">
        Requer API rodando: <code>npm run server</code> na raiz do projeto
      </footer>
    </div>
  );
}
