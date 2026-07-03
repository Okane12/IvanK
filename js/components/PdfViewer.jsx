// ─────────────────────────────────────────────────────────────────────────
// PDF components: renders PDF pages to canvas (PdfPageCanvas), the GD&T
// drawing carousel (GdtCarousel), and the full-screen viewer (PdfModal).
// ─────────────────────────────────────────────────────────────────────────

// Point PDF.js at its CDN worker
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// Renders a single page of a PDF into a canvas, scaled to fit its container.
const PdfPageCanvas = ({ pdfUrl, pageNum }) => {
  const canvasRef = React.useRef(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const renderTaskRef = React.useRef(null);

  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const run = async () => {
      try {
        // Cancel any in-progress render
        if (renderTaskRef.current) {
          try { await renderTaskRef.current.cancel(); } catch (_) {}
          renderTaskRef.current = null;
        }
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        if (cancelled) return;
        const page = await pdf.getPage(pageNum);
        if (cancelled) return;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const container = canvas.parentElement;
        const containerWidth = container ? container.clientWidth || 800 : 800;
        const scale = containerWidth / page.getViewport({ scale: 1 }).width;
        const viewport = page.getViewport({ scale: Math.min(scale, 2) });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const task = page.render({ canvasContext: canvas.getContext('2d'), viewport });
        renderTaskRef.current = task;
        await task.promise;
        if (!cancelled) setLoading(false);
      } catch (err) {
        if (!cancelled && err?.name !== 'RenderingCancelledException') {
          setError('Could not render PDF page.');
          setLoading(false);
        }
      }
    };
    run();
    return () => { cancelled = true; };
  }, [pdfUrl, pageNum]);

  return (
    <div className="relative w-full flex items-center justify-center"
         style={{ minHeight: '300px', background: '#0d1117' }}>
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3"
             style={{ background: '#0d1117' }}>
          <div className="w-8 h-8 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
          <span className="font-mono text-xs" style={{ color: '#8892a4' }}>
            Rendering page {pageNum}…
          </span>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
          <span className="font-mono text-xs" style={{ color: '#fb7185' }}>{error}</span>
          <span className="font-mono text-xs" style={{ color: '#8892a4' }}>
            Make sure the PDF is in <code style={{ color: '#f59e0b' }}>{pdfUrl}</code>
          </span>
        </div>
      )}
      <canvas
        ref={canvasRef}
        style={{
          display: loading || error ? 'none' : 'block',
          width: '100%',
          height: 'auto',
          background: '#fff',
        }}
      />
    </div>
  );
};

// Arrow button shared by the carousel's prev/next controls.
const CarouselArrow = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className={`absolute ${direction === 'prev' ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full transition-all`}
    style={{
      background: 'rgba(13,17,23,0.85)',
      border: '1px solid rgba(245,158,11,0.35)',
      color: '#f59e0b',
    }}
    onMouseOver={e => e.currentTarget.style.background = 'rgba(245,158,11,0.18)'}
    onMouseOut={e => e.currentTarget.style.background = 'rgba(13,17,23,0.85)'}
  >
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
            d={direction === 'prev' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
    </svg>
  </button>
);

