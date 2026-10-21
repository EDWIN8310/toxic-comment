import styles from './Hero.module.css';

export default function Hero() {
  const stats = [
    {
      icon: '📚',
      value: '160,000+',
      label: 'Comments Trained',
      sublabel: 'Wikipedia toxic comments corpus',
    },
    {
      icon: '🏷️',
      value: '6',
      label: 'Toxicity Categories',
      sublabel: 'Multi-label classification',
    },
    {
      icon: '🎯',
      value: '98.7%',
      label: 'ROC-AUC Score',
      sublabel: 'Macro average performance',
    },
    {
      icon: '⚡',
      value: '< 15ms',
      label: 'Real-time Analysis',
      sublabel: 'Optimized FP16 inference',
    },
  ];

  return (
    <section className={styles.heroSection}>
      {/* Background Animated Orbs */}
      <div className={styles.ambientGlowPrimary} aria-hidden="true" />
      <div className={styles.ambientGlowSecondary} aria-hidden="true" />
      <div className={styles.gridOverlay} aria-hidden="true" />

      <div className={`container ${styles.heroContainer}`}>
        {/* Top Badge */}
        <div className={styles.badgeWrapper}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>🔬</span>
            <span className={styles.badgeText}>
              Powered by DistilBERT • Fine-tuned on 160K comments
            </span>
            <span className={styles.badgePulse} />
          </div>
        </div>

        {/* Hero Title */}
        <h1 className={styles.title}>
          Detect Toxic Comments <br />
          <span className="gradientText">with State-of-the-Art AI</span>
        </h1>

        {/* Subtitle */}
        <p className={styles.subtitle}>
          Harness the power of fine-tuned DistilBERT transformer models to protect
          online communities. Instant multi-label detection across 6 critical toxicity
          dimensions with sub-second latency.
        </p>

        {/* CTA Buttons */}
        <div className={styles.ctaGroup}>
          <a href="#demo" className="btnPrimary">
            <span>Try Interactive Demo</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btnSecondary"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            <span>View on GitHub</span>
          </a>
        </div>

        {/* Stats Row */}
        <div className={styles.statsGrid}>
          {stats.map((stat, idx) => (
            <div key={idx} className={`${styles.statCard} glassCard`}>
              <div className={styles.statHeader}>
                <span className={styles.statIcon}>{stat.icon}</span>
                <span className={styles.statValue}>{stat.value}</span>
              </div>
              <div className={styles.statLabel}>{stat.label}</div>
              <div className={styles.statSublabel}>{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
