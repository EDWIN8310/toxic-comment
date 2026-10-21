import styles from './Footer.module.css';

export default function Footer() {
  const techBadges = [
    { name: 'DistilBERT', role: 'Transformer Backbone', icon: '🧠' },
    { name: 'PyTorch 2.x', role: 'Model Architecture', icon: '🔥' },
    { name: 'Hugging Face', role: 'Tokenizer & Hub', icon: '🤗' },
    { name: 'Next.js 16', role: 'Modern Web Frontend', icon: '▲' },
    { name: 'Gradio UI', role: 'Interactive App', icon: '⚡' },
    { name: 'FastAPI', role: 'REST Inference API', icon: '🚀' },
  ];

  const quickLinks = [
    { label: 'Live Toxicity Demo', href: '#demo' },
    { label: 'Architecture Overview', href: '#architecture' },
    { label: 'Evaluation Metrics', href: '#metrics' },
    { label: 'Toxicity Taxonomy', href: '#labels' },
  ];

  const resourceLinks = [
    { label: 'GitHub Repository', href: 'https://github.com', external: true },
    { label: 'Google Colab Training Notebook', href: 'https://colab.research.google.com', external: true },
    { label: 'Kaggle Toxic Comment Dataset', href: 'https://www.kaggle.com/c/jigsaw-toxic-comment-classification-challenge', external: true },
    { label: 'Hugging Face Model Card', href: 'https://huggingface.co', external: true },
    { label: 'Gradio Web App Demo', href: '#demo', external: false },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.topGradientBar} />

      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.columnsGrid}>
          {/* Column 1: Project Info */}
          <div className={styles.infoCol}>
            <div className={styles.brand}>
              <span className={styles.brandIcon}>🛡️</span>
              <span className={styles.brandName}>
                Toxi<span className={styles.brandGradient}>Guard</span>
              </span>
              <span className={styles.brandBadge}>AI</span>
            </div>
            <p className={styles.tagline}>
              High-accuracy multi-label toxicity detection engine powered by fine-tuned
              DistilBERT transformers. Empowering safe, constructive, and inclusive online communities.
            </p>
            <div className={styles.datasetInfo}>
              <span className={styles.datasetDot} />
              <span>Trained on 160K+ Jigsaw Wikipedia comments</span>
            </div>
          </div>

          {/* Column 2: Tech Stack */}
          <div className={styles.techCol}>
            <h4 className={styles.colTitle}>Technology Stack</h4>
            <div className={styles.badgesList}>
              {techBadges.map((badge, idx) => (
                <div key={idx} className={styles.techBadge}>
                  <span className={styles.techIcon}>{badge.icon}</span>
                  <div className={styles.techMeta}>
                    <span className={styles.techName}>{badge.name}</span>
                    <span className={styles.techRole}>{badge.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Links */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Resources & Links</h4>
            <ul className={styles.linksList}>
              {resourceLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : '_self'}
                    rel={link.external ? 'noopener noreferrer' : ''}
                    className={styles.footerLink}
                  >
                    <span>{link.label}</span>
                    {link.external && <span className={styles.externalIcon}>↗</span>}
                  </a>
                </li>
              ))}
            </ul>

            <h5 className={styles.quickNavHeading}>Quick Navigation</h5>
            <ul className={styles.quickNavList}>
              {quickLinks.map((item, idx) => (
                <li key={idx}>
                  <a href={item.href} className={styles.quickNavLink}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            © 2026 ToxiGuard AI • DistilBERT Toxic Comment Detection. Open source under MIT License.
          </div>
          <div className={styles.heartText}>
            Built with <span className={styles.heartIcon}>❤️</span> and AI for safer internet discourse
          </div>
        </div>
      </div>
    </footer>
  );
}
