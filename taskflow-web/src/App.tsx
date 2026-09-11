import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  checkHealth,
  clearToken,
  createTask,
  deleteTask,
  getToken,
  listTasks,
  login,
  me,
  register,
  updateTask,
  type Priority,
  type Task,
  type User,
} from './api';
import './App.css';

type Filter = 'all' | 'pending' | 'done';
type AuthMode = 'login' | 'register';

const priorityLabel: Record<Priority, string> = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
};

function AuthScreen({
  apiUp,
  onLoggedIn,
}: {
  apiUp: boolean | null;
  onLoggedIn: (user: User) => void;
}) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      if (mode === 'register') {
        await register(email, password, fullName);
      }
      await login(email, password);
      onLoggedIn(await me());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha no login');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <p className="eyebrow">TaskFlow Web</p>
        <h1>{mode === 'login' ? 'Entrar' : 'Criar conta'}</h1>
        <p className="muted">
          Frontend local da TaskFlow API. Precisa da API em{' '}
          <code>http://127.0.0.1:8000</code>.
        </p>
        {apiUp === false && (
          <p className="banner error" role="status">
            API fora do ar. Suba <code>taskflow-api</code> e recarregue.
          </p>
        )}
        {apiUp === true && (
          <p className="banner ok" role="status">
            API respondendo em /health.
          </p>
        )}
        <div className="tabs" role="tablist">
          <button
            type="button"
            className={mode === 'login' ? 'active' : ''}
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            type="button"
            className={mode === 'register' ? 'active' : ''}
            onClick={() => setMode('register')}
          >
            Cadastro
          </button>
        </div>
        <form onSubmit={onSubmit}>
          {mode === 'register' && (
            <label>
              Nome
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                minLength={2}
                required
                autoComplete="name"
              />
            </label>
          )}
          <label>
            E-mail
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </label>
          <label>
            Senha
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="btn-primary" disabled={busy || apiUp === false}>
            {busy ? 'Aguarde…' : mode === 'login' ? 'Entrar' : 'Cadastrar e entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}

function TaskRow({
  task,
  onChanged,
}: {
  task: Task;
  onChanged: () => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? '');
  const [priority, setPriority] = useState<Priority>(task.priority);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function save() {
    setBusy(true);
    setError('');
    try {
      await updateTask(task.id, {
        title: title.trim(),
        description: description.trim() || null,
        priority,
      });
      setEditing(false);
      await onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao salvar');
    } finally {
      setBusy(false);
    }
  }

  async function toggle() {
    setBusy(true);
    setError('');
    try {
      await updateTask(task.id, { completed: !task.completed });
      await onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao atualizar');
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!window.confirm(`Apagar “${task.title}”?`)) return;
    setBusy(true);
    setError('');
    try {
      await deleteTask(task.id);
      await onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao apagar');
    } finally {
      setBusy(false);
    }
  }

  return (
    <li className={`task ${task.completed ? 'done' : ''}`}>
      <label className="check">
        <input type="checkbox" checked={task.completed} onChange={toggle} disabled={busy} />
        <span className="sr-only">Concluir {task.title}</span>
      </label>
      {editing ? (
        <div className="edit-fields">
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="Descrição (opcional)"
          />
          <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </select>
        </div>
      ) : (
        <div className="task-body">
          <strong>{task.title}</strong>
          {task.description && <p>{task.description}</p>}
          <span className={`prio prio-${task.priority}`}>{priorityLabel[task.priority]}</span>
        </div>
      )}
      <div className="task-actions">
        {editing ? (
          <>
            <button type="button" onClick={save} disabled={busy || !title.trim()}>
              Salvar
            </button>
            <button type="button" onClick={() => setEditing(false)} disabled={busy}>
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button type="button" onClick={() => setEditing(true)} disabled={busy}>
              Editar
            </button>
            <button type="button" className="danger" onClick={remove} disabled={busy}>
              Apagar
            </button>
          </>
        )}
      </div>
      {error && <p className="form-error">{error}</p>}
    </li>
  );
}

export default function App() {
  const [apiUp, setApiUp] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [booting, setBooting] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const healthy = await checkHealth();
      if (cancelled) return;
      setApiUp(healthy);
      if (healthy && getToken()) {
        try {
          setUser(await me());
        } catch {
          clearToken();
        }
      }
      setBooting(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const completedParam = useMemo(() => {
    if (filter === 'pending') return false;
    if (filter === 'done') return true;
    return undefined;
  }, [filter]);

  async function refresh() {
    setTasks(await listTasks(completedParam));
  }

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      try {
        const data = await listTasks(completedParam);
        if (!cancelled) {
          setTasks(data);
          setError('');
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Falha ao listar');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, completedParam]);

  async function onCreate(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await createTask({
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
      });
      setTitle('');
      setDescription('');
      setPriority('medium');
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao criar');
    } finally {
      setBusy(false);
    }
  }

  function logout() {
    clearToken();
    setUser(null);
    setTasks([]);
  }

  if (booting) {
    return <p className="boot">Carregando…</p>;
  }

  if (!user) {
    return <AuthScreen apiUp={apiUp} onLoggedIn={setUser} />;
  }

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <p className="eyebrow">TaskFlow Web</p>
          <h1>Tarefas</h1>
          <p className="muted">
            Olá, {user.full_name}. Sessão local — token JWT no <code>localStorage</code>.
          </p>
        </div>
        <button type="button" className="btn-ghost" onClick={logout}>
          Sair
        </button>
      </header>

      {apiUp === false && (
        <p className="banner error" role="status">
          API fora do ar. Este front não funciona sozinho.
        </p>
      )}

      <form className="create" onSubmit={onCreate}>
        <h2>Nova tarefa</h2>
        <label>
          Título
          <input value={title} onChange={(e) => setTitle(e.target.value)} required maxLength={200} />
        </label>
        <label>
          Descrição
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="Opcional"
          />
        </label>
        <label>
          Prioridade
          <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </select>
        </label>
        <button type="submit" className="btn-primary" disabled={busy || !title.trim()}>
          {busy ? 'Salvando…' : 'Criar'}
        </button>
      </form>

      <div className="filters" role="tablist" aria-label="Filtro">
        {(['all', 'pending', 'done'] as Filter[]).map((item) => (
          <button
            key={item}
            type="button"
            className={filter === item ? 'active' : ''}
            onClick={() => setFilter(item)}
          >
            {item === 'all' ? 'Todas' : item === 'pending' ? 'Abertas' : 'Concluídas'}
          </button>
        ))}
      </div>

      {error && <p className="form-error">{error}</p>}

      {tasks.length === 0 ? (
        <p className="empty">Nenhuma tarefa neste filtro. Crie uma acima.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskRow key={task.id} task={task} onChanged={refresh} />
          ))}
        </ul>
      )}
    </div>
  );
}
