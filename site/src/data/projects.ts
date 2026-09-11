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
    id: 'youtube-dashboard',
    title: 'YouTube Growth Dashboard',
    description:
      'Painel full-stack para crescimento de canal: tendências, métricas, concorrentes e geração de conteúdo com IA. Backend Express na raiz do workspace + frontend React.',
    stack: ['TypeScript', 'React', 'Express', 'YouTube API', 'Groq'],
    category: 'fullstack',
    highlights: [
      'API REST com 12+ endpoints',
      'Integração YouTube Data API v3',
      'Títulos, scripts e ideias com LLM',
    ],
  },
  {
    id: 'taskflow-api',
    title: 'TaskFlow API',
    description:
      'API REST de tarefas com cadastro, login JWT, CRUD isolado por usuário, Swagger e Docker — o tipo de backend que empresas remotas pedem em teste técnico.',
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'JWT', 'Docker'],
    category: 'backend',
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
      'Assistente web de produtividade: chat com histórico, prompts prontos e integração com Groq (Llama). Pensado para mostrar IA aplicada, não só um tutorial.',
    stack: ['Python', 'FastAPI', 'Groq', 'HTML/CSS/JS'],
    category: 'ai',
    highlights: [
      'Chat com contexto da conversa',
      'LLM gratuito via Groq',
      'Interface de workspace',
    ],
  },
  {
    id: 'jarvis',
    title: 'JARVIS Assistant',
    description:
      'Assistente de voz no desktop: fala, escuta, abre apps e automatiza o PC. Projeto pessoal de automação com interface web embarcada.',
    stack: ['Python', 'Eel', 'Edge-TTS', 'PyAutoGUI'],
    category: 'ai',
    highlights: [
      'Síntese e comandos de voz',
      'Registro de aplicativos',
      'Controle de mouse/teclado',
    ],
  },
  {
    id: 'discord-bot',
    title: 'Bot Discord + IA',
    description:
      'Bot com memória persistente, reconhecimento de voz e respostas via LLM. Útil para mostrar integração de APIs e bots em produção informal.',
    stack: ['Python', 'SpeechRecognition', 'Anthropic', 'edge-tts'],
    category: 'backend',
    highlights: [
      'Memória em JSON',
      'Voz + texto',
      'Integração com LLM',
    ],
  },
];

export const skills = {
  frontend: ['React', 'TypeScript', 'Vite', 'HTML/CSS', 'UI responsiva'],
  backend: ['Node.js', 'Express', 'Python', 'FastAPI', 'REST APIs'],
  database: ['SQLite', 'SQLAlchemy', 'JSON persistente'],
  devops: ['Docker', 'GitHub Actions', 'Vercel / Railway'],
  ia: ['Groq', 'OpenAI API', 'Anthropic', 'Prompt engineering'],
  ferramentas: ['Git', 'Cursor', 'Windows', 'APIs externas'],
};

export const profile = {
  name: 'João Victor',
  initials: 'JV',
  role: 'Desenvolvedor Full-Stack · aberto a remoto',
  bio: 'Construo APIs, dashboards e automações com IA. Estou montando um portfólio para vagas home office, com projetos em TypeScript/React e Python/FastAPI.',
  about: [
    'Trabalho com TypeScript (Express, React) e Python (FastAPI, automação e voz).',
    'Gosto de produtos completos: da API documentada até a interface que o usuário usa.',
    'Busco vaga remota para crescer em time, com código limpo e entrega constante.',
  ],
  email: '',
  github: 'https://github.com/Miphj',
  linkedin: '',
  location: 'Brasil · 100% remoto',
};
