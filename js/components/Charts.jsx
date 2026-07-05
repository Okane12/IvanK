// ─────────────────────────────────────────────────────────────────────────
// Interactive charts, rendered with Chart.js from the precomputed data in
// js/chart-data.js. A project section opts in with `charts: ['id', ...]`.
// ─────────────────────────────────────────────────────────────────────────

const CHART_COLORS = {
  amber: '#f59e0b',
  orange: '#fb923c',
  steel: '#94a3b8',
  text: '#8892a4',
  grid: 'rgba(255,255,255,0.06)',
};

// Shared dark-theme options
const baseChartOptions = (xTitle, yTitle) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: CHART_COLORS.text, boxWidth: 12, font: { size: 11 } } },
  },
  scales: {
    x: {
      title: { display: !!xTitle, text: xTitle, color: CHART_COLORS.text, font: { size: 11 } },
      ticks: { color: CHART_COLORS.text, font: { size: 10 } },
      grid: { color: CHART_COLORS.grid },
    },
    y: {
      title: { display: !!yTitle, text: yTitle, color: CHART_COLORS.text, font: { size: 11 } },
      ticks: { color: CHART_COLORS.text, font: { size: 10 } },
      grid: { color: CHART_COLORS.grid },
    },
  },
});

const lineSweep = (points, label, color, xTitle, logX) => {
  const options = baseChartOptions(xTitle, 'Validation R²');
  // Point data needs a numeric axis; without it Chart.js stacks
  // every point on one category and draws a vertical line.
  options.scales.x.type = logX ? 'logarithmic' : 'linear';
  options.plugins.legend.display = false;
  return {
    type: 'line',
    data: {
      datasets: [{
        label,
        data: points,
        borderColor: color,
        backgroundColor: color,
        pointRadius: points.length > 30 ? 0 : 3,
        borderWidth: 2,
        tension: 0.2,
      }],
    },
    options,
  };
};

// Chart definitions, keyed by the ids used in js/data.js
const WINE_CHART_DEFS = {
  qualityDist: {
    title: 'Quality scores in the dataset (1599 wines)',
    config: () => {
      const d = WINE_CHARTS.qualityDist;
      const options = baseChartOptions('Quality score', 'Number of wines');
      options.plugins.legend.display = false;
      return {
        type: 'bar',
        data: {
          labels: d.labels,
          datasets: [{
            data: d.counts,
            backgroundColor: 'rgba(245,158,11,0.55)',
            borderColor: CHART_COLORS.amber,
            borderWidth: 1,
          }],
        },
        options,
      };
    },
  },
  ridge: {
    title: 'Ridge: validation R² vs alpha',
    config: () => lineSweep(
      WINE_CHARTS.ridge.alpha.map((a, i) => ({ x: a, y: WINE_CHARTS.ridge.valR2[i] })),
      'Ridge', CHART_COLORS.amber, 'alpha (log scale)', true
    ),
  },
  lasso: {
    title: 'Lasso: validation R² vs alpha',
    config: () => lineSweep(
      WINE_CHARTS.lasso.alpha.map((a, i) => ({ x: a, y: WINE_CHARTS.lasso.valR2[i] })),
      'Lasso', CHART_COLORS.orange, 'alpha (log scale)', true
    ),
  },
  rfDepth: {
    title: 'Random forest: validation R² vs max depth',
    config: () => lineSweep(
      WINE_CHARTS.rfDepth.depth.map((x, i) => ({ x, y: WINE_CHARTS.rfDepth.valR2[i] })),
      'Random Forest', CHART_COLORS.amber, 'max_depth', false
    ),
  },
  gbtEstimators: {
    title: 'Gradient boosting: validation R² vs number of trees',
    config: () => lineSweep(
      WINE_CHARTS.gbtEstimators.n.map((x, i) => ({ x, y: WINE_CHARTS.gbtEstimators.valR2[i] })),
      'GBT', CHART_COLORS.orange, 'n_estimators', false
    ),
  },
  summary: {
    title: 'Best model per family: training vs validation R²',
    config: () => {
      const d = WINE_CHARTS.summary;
      const options = baseChartOptions('R²', '');
      options.indexAxis = 'y';
      return {
        type: 'bar',
        data: {
          labels: d.models,
          datasets: [
            { label: 'Training R²', data: d.trainR2, backgroundColor: 'rgba(148,163,184,0.45)', borderColor: CHART_COLORS.steel, borderWidth: 1 },
            { label: 'Validation R²', data: d.valR2, backgroundColor: 'rgba(245,158,11,0.55)', borderColor: CHART_COLORS.amber, borderWidth: 1 },
          ],
        },
        options,
      };
    },
  },
};

const ChartGrid = ({ ids }) => {
  const refs = React.useRef({});

  React.useEffect(() => {
    const charts = ids.map(id => {
      const def = WINE_CHART_DEFS[id];
      const canvas = refs.current[id];
      return def && canvas ? new Chart(canvas.getContext('2d'), def.config()) : null;
    });
    return () => charts.forEach(c => c && c.destroy());
  }, [ids]);

  return (
    <div className={`mt-6 grid gap-4 ${ids.length > 1 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
      {ids.map(id => (
        <div key={id} className="rounded-2xl p-4"
             style={{ background: '#161b22', border: '1px solid rgba(245,158,11,0.2)' }}>
          <p className="font-mono text-xs uppercase tracking-wider mb-3" style={{ color: '#f59e0b' }}>
            {WINE_CHART_DEFS[id].title}
          </p>
          <div style={{ height: '260px', position: 'relative' }}>
            <canvas ref={el => { refs.current[id] = el; }} />
          </div>
        </div>
      ))}
    </div>
  );
};
