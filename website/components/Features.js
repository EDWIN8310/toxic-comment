import styles from './Features.module.css';

export default function Features() {
  const features = [
    {
      icon: '🧠',
      title: 'Transformer-Powered',
      subtitle: 'DistilBERT Architecture',
      description:
        'Leverages a distilled 66-million parameter transformer with bidirectional self-attention, retaining 97% of BERT’s comprehension while running 60% faster.',
      tag: 'NLP Core',
      accentColor: '#ef4444',
    },
    {
      icon: '🏷️',
      title: 'Multi-Label Detection',
      subtitle: 'Simultaneous Categorization',
      description:
        'Comments are rarely toxic in just one way. ToxiGuard independently computes non-mutually exclusive probabilities across 6 distinct toxicity vectors.',
      tag: 'Multi-Task',
      accentColor: '#f97316',
    },
    {
      icon: '🎯',
      title: 'Optimized Thresholds',
      subtitle: 'Per-Category Calibration',
      description:
        'Rather than a blunt 0.5 cutoff, decision thresholds are empirically calibrated per category to maximize F1 score on imbalanced toxic distributions.',
      tag: 'F1 Tuning',
      accentColor: '#ec4899',
    },
    {
      icon: '⚡',
      title: 'Live Inference',
      subtitle: 'Deployed REST API',
      description:
        'Submit a comment directly from this site and receive category-level scores from the deployed model service. The first request can take longer while a free service wakes up.',
      tag: 'Low Latency',
      accentColor: '#eab308',
    },
    {
      icon: '📊',
      title: 'Comprehensive Metrics',
      subtitle: 'Empirical Verification',
      description:
        'Rigorously audited with Precision, Recall, F1-Score, and ROC-AUC curves plotted across individual classes and macro-averaged validation subsets.',
      tag: 'Validated',
      accentColor: '#06b6d4',
    },
    {
      icon: '🌐',
      title: 'Production Ready',
      subtitle: 'Gradio UI & REST API',
      description:
        'Seamless integration via FastAPI / REST endpoints, interactive Gradio app, and Python SDK for instant embedding into chatrooms and platforms.',
      tag: 'Full Stack',
      accentColor: '#10b981',
    },
  ];

  return (
    <section id="features" className={`section ${styles.featuresSection}`}>
      <div className="container">
        {/* Section Header */}
        <div className="sectionHeader">
          <div className="sectionBadge">
            <span className="sectionBadgeDot" />
            <span>Architecture & Capabilities</span>
          </div>
          <h2 className="sectionTitle">
            Why Choose <span className="gradientText">ToxiGuard?</span>
          </h2>
          <p className="sectionSubtitle">
            Engineered from ground up with modern transformer architectures to deliver
            unmatched accuracy, low latency, and granular toxicity classification.
          </p>
        </div>

        {/* Features 3x2 Grid */}
        <div className={styles.grid}>
          {features.map((item, index) => (
            <div
              key={index}
              className={`${styles.card} glassCard`}
              style={{ '--card-accent': item.accentColor }}
            >
              <div className={styles.cardGlow} />
              <div className={styles.cardHeader}>
                <div className={styles.iconBox}>
                  <span className={styles.icon}>{item.icon}</span>
                </div>
                <span className={styles.cardTag}>{item.tag}</span>
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <div className={styles.cardSubtitle}>{item.subtitle}</div>
              <p className={styles.cardDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
