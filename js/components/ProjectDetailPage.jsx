// ─────────────────────────────────────────────────────────────────────────
// Full-page view for a single project: hero image, tags, overview,
// detail sections (with optional tables and images), and GD&T drawings.
// ─────────────────────────────────────────────────────────────────────────

const DocumentIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const BackArrowIcon = ({ strokeWidth = 2 }) => (
  <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
       fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M15 19l-7-7 7-7" />
  </svg>
);

const ProjectDetailPage = ({ project, onBack, onOpenPdf }) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { details } = project;

  return (
    <div className="min-h-screen animate-fade-in" style={{ background: '#0d1117' }}>
      {/* Sticky top bar */}
      <nav className="sticky top-0 z-40 backdrop-blur-md border-b"
           style={{ background: 'rgba(13,17,23,0.95)', borderColor: 'rgba(245,158,11,0.1)' }}>
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-4 flex items-center gap-4">
          <button onClick={onBack}
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-colors group nav-link">
            <BackArrowIcon />
            Back to Portfolio
          </button>
          <span style={{ color: 'rgba(245,158,11,0.3)' }}>|</span>
          <span className="text-sm truncate font-display" style={{ color: '#8892a4' }}>
            {project.title}
          </span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        {/* Hero image + title + tags + PDF buttons */}
        <div className="mb-10">
          <div className="rounded-2xl overflow-hidden shadow-xl mb-8 max-h-[480px]"
               style={{ background: project.imageBg || '#161b22' }}>
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
              style={{ ...projectImageStyle(project), maxHeight: '480px' }}
            />
          </div>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-3 leading-tight"
                  style={{ color: '#e2e8f0' }}>
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span key={i} className="tag-pill px-3 py-1 text-xs font-semibold rounded-full font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {project.link && project.link !== '#' && (
              <button onClick={() => onOpenPdf(project.link)}
                      className="btn-secondary inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl whitespace-nowrap">
                <DocumentIcon />
                View Report / PDF
              </button>
            )}
            {details.extraLinks && details.extraLinks.map((el, i) => (
              <button key={i} onClick={() => onOpenPdf(el.url)}
                      className="btn-secondary inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl whitespace-nowrap">
                <DocumentIcon />
                {el.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview callout */}
        <div className="rounded-2xl p-8 mb-10"
             style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)' }}>
          <p className="text-lg leading-relaxed" style={{ color: '#a0aec0' }}>
            {details.overview}
          </p>
        </div>

        {/* Optional video / CAD links */}
        {(details.videoLink || details.cadLink) && (
          <div className="flex flex-wrap gap-3 mb-8">
            {details.videoLink && (
              <a href={details.videoLink} target="_blank" rel="noopener noreferrer"
                 className="btn-secondary inline-flex items-center gap-2 px-5 py-2.5 text-sm rounded-xl">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M14.752 11.168l-5.197-3.03A1 1 0 008 9.031v5.938a1 1 0 001.555.832l5.197-3.03a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Demo Video
              </a>
            )}
            {details.cadLink && (
              <a href={details.cadLink} target="_blank" rel="noopener noreferrer"
                 className="btn-secondary inline-flex items-center gap-2 px-5 py-2.5 text-sm rounded-xl">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View CAD (Onshape)
              </a>
            )}
          </div>
        )}

        {/* Detail sections */}
        <div className="prose-detail space-y-10">
          {details.sections.map((section, i) => (
            <div key={i} className="border-l-4 pl-6" style={{ borderColor: '#f59e0b' }}>
              <h3>{section.heading}</h3>
              <p>{section.body}</p>
              {section.specialComponent === 'materialsTable' && details.materialsData && (
                <MaterialsTable data={details.materialsData} />
              )}
              {section.specialComponent === 'fitsTable' && details.fitsData && (
                <FitsTable data={details.fitsData} />
              )}
              {section.images && section.images.length > 0 && (
                <div className={`mt-5 grid gap-4 ${
                  section.images.length === 1 ? 'grid-cols-1'
                    : section.images.length === 2 ? 'grid-cols-1 sm:grid-cols-2'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                }`}>
                  {section.images.map((img, j) => (
                    <figure key={j} className="rounded-xl overflow-hidden shadow-sm"
                            style={{ border: '1px solid rgba(45,55,72,0.8)' }}>
                      <img
                        src={typeof img === 'string' ? img : img.src}
                        alt={typeof img === 'string' ? section.heading : img.caption || section.heading}
                        className="w-full object-cover max-h-72"
                      />
                      {typeof img !== 'string' && img.caption && (
                        <figcaption className="px-3 py-2 text-xs font-mono"
                                    style={{
                                      color: '#8892a4',
                                      background: '#161b22',
                                      borderTop: '1px solid rgba(45,55,72,0.8)',
                                    }}>
                          {img.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* GD&T drawings carousel */}
        {details.gdtPdfs && details.gdtPdfs.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-display font-bold mb-1 section-heading left"
                style={{ color: '#e2e8f0', letterSpacing: '0.05em' }}>
              GD&T DRAWINGS
            </h2>
            <p className="text-sm mt-3 mb-1" style={{ color: '#8892a4' }}>
              Browse the engineering drawings directly below. Use the arrows to page through,
              or the dots to jump to a specific page.
            </p>
            <GdtCarousel pdfSources={details.gdtPdfs} />
          </div>
        )}

        {/* Bottom back button */}
        <div className="mt-16 pt-8" style={{ borderTop: '1px solid rgba(45,55,72,0.8)' }}>
          <button onClick={onBack}
                  className="btn-secondary inline-flex items-center gap-2 px-6 py-3 rounded-xl group">
            <BackArrowIcon />
            Back to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};
