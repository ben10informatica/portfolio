async function post<T>(endpoint: string, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(`/api/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || 'Erro na API');
  return json.data;
}

async function get<T>(endpoint: string): Promise<T> {
  const res = await fetch(`/api/${endpoint}`);
  const json = await res.json();
  if (!json.success) throw new Error(json.error || 'Erro na API');
  return json.data;
}

export const api = {
  trends: (topic: string) => post('trends', { topic }),
  title: (topic: string) => post('title', { topic }),
  description: (topic: string, title?: string) => post('description', { topic, title }),
  ideas: (niche: string, count = 5) => post('ideas', { niche, count }),
  script: (topic: string, duration = '10 minutos') => post('script', { topic, duration }),
  optimize: (title: string, description: string, tags: string[]) =>
    post('optimize', { title, description, tags }),
  metrics: () => get('metrics'),
};
