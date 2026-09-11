import { projects, skills, profile, type Project } from './data/projects';
import './App.css';

const categoryLabels: Record<string, string> = {
  fullstack: 'Full-Stack',
  backend: 'Backend',
  frontend: 'Frontend',
  ai: 'IA / Automação',
};

const categoryColors: Record<string, string> = {
  fullstack: 'var(--accent)',
  backend: 'var(--green)',
  frontend: 'var(--cyan)',
  ai: 'var(--purple)',
};

const skillLabels: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Dados',
  devops: 'DevOps',
  ia: 'IA',
  ferramentas: 'Ferramentas',
};

const statusLabels: Record<NonNullable<Project['status']>, string> = {
  ready: 'Pronto para demo',
  wip: 'Em evolução',
};

function ProjectCard({ project }: { project: Project }) {
  const isFeatured = Boolean(project.featured);

  return (
    <article
      id={project.id}
      className={`project-card${isFeatured ? ' featured' : ''}`}
    >
      <div className="project-header">
        <div className="project-badges">
          <span
            className="project-category"
            style={{
              color: categoryColors[project.category],
              borderColor: categoryColors[project.category],
            }}
          >
            {categoryLabels[project.category]}
          </span>
          {isFeatured && <span className="project-featured-label">Destaque</span>}
          {project.status && (
            <span className={`project-status status-${project.status}`}>
              {statusLabels[project.status]}
            </span>
          )}
        </div>
        <h3>{project.title}</h3>
      </div>
      <p className="project-desc">{project.description}</p>
      <ul className="project-highlights">
        {project.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      <div className="project-stack">
        {project.stack.map((tech) => (
          <span key={tech} className="tech-tag">
            {tech}
          </span>
        ))}
      </div>
      {(project.github || project.demo) && (
        <div className="project-links">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer">
              GitHub →
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer">
              Demo live →
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export default function App() {
  const hasGithub = Boolean(profile.github);
  const hasLinkedin = Boolean(profile.linkedin);
  const hasEmail = Boolean(profile.email);
  const featured = projects.filter((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  return (
    <div className="app">
      <a className="skip-link" href="#sobre">
        Ir para o conteúdo
      </a>
      <nav className="nav">
        <span className="nav-logo">{profile.initials}</span>
        <div className="nav-links">
          <a href="#sobre">Sobre</a>
          <a href="#projetos">Projetos</a>
          <a href="#skills">Skills</a>
          <a href="#contato">Contato</a>
        </div>
      </nav>

      <header className="hero">
        <p className="hero-badge">Aberto a estágio e júnior remoto</p>
        <h1>{profile.name}</h1>
        <p className="hero-role">{profile.role}</p>
        <p className="hero-bio">{profile.bio}</p>
        <div className="hero-actions">
          <a href="#taskflow-api" className="btn btn-primary">
            Ver TaskFlow API
          </a>
          <a href="#projetos" className="btn btn-secondary">
            Todos os projetos
          </a>
          {hasGithub && (
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-secondary">
              GitHub
            </a>
          )}
          {hasLinkedin && (
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary">
              LinkedIn
            </a>
          )}
        </div>
      </header>

      <section id="sobre" className="section">
        <h2>Sobre</h2>
        <p className="section-sub">Quem eu sou e o que estou buscando</p>
        <ul className="about-list">
          {profile.about.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section id="projetos" className="section">
        <h2>Projetos</h2>
        <p className="section-sub">
          TaskFlow é o recorte backend mais completo. Os demais mostram frontend, um workspace de IA
          em HTML/JS e um dashboard ainda em evolução.
        </p>
        {featured.length > 0 && (
          <div className="featured-grid">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
        <div className="projects-grid">
          {rest.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section id="skills" className="section">
        <h2>Skills</h2>
        <div className="skills-grid">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group} className="skill-group">
              <h3>{skillLabels[group] ?? group}</h3>
              <div className="skill-tags">
                {items.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contato" className="section contact">
        <h2>Contato</h2>
        <p>Aberto a estágio e vaga júnior remota — e a conversas sobre os projetos acima.</p>
        <div className="contact-links">
          {hasEmail && (
            <a href={`mailto:${profile.email}`} className="btn btn-primary">
              {profile.email}
            </a>
          )}
          {hasLinkedin && (
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary">
              LinkedIn
            </a>
          )}
          {hasGithub && (
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-secondary">
              GitHub
            </a>
          )}
          {!hasEmail && !hasLinkedin && !hasGithub && (
            <p className="contact-pending">
              E-mail, GitHub e LinkedIn entram aqui assim que os perfis estiverem prontos.
            </p>
          )}
        </div>
        <p className="contact-location">{profile.location}</p>
      </section>

      <footer className="footer">
        <p>
          {profile.name} · React + TypeScript · {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
