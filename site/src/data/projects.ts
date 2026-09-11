export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  category: 'fullstack' | 'backend' | 'frontend' | 'ai';
  github?: string;
  demo?: string;
  highlights: string[];
  featured?: boolean;
  status?: 'ready' | 'wip';
}

export const projects: Project[] = [
  {
    id: 'taskflow-api',
    title: 'TaskFlow API',
    description:
      'API REST de tarefas com cadastro, login JWT, CRUD isolado por dono, OpenAPI e Docker Compose. Recorte backend de referência deste portfólio.',
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'JWT', 'SQLite', 'Docker'],
    category: 'backend',
    github: 'https://github.com/dev-joaovictor/portfolio/tree/main/taskflow-api',
    featured: true,
    status: 'ready',
    highlights: [
      'Auth JWT + fluxo OAuth2 password',
      'CRUD com isolamento por dono',
      'OpenAPI em /docs, pytest e Docker Compose',
    ],
  },
  {
    id: 'curriculo-site',
    title: 'Site de Currículo',
    description:
      'Landing page com projetos, skills e contato. Feita em React + TypeScript e publicada no GitHub Pages.',
    stack: ['React', 'TypeScript', 'Vite'],
    category: 'frontend',
    github: 'https://github.com/dev-joaovictor/curriculo',
    demo: 'https://dev-joaovictor.github.io/curriculo/',
    status: 'ready',
    highlights: [
      'Layout responsivo',
      'Dados centralizados em TypeScript',
      'Deploy automático com GitHub Pages',
    ],
  },
  {
    id: 'ai-workspace',
    title: 'AI Workspace',
    description:
      'Assistente web de produtividade com chat, prompts prontos e Groq (Llama). API em FastAPI; interface em HTML, CSS e JavaScript.',
    stack: ['Python', 'FastAPI', 'Groq', 'HTML/CSS/JS'],
    category: 'ai',
    github: 'https://github.com/dev-joaovictor/portfolio/tree/main/ai-workspace',
    status: 'ready',
    highlights: [
      'Chat com histórico',
      'LLM via Groq',
      'UI vanilla (HTML/CSS/JS), sem React',
    ],
  },
  {
    id: 'youtube-dashboard',
    title: 'YouTube Growth Dashboard',
    description:
      'Frontend React para painel de tendências e ideias de conteúdo. Em evolução — o backend Express ainda não está neste monorepo.',
    stack: ['TypeScript', 'React', 'Vite'],
    category: 'frontend',
    github: 'https://github.com/dev-joaovictor/portfolio/tree/main/youtube-dashboard',
    status: 'wip',
    highlights: [
      'UI com tabs e estados de loading',
      'Proxy Vite para API local',
      'Aguardando backend para dados reais',
    ],
  },
];

export const skills = {
  frontend: ['React', 'TypeScript', 'Vite', 'HTML/CSS', 'UI responsiva'],
  backend: ['Python', 'FastAPI', 'REST APIs', 'JWT'],
  database: ['SQLite', 'SQLAlchemy'],
  devops: ['Docker', 'GitHub Actions', 'GitHub Pages'],
  ia: ['Groq', 'Prompt engineering'],
  ferramentas: ['Git', 'Cursor', 'Windows'],
};

export const profile = {
  name: 'João Victor',
  initials: 'JV',
  role: 'Desenvolvedor júnior · aberto a estágio remoto',
  bio: 'Portfólio com APIs em Python/FastAPI e interfaces em React/TypeScript. Busco estágio ou vaga júnior remota para crescer em time e entregar com consistência.',
  about: [
    'Uso TypeScript (React) e Python (FastAPI) nos projetos deste portfólio.',
    'O recorte mais completo é a TaskFlow API: JWT, CRUD isolado por dono, OpenAPI e Docker.',
    'Busco estágio ou vaga júnior remota, com código claro e feedback de time.',
  ],
  email: 'dev-joaovictor@gmail.com',
  github: 'https://github.com/dev-joaovictor',
  linkedin: 'https://www.linkedin.com/in/joaovictor84',
  location: 'Brasil · 100% remoto',
};
