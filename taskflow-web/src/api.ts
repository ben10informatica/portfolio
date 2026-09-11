const TOKEN_KEY = 'taskflow_token';

export type Priority = 'low' | 'medium' | 'high';

export type User = {
  id: number;
  email: string;
  full_name: string;
  created_at: string;
};

export type Task = {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  priority: Priority;
  owner_id: number;
  created_at: string;
  updated_at: string;
};

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

async function readError(res: Response): Promise<string> {
  try {
    const data = (await res.json()) as { detail?: unknown };
    if (typeof data.detail === 'string') return data.detail;
    if (Array.isArray(data.detail)) {
      return data.detail
        .map((item) => {
          if (item && typeof item === 'object' && 'msg' in item) {
            return String((item as { msg: string }).msg);
          }
          return JSON.stringify(item);
        })
        .join('; ');
    }
  } catch {
    /* body não é JSON */
  }
  if (res.status === 502 || res.status === 504) {
    return 'API indisponível. Suba a TaskFlow API em http://127.0.0.1:8000.';
  }
  return `Erro ${res.status}`;
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  const token = getToken();
  if (token) headers.set('Authorization', `Bearer ${token}`);
  if (init.body && !(init.body instanceof URLSearchParams) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  let res: Response;
  try {
    res = await fetch(`/api${path}`, { ...init, headers });
  } catch {
    throw new Error('API indisponível. Suba a TaskFlow API em http://127.0.0.1:8000.');
  }

  if (res.status === 204) return undefined as T;
  if (!res.ok) {
    if (res.status === 401) clearToken();
    throw new Error(await readError(res));
  }
  return res.json() as Promise<T>;
}

export async function checkHealth(): Promise<boolean> {
  try {
    const res = await fetch('/api/health');
    return res.ok;
  } catch {
    return false;
  }
}

export function register(email: string, password: string, fullName: string) {
  return request<User>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, full_name: fullName }),
  });
}

export async function login(email: string, password: string) {
  const body = new URLSearchParams();
  body.set('username', email);
  body.set('password', password);
  const data = await request<{ access_token: string }>('/auth/login', { method: 'POST', body });
  setToken(data.access_token);
  return data;
}

export function me() {
  return request<User>('/auth/me');
}

export function listTasks(completed?: boolean) {
  const query = completed === undefined ? '' : `?completed=${completed}`;
  return request<Task[]>(`/tasks${query}`);
}

export function createTask(payload: { title: string; description?: string; priority: Priority }) {
  return request<Task>('/tasks', { method: 'POST', body: JSON.stringify(payload) });
}

export function updateTask(
  id: number,
  payload: Partial<Pick<Task, 'title' | 'description' | 'completed' | 'priority'>>
) {
  return request<Task>(`/tasks/${id}`, { method: 'PATCH', body: JSON.stringify(payload) });
}

export function deleteTask(id: number) {
  return request<void>(`/tasks/${id}`, { method: 'DELETE' });
}
