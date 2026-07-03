// ─────────────────────────────────────────────────────────────────────────
// Data tables used on project detail pages: materials & process selection,
// and fits & tolerances (Desk Extender project).
// ─────────────────────────────────────────────────────────────────────────

const tableHeaderCell = h => (
  <th key={h}
      className="px-4 py-3 text-left font-mono font-semibold tracking-wider"
      style={{ color: '#f59e0b', fontSize: '0.7rem', textTransform: 'uppercase' }}>
    {h}
  </th>
);

const MaterialsTable = ({ data }) => {
  if (!data || data.length === 0) return null;
  return (
    <div className="mt-6 rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(245,158,11,0.2)' }}>
      <div className="px-5 py-3" style={{ background: '#1c2331', borderBottom: '1px solid rgba(45,55,72,0.8)' }}>
        <span className="font-display font-bold tracking-widest text-xs uppercase" style={{ color: '#f59e0b' }}>
          Materials &amp; Process Selection
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(245,158,11,0.05)', borderBottom: '1px solid rgba(45,55,72,0.8)' }}>
              {['#', 'Component', 'Material', 'Process', 'Justification'].map(tableHeaderCell)}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={row.id}
                  style={{
                    borderBottom: '1px solid rgba(45,55,72,0.5)',
                    background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                  }}>
                <td className="px-4 py-3 font-mono" style={{ color: '#f59e0b', minWidth: '32px' }}>{row.id}</td>
                <td className="px-4 py-3 font-semibold" style={{ color: '#e2e8f0', minWidth: '140px' }}>{row.name}</td>
                <td className="px-4 py-3 font-mono text-xs" style={{ color: '#a0aec0', minWidth: '120px' }}>{row.material}</td>
                <td className="px-4 py-3 font-mono text-xs" style={{ color: '#a0aec0', minWidth: '100px' }}>{row.process}</td>
                <td className="px-4 py-3 text-xs leading-relaxed" style={{ color: '#8892a4', minWidth: '220px' }}>{row.justification}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const FitsTable = ({ data }) => {
  if (!data || data.length === 0) return null;
  return (
    <div className="mt-6 rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(245,158,11,0.2)' }}>
      <div className="px-5 py-3" style={{ background: '#1c2331', borderBottom: '1px solid rgba(45,55,72,0.8)' }}>
        <span className="font-display font-bold tracking-widest text-xs uppercase" style={{ color: '#f59e0b' }}>
          Fits &amp; Tolerances
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(245,158,11,0.05)', borderBottom: '1px solid rgba(45,55,72,0.8)' }}>
              {['Fit', 'Component A', 'Component B', 'Function', 'ANSI Grade', 'Tol. A', 'Tol. B', 'Process Delivers?'].map(tableHeaderCell)}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={row.fit}
                  style={{
                    borderBottom: '1px solid rgba(45,55,72,0.5)',
                    background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                  }}>
                <td className="px-4 py-3 font-mono font-bold" style={{ color: '#f59e0b' }}>{row.fit}</td>
                <td className="px-4 py-3 font-mono text-xs" style={{ color: '#e2e8f0', minWidth: '140px' }}>{row.compA}</td>
                <td className="px-4 py-3 font-mono text-xs" style={{ color: '#e2e8f0', minWidth: '140px' }}>{row.compB}</td>
                <td className="px-4 py-3 text-xs" style={{ color: '#a0aec0', minWidth: '120px' }}>{row.function}</td>
                <td className="px-4 py-3 font-mono text-xs font-bold" style={{ color: '#fb923c' }}>{row.ansi}</td>
                <td className="px-4 py-3 font-mono text-xs" style={{ color: '#8892a4', minWidth: '160px' }}>{row.tolA}</td>
                <td className="px-4 py-3 font-mono text-xs" style={{ color: '#8892a4', minWidth: '160px' }}>{row.tolB}</td>
                <td className="px-4 py-3 text-xs leading-relaxed"
                    style={{
                      color: row.deliverable.startsWith('No') ? '#fb7185' : '#34d399',
                      minWidth: '160px',
                    }}>
                  {row.deliverable}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
