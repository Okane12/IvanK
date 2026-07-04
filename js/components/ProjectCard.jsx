// ─────────────────────────────────────────────────────────────────────────
// Project card shown in the home-page grid.
// ─────────────────────────────────────────────────────────────────────────

// Builds the inline style for a project image, honoring optional
// per-project tweaks set in js/data.js. imageFit: 'contain' shows the
// whole image on an imageBg background instead of cropping to fill.
const projectImageStyle = project => ({
  objectFit: project.imageFit || 'cover',
  objectPosition: project.imagePosition || 'center',
  transform: project.imageScale ? `scale(${project.imageScale})` : undefined,
  transformOrigin: project.imagePosition || 'center',
  ...(project.imageMixBlend ? { mixBlendMode: project.imageMixBlend } : {}),
});

const ProjectCard = ({ project, onLearnMore }) => (
  <div className="eng-card rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-amber-900/20 transition-all duration-300 flex flex-col h-full group"
       style={{ background: '#1c2331', border: '1px solid rgba(45,55,72,0.8)' }}>
    {/* Image */}
    <div className="relative h-60 overflow-hidden" style={{ background: project.imageBg || '#161b22' }}>
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        style={projectImageStyle(project)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1c2331]/70 to-transparent group-hover:from-[#1c2331]/30 transition-all" />
    </div>

    {/* Text content */}
    <div className="p-7 flex flex-col flex-1">
      <h3 className="text-xl font-display font-bold mb-2 tracking-wide" style={{ color: '#e2e8f0' }}>
        {project.title}
      </h3>
      <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: '#8892a4' }}>
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5 pb-5">
        {project.tags.map((tag, i) => (
          <span key={i} className="tag-pill px-2.5 py-1 text-xs font-semibold rounded-md font-mono">
            {tag}
          </span>
        ))}
      </div>
      <button
        onClick={() => onLearnMore(project)}
        className="btn-primary w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm tracking-widest"
      >
        Learn More
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
);
