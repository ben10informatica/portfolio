export type LinkItem = {
  id: number;
  code: string;
  url: string;
  short_url: string;
  clicks: number;
  created_at: string;
};

async function readError(res: Response): Promise<string> {
  try {
    const data = (await res.json()) as { detail?: unknown };
    if (typeof data.detail === 'string') return data.detail;
    if (Array.isArray(data.detail)) {
      return 'URL inválida. Use um endereço com http:// ou https://.';
    }
  } catch {
    /* ignore */
  }
  if (res.status === 502 || res.status === 504) {
    return 'API indisponível. Suba a ShortLink API em http://127.0.0.1:8002.';
  }
  return `Erro ${res.status}`;
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  let res: Response;
  try {
    res = await fetch(`/api${path}`, { ...init, headers });
  } catch {
    throw new Error('API indisponível. Suba a ShortLink API em http://127.0.0.1:8002.');
  }
  if (!res.ok) throw new Error(await readError(res));
  return res.json() as Promise<T>;
}

export function checkHealth(): Promise<boolean> {
  return fetch('/api/health')
    .then((res) => res.ok)
    .catch(() => false);
}

export function listLinks() {
  return request<LinkItem[]>('/links');
}

export function createLink(url: string) {
  return request<LinkItem>('/links', { method: 'POST', body: JSON.stringify({ url }) });
}
