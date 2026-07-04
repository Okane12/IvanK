// ─────────────────────────────────────────────────────────────────────────
// Main app: navigation, hero, project grid grouped by category, and
// contact section. Switches to ProjectDetailPage when a card is opened.
// ─────────────────────────────────────────────────────────────────────────

const CATEGORY_ORDER = ['Academic & Personal Projects', 'Club & Team Projects', 'Design', 'Research'];

const CATEGORY_COLORS = {
  'Research': 'text-purple-400 border-purple-500/30 bg-purple-500/10',
  'Club & Team Projects': 'text-blue-400 border-blue-500/30 bg-blue-500/10',
  'Design': 'text-amber-400 border-amber-500/30 bg-amber-500/10',
  'Academic & Personal Projects': 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
};

const CATEGORY_ICONS = {
  'Research': '🔬',
  'Club & Team Projects': '🚀',
  'Design': '📐',
  'Academic & Personal Projects': '⚙️',
};

// Each project gets a URL like #/wind-turbine so the browser's back/forward
// buttons work and individual projects can be linked to directly.
const projectSlug = p => p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const projectFromHash = () => {
  const m = window.location.hash.match(/^#\/(.+)$/);
  return (m && PROJECTS.find(p => projectSlug(p) === m[1])) || null;
};

const App = () => {
  const [activeProject, setActiveProject] = React.useState(projectFromHash);
  const [selectedPdf, setSelectedPdf] = React.useState(null);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keep page state in sync with the URL hash (back/forward, direct links)
  React.useEffect(() => {
    const onHashChange = () => {
      const project = projectFromHash();
      setActiveProject(project);
      if (!project) {
        // Returning home: scroll to the projects grid after a tick
        setTimeout(() => {
          const el = document.getElementById('projects');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Trigger scroll-reveal after each page render
  React.useEffect(() => {
    window.runReveal && window.runReveal();
  }, [activeProject]);

  // Lock body scroll while the PDF modal is open
  React.useEffect(() => {
    document.body.style.overflow = selectedPdf ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPdf]);

  const scrollToSection = id => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Navigation happens through the URL hash; the hashchange listener
  // above updates the state.
  const handleLearnMore = project => {
    window.location.hash = '/' + projectSlug(project);
  };

  const handleBack = () => {
    window.location.hash = '';
  };

  // ── Project detail page ──
  if (activeProject) {
    return (
      <React.Fragment>
        <ProjectDetailPage project={activeProject} onBack={handleBack} onOpenPdf={setSelectedPdf} />
        {selectedPdf && <PdfModal selectedPdf={selectedPdf} onClose={() => setSelectedPdf(null)} />}
      </React.Fragment>
    );
  }

  // Group projects by category, in display order. Within a category,
  // projects sort by their optional `order` field.
  const groupedProjects = CATEGORY_ORDER
    .map(category => ({
      category,
      projects: PROJECTS
        .filter(p => p.category === category)
        .sort((a, b) => (a.order || 99) - (b.order || 99)),
    }))
    .filter(group => group.projects.length > 0);

  // ── Portfolio home page ──
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed nav */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${
        scrolled ? 'bg-[#0d1117]/95 backdrop-blur-md border-b border-amber-500/10 py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className="font-display text-2xl font-bold tracking-widest cursor-pointer"
               style={{ color: '#f59e0b' }}
               onClick={() => scrollToSection('home')}>
            {PROFILE_NAME.split(' ')[0]}
            <span style={{ color: '#8892a4' }}>.eng</span>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <button onClick={() => scrollToSection('projects')} className="nav-link">Projects</button>
            <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="home"
               className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 md:px-8 max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6 text-center md:text-left reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-400 text-xs font-mono tracking-widest mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse inline-block" />
            UC BERKELEY · MECH ENG
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-none"
              style={{ color: '#e2e8f0' }}>
            Ivan <span style={{ color: '#f59e0b' }}>Kuang</span>
          </h1>
          <p className="text-base md:text-lg max-w-lg mx-auto md:mx-0 leading-relaxed"
             style={{ color: '#8892a4' }}>
            {PROFILE_BIO}
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button onClick={() => scrollToSection('projects')} className="btn-primary px-8 py-4 rounded-xl">
              View Portfolio
            </button>
            <button onClick={() => scrollToSection('contact')} className="btn-secondary px-8 py-4 rounded-xl">
              Contact Me
            </button>
          </div>
        </div>

        {/* Photo with animated blobs */}
        <div className="flex-1 relative w-full max-w-md reveal" style={{ transitionDelay: '0.2s' }}>
          <div className="absolute top-0 -left-4 w-72 h-72 bg-amber-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-orange-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob"
               style={{ animationDelay: '2s' }} />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-600 rounded-full mix-blend-screen filter blur-3xl opacity-8 animate-blob"
               style={{ animationDelay: '4s' }} />
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-amber-900/20 rotate-3 hover:rotate-0 transition-transform duration-500 border border-amber-500/20">
            <img src="./images/me.png" alt={PROFILE_NAME} className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section id="projects" className="py-20" style={{ background: 'transparent' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-2 section-heading"
                style={{ color: '#e2e8f0', letterSpacing: '0.05em' }}>
              ENGINEERING PROJECTS
            </h2>
            <p className="max-w-2xl mx-auto mt-4" style={{ color: '#8892a4' }}>
              A detailed look at my design process, analysis, and fabrication work from UC Berkeley and beyond.
            </p>
          </div>

          {groupedProjects.map(({ category, projects }) => (
            <div key={category} className="mb-16 reveal">
              <div className="flex items-center gap-3 mb-8">
                <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold border ${CATEGORY_COLORS[category]}`}>
                  <span>{CATEGORY_ICONS[category]}</span>
                  {category}
                </span>
                <div className="flex-1 h-px"
                     style={{ background: 'linear-gradient(90deg, rgba(245,158,11,0.3), transparent)' }} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 reveal-stagger">
                {projects.map(project => (
                  <ProjectCard key={project.id} project={project} onLearnMore={handleLearnMore} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20"
               style={{ background: 'rgba(22,27,34,0.6)', borderTop: '1px solid rgba(245,158,11,0.1)' }}>
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center reveal">
          <h2 className="text-3xl font-display font-bold mb-8 section-heading"
              style={{ color: '#e2e8f0', letterSpacing: '0.05em' }}>
            LET'S BUILD SOMETHING
          </h2>
          <p className="text-xl mb-10" style={{ color: '#8892a4' }}>
            I'm currently available for mechanical design and engineering roles.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"
               className="btn-primary inline-flex items-center justify-center px-8 py-3 rounded-xl">
              LinkedIn
            </a>
            <button onClick={() => setSelectedPdf(RESUME)}
                    className="btn-secondary inline-flex items-center justify-center px-8 py-3 rounded-xl">
              Resume
            </button>
          </div>
          <p className="mt-16 font-mono text-sm" style={{ color: '#8892a4' }}>
            <a href={`tel:${CONTACT_PHONE}`} className="hover:text-amber-400 transition-colors">{CONTACT_PHONE}</a>
            &nbsp;·&nbsp;
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-amber-400 transition-colors">{CONTACT_EMAIL}</a>
          </p>
        </div>
      </section>

      {selectedPdf && <PdfModal selectedPdf={selectedPdf} onClose={() => setSelectedPdf(null)} />}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