// Pages through one or more PDFs (used for GD&T engineering drawings).
// pdfSources = array of { pdfUrl, label, totalPages }
const GdtCarousel = ({ pdfSources }) => {
  const [srcIdx, setSrcIdx] = React.useState(0);
  const [pageNum, setPageNum] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(pdfSources[0]?.totalPages || 1);

  // When the source PDF changes, reset to page 1 and fetch page count
  React.useEffect(() => {
    setPageNum(1);
    const src = pdfSources[srcIdx];
    if (!src) return;
    if (src.totalPages) {
      setTotalPages(src.totalPages);
      return;
    }
    pdfjsLib.getDocument(src.pdfUrl).promise
      .then(pdf => setTotalPages(pdf.numPages))
      .catch(() => setTotalPages(1));
  }, [srcIdx]);

  const prevPage = () => setPageNum(p => Math.max(1, p - 1));
  const nextPage = () => setPageNum(p => Math.min(totalPages, p + 1));

  const current = pdfSources[srcIdx];
  if (!current) return null;

  return (
    <div className="rounded-2xl overflow-hidden mt-8"
         style={{ border: '1px solid rgba(245,158,11,0.25)', background: '#161b22' }}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-3"
           style={{ background: '#1c2331', borderBottom: '1px solid rgba(45,55,72,0.8)' }}>
        <span className="font-display font-bold tracking-widest text-xs uppercase"
              style={{ color: '#f59e0b' }}>
          GD&T Engineering Drawings
        </span>
        <span className="font-mono text-xs" style={{ color: '#8892a4' }}>
          Page {pageNum} / {totalPages}
        </span>
      </div>

      {/* Tabs when there are multiple PDFs */}
      {pdfSources.length > 1 && (
        <div className="flex overflow-x-auto px-4 pt-3 gap-2"
             style={{ borderBottom: '1px solid rgba(45,55,72,0.6)' }}>
          {pdfSources.map((src, i) => (
            <button
              key={i}
              onClick={() => setSrcIdx(i)}
              className="px-3 py-1.5 rounded-t-lg text-xs font-mono font-semibold whitespace-nowrap transition-all"
              style={{
                background: i === srcIdx ? 'rgba(245,158,11,0.15)' : 'transparent',
                color: i === srcIdx ? '#f59e0b' : '#8892a4',
                border: i === srcIdx ? '1px solid rgba(245,158,11,0.3)' : '1px solid transparent',
                borderBottom: 'none',
              }}
            >
              {src.label}
            </button>
          ))}
        </div>
      )}

      {/* Page canvas with prev/next arrows */}
      <div className="relative">
        <PdfPageCanvas pdfUrl={current.pdfUrl} pageNum={pageNum} />
        {pageNum > 1 && <CarouselArrow direction="prev" onClick={prevPage} />}
        {pageNum < totalPages && <CarouselArrow direction="next" onClick={nextPage} />}
      </div>

      {/* Footer: label + page dots */}
      <div className="px-5 py-4 flex flex-col items-center gap-3"
           style={{ borderTop: '1px solid rgba(45,55,72,0.8)' }}>
        <p className="font-mono text-sm text-center" style={{ color: '#a0aec0' }}>
          {current.label}
        </p>
        {totalPages > 1 && (
          <div className="flex gap-1.5 flex-wrap justify-center">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPageNum(i + 1)}
                className="rounded-full transition-all"
                style={{
                  width: i + 1 === pageNum ? '20px' : '8px',
                  height: '8px',
                  background: i + 1 === pageNum ? '#f59e0b' : 'rgba(245,158,11,0.25)',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Full-screen overlay that shows a PDF in an iframe.
const PdfModal = ({ selectedPdf, onClose }) => {
  if (!selectedPdf) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
         role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up"
           style={{ background: '#161b22', border: '1px solid rgba(245,158,11,0.2)' }}>
        <div className="flex justify-between items-center p-4 border-b"
             style={{ borderColor: 'rgba(45,55,72,0.8)', background: '#1c2331' }}>
          <h3 className="font-display font-semibold tracking-wide" style={{ color: '#e2e8f0' }}>
            Project Documentation
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full transition-colors"
            style={{ color: '#8892a4' }}
            onMouseOver={e => e.currentTarget.style.color = '#f59e0b'}
            onMouseOut={e => e.currentTarget.style.color = '#8892a4'}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 relative">
          {selectedPdf === '#' ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
              <p style={{ color: '#8892a4' }}>No PDF linked for this project yet.</p>
            </div>
          ) : (
            <iframe src={selectedPdf} className="w-full h-full" title="PDF" style={{ border: 'none' }} />
          )}
        </div>
      </div>
    </div>
  );
};
