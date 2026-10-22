import styles from './Hero.module.css';

export default function Hero() {
  const highlights = [
    {
      label: 'Six signals',
      sublabel: 'Toxicity, threats, insults, obscenity, and more',
    },
    {
      label: 'Independent scores',
      sublabel: 'Each category is evaluated separately',
    },
    {
      label: 'Tuned thresholds',
      sublabel: 'Flags use the model’s calibrated thresholds',
    },
  ];

  return (
    <section className={styles.heroSection}>
      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.badgeWrapper}>
          <div className={styles.badge}>
            <span className={styles.statusDot} aria-hidden="true" />
            <span>Live model · DistilBERT classifier</span>
          </div>
        </div>

        <h1 className={styles.title}>
          Understand a comment’s <span className="gradientText">risk signals.</span>
        </h1>

        <p className={styles.subtitle}>
          Paste text and get a clear, multi-label toxicity assessment from your deployed model.
          Use it to support safer conversations—not as the only moderation decision.
        </p>

        <div className={styles.ctaGroup}>
          <a href="#predict" className="btnPrimary">
            <span>Start analyzing</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
          <a
            href="https://github.com/EDWIN8310/toxic-comment"
            target="_blank"
            rel="noopener noreferrer"
            className="btnSecondary"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            <span>View source</span>
          </a>
        </div>

        <div className={styles.highlights} aria-label="Model capabilities">
          {highlights.map((highlight) => (
            <div key={highlight.label} className={styles.highlight}>
              <div className={styles.highlightLabel}>{highlight.label}</div>
              <div className={styles.highlightText}>{highlight.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
