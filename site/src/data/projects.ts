export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  category: 'fullstack' | 'backend' | 'frontend' | 'ai';
  github?: string;
  demo?: string;
  highlights: string[];
}

export const projects: Project[] = [
  {
    id: 'curriculo-site',
    title: 'Site de Currículo',
    description:
      'Landing page com projetos, skills e contato. Feita em React + TypeScript e publicada no GitHub Pages.',
    stack: ['React', 'TypeScript', 'Vite'],
    category: 'frontend',
    github: 'https://github.com/ben10informatica/curriculo',
    demo: 'https://ben10informatica.github.io/curriculo/',
    highlights: [
      'Layout responsivo',
      'Dados centralizados em TypeScript',
      'Deploy automático com GitHub Pages',
    ],
  },
  {
    id: 'taskflow-api',
    title: 'TaskFlow API',
    description:
      'API REST de tarefas com cadastro, login JWT, CRUD por usuário, Swagger e Docker.',
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'JWT', 'Docker'],
    category: 'backend',
    github: 'https://github.com/ben10informatica/portfolio/tree/main/taskflow-api',
    highlights: [
      'Auth JWT + OAuth2 password flow',
      'CRUD com isolamento por dono',
      'OpenAPI em /docs e Docker Compose',
    ],
  },
  {
    id: 'ai-workspace',
    title: 'AI Workspace',
    description:
      'Assistente web de produtividade com chat, prompts prontos e integração Groq (Llama).',
    stack: ['Python', 'FastAPI', 'Groq', 'HTML/CSS/JS'],
    category: 'ai',
    github: 'https://github.com/ben10informatica/portfolio/tree/main/ai-workspace',
    highlights: [
      'Chat com histórico',
      'LLM via Groq',
      'Interface estilo workspace',
    ],
  },
  {
    id: 'youtube-dashboard',
    title: 'YouTube Growth Dashboard',
    description:
      'Frontend React para painel de tendências e ideias de conteúdo. Em evolução — a API Express ainda não está neste monorepo.',
    stack: ['TypeScript', 'React', 'Vite'],
    category: 'frontend',
    github: 'https://github.com/ben10informatica/portfolio/tree/main/youtube-dashboard',
    highlights: [
      'UI com tabs e estados de loading',
      'Proxy Vite para API local',
      'Pronto para plugar backend',
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
  role: 'Desenvolvedor Full-Stack · aberto a remoto',
  bio: 'Construo APIs, dashboards e automações com IA. Portfólio focado em vagas home office, com React/TypeScript e Python/FastAPI.',
  about: [
    'Trabalho com TypeScript (React) e Python (FastAPI).',
    'Gosto de produtos completos: da API documentada até a interface.',
    'Busco vaga remota para crescer em time, com código limpo e entrega constante.',
  ],
  email: 'ben10informatica@gmail.com',
  github: 'https://github.com/ben10informatica',
  linkedin: '',
  location: 'Brasil · 100% remoto',
};
