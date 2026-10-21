import styles from './Metrics.module.css';

export default function Metrics() {
  const metricsData = [
    { category: '☠️ Toxic', precision: 0.88, recall: 0.84, f1: 0.86, auc: 0.985 },
    { category: '⚠️ Severe Toxic', precision: 0.58, recall: 0.62, f1: 0.60, auc: 0.988 },
    { category: '🤬 Obscene', precision: 0.89, recall: 0.86, f1: 0.87, auc: 0.991 },
    { category: '🔪 Threat', precision: 0.63, recall: 0.68, f1: 0.65, auc: 0.989 },
    { category: '😤 Insult', precision: 0.83, recall: 0.81, f1: 0.82, auc: 0.982 },
    { category: '🎯 Identity Hate', precision: 0.67, recall: 0.71, f1: 0.69, auc: 0.984 },
  ];

  const summaryCards = [
    {
      metric: '98.7%',
      label: 'Macro ROC-AUC',
      desc: 'Area under Receiver Operating Characteristic across all six classes',
      icon: '📈',
      color: '#10b981',
    },
    {
      metric: '0.84',
      label: 'Micro F1 Score',
      desc: 'Overall harmonic mean of global true positives against false predictions',
      icon: '🎯',
      color: '#f97316',
    },
    {
      metric: '0.75',
      label: 'Macro F1 Score',
      desc: 'Unweighted mean F1 accounting equally for severe and rare threat labels',
      icon: '⚖️',
      color: '#ec4899',
    },
  ];

  // Helper for color badge
  const getBadgeClass = (score) => {
    if (score >= 0.85) return styles.scoreHigh;
    if (score >= 0.65) return styles.scoreMed;
    return styles.scoreLow;
  };

  return (
    <section id="metrics" className={`section ${styles.metricsSection}`}>
      <div className="container">
        {/* Section Header */}
        <div className="sectionHeader">
          <div className="sectionBadge">
            <span className="sectionBadgeDot" />
            <span>Benchmark Evaluation</span>
          </div>
          <h2 className="sectionTitle">
            Model <span className="gradientText">Performance</span>
          </h2>
          <p className="sectionSubtitle">
            Evaluated on held-out test splits with rigorous multi-label evaluation metrics.
            Optimized thresholds overcome significant class imbalance across rare classes.
          </p>
        </div>

        {/* Table Container */}
        <div className={`${styles.tableWrapper} glassCard`}>
          <div className={styles.tableTopBar}>
            <div className={styles.tableTitleGroup}>
              <span className={styles.tableTitle}>Validation Set Classification Report</span>
              <span className={styles.tableLegend}>
                <span className={styles.legendDotHigh} /> &gt;0.85 High
                <span className={styles.legendDotMed} /> 0.65-0.85 Medium
                <span className={styles.legendDotLow} /> &lt;0.65 Low
              </span>
            </div>
            <span className={styles.testSplitBadge}>Test Set: 31,915 comments</span>
          </div>

          <div className={styles.responsiveTable}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Precision</th>
                  <th>Recall</th>
                  <th>F1-Score</th>
                  <th>ROC-AUC</th>
                </tr>
              </thead>
              <tbody>
                {metricsData.map((row, idx) => (
                  <tr key={idx} className={styles.tableRow}>
                    <td className={styles.categoryCell}>
                      <span className={styles.categoryName}>{row.category}</span>
                    </td>
                    <td>
                      <span className={`${styles.scoreTag} ${getBadgeClass(row.precision)}`}>
                        {row.precision.toFixed(2)}
                      </span>
                    </td>
                    <td>
                      <span className={`${styles.scoreTag} ${getBadgeClass(row.recall)}`}>
                        {row.recall.toFixed(2)}
                      </span>
                    </td>
                    <td>
                      <span className={`${styles.scoreTag} ${getBadgeClass(row.f1)}`}>
                        {row.f1.toFixed(2)}
                      </span>
                    </td>
                    <td>
                      <span className={`${styles.scoreTag} ${getBadgeClass(row.auc)}`}>
                        {row.auc.toFixed(3)}
                      </span>
                    </td>
                  </tr>
                ))}
                {/* Macro Average Row */}
                <tr className={styles.macroRow}>
                  <td className={styles.categoryCell}>
                    <strong>🌐 Macro Average</strong>
                  </td>
                  <td>
                    <span className={`${styles.scoreTag} ${styles.scoreMed}`}>0.75</span>
                  </td>
                  <td>
                    <span className={`${styles.scoreTag} ${styles.scoreMed}`}>0.75</span>
                  </td>
                  <td>
                    <span className={`${styles.scoreTag} ${styles.scoreMed}`}>0.75</span>
                  </td>
                  <td>
                    <span className={`${styles.scoreTag} ${styles.scoreHigh}`}>0.987</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3 Metric Cards Below */}
        <div className={styles.cardsGrid}>
          {summaryCards.map((card, idx) => (
            <div
              key={idx}
              className={`${styles.summaryCard} glassCard`}
              style={{ '--card-highlight': card.color }}
            >
              <div className={styles.summaryTop}>
                <span className={styles.summaryIcon}>{card.icon}</span>
                <span className={styles.summaryValue}>{card.metric}</span>
              </div>
              <h4 className={styles.summaryLabel}>{card.label}</h4>
              <p className={styles.summaryDesc}>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
