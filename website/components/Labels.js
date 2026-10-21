import styles from './Labels.module.css';

export default function Labels() {
  const categories = [
    {
      emoji: '☠️',
      name: 'Toxic',
      severity: 'High Severity',
      color: '#ef4444',
      description:
        'General rude, disrespectful, or unreasonable language likely to make users leave a conversation or community discussion.',
      example: 'Hostile remarks, belligerent mockery, toxic dismissiveness',
      threshold: 'Threshold: 0.50',
    },
    {
      emoji: '⚠️',
      name: 'Severe Toxic',
      severity: 'Critical Severity',
      color: '#dc2626',
      description:
        'Extremely aggressive, malicious, or dehumanizing statements representing the most virulent forms of verbal toxicity.',
      example: 'Extreme hostility, relentless cyberharassment, deep cruelty',
      threshold: 'Threshold: 0.35',
    },
    {
      emoji: '🤬',
      name: 'Obscene',
      severity: 'Moderate Severity',
      color: '#f97316',
      description:
        'Vulgar, profane, or sexually explicit language used in offensive contexts, vulgar expletives, and inappropriate cursing.',
      example: 'Explicit profanity, sexually abrasive slurs, vulgar insults',
      threshold: 'Threshold: 0.50',
    },
    {
      emoji: '🔪',
      name: 'Threat',
      severity: 'Critical Emergency',
      color: '#e11d48',
      description:
        'Statements expressing direct or indirect intent to inflict physical harm, death, property damage, or violence against individuals.',
      example: 'Physical violence threats, stalking indicators, weapon alerts',
      threshold: 'Threshold: 0.40',
    },
    {
      emoji: '😤',
      name: 'Insult',
      severity: 'High Severity',
      color: '#ec4899',
      description:
        'Disparaging, demeaning, or degrading language targeted at a person’s intelligence, appearance, character, or integrity.',
      example: 'Personal disparagement, derogatory epithets, name-calling',
      threshold: 'Threshold: 0.50',
    },
    {
      emoji: '🎯',
      name: 'Identity Hate',
      severity: 'Critical Policy Violation',
      color: '#a855f7',
      description:
        'Prejudiced statements, dehumanizing slurs, or incitement directed against groups based on race, religion, sexual orientation, or gender.',
      example: 'Discriminatory slurs, bigoted stereotyping, hate speech tropes',
      threshold: 'Threshold: 0.40',
    },
  ];

  return (
    <section id="labels" className={`section ${styles.labelsSection}`}>
      <div className="container">
        {/* Section Header */}
        <div className="sectionHeader">
          <div className="sectionBadge">
            <span className="sectionBadgeDot" />
            <span>Multi-Label Taxonomy</span>
          </div>
          <h2 className="sectionTitle">
            6 Toxicity <span className="gradientText">Categories</span>
          </h2>
          <p className="sectionSubtitle">
            ToxiGuard’s classification head maps high-dimensional semantic representations
            into six orthogonal labels, calibrated to address nuance and severity.
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className={styles.grid}>
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className={`${styles.card} glassCard`}
              style={{
                '--cat-color': cat.color,
                borderLeftColor: cat.color,
              }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.emojiWrapper}>
                  <span className={styles.emoji}>{cat.emoji}</span>
                </div>
                <div className={styles.metaBadge} style={{ color: cat.color }}>
                  {cat.severity}
                </div>
              </div>

              <h3 className={styles.categoryName}>{cat.name}</h3>
              <p className={styles.categoryDescription}>{cat.description}</p>

              <div className={styles.patternBox}>
                <div className={styles.patternLabel}>Pattern Signature:</div>
                <div className={styles.patternText}>{cat.example}</div>
              </div>

              <div className={styles.cardFooter}>
                <span className={styles.thresholdBadge}>{cat.threshold}</span>
                <span className={styles.statusIndicator} style={{ background: cat.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
