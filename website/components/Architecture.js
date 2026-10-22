import styles from './Architecture.module.css';

export default function Architecture() {
  const pipelineSteps = [
    {
      step: '01',
      icon: '📝',
      title: 'Input Text',
      subtitle: 'Raw Comment String',
      detail: 'UTF-8 normalized string input with automated whitespace handling and regex cleaning.',
    },
    {
      step: '02',
      icon: '🔤',
      title: 'Tokenizer',
      subtitle: 'DistilBERT WordPiece',
      detail: 'Vocab size 30,522, token length capped at 128 tokens with [CLS] and [SEP] positional delimiters.',
    },
    {
      step: '03',
      icon: '🧠',
      title: 'Transformer Core',
      subtitle: '6-Layer DistilBERT',
      detail: '768 hidden dimension, 12 attention heads, 66M parameters with bidirectional contextualization.',
    },
    {
      step: '04',
      icon: '🎯',
      title: 'Dense Head',
      subtitle: 'Dropout + Linear (768 → 6)',
      detail: 'Extracts pooled [CLS] embedding, applies 0.2 dropout regularization, maps directly to 6 logits.',
    },
    {
      step: '05',
      icon: '📈',
      title: 'Sigmoid Layer',
      subtitle: 'Independent Activations',
      detail: 'Computes continuous probability distribution [0, 1] per category rather than Softmax.',
    },
    {
      step: '06',
      icon: '⚡',
      title: '6 Predictions',
      subtitle: 'Calibrated Decision',
      detail: 'Per-label threshold calibration flags binary toxic alerts alongside continuous confidence.',
    },
  ];

  const trainingDetails = [
    {
      icon: '📉',
      label: 'Loss Function',
      value: 'BCEWithLogitsLoss',
      desc: 'Numerically stable binary cross-entropy combining sigmoid activation with logits for multi-label loss calculation.',
      badge: 'Multi-Label',
    },
    {
      icon: '⚙️',
      label: 'Optimizer',
      value: 'AdamW (lr=2e-5)',
      desc: 'Decoupled weight decay regularization (0.01) with linear warmup schedule over first 10% of training steps.',
      badge: 'Adaptive',
    },
    {
      icon: '🔄',
      label: 'Training Epochs',
      value: '3 Epochs + Warmup',
      desc: 'Early stopping triggered based on validation ROC-AUC to prevent overfitting on minority label sets.',
      badge: 'Regularized',
    },
    {
      icon: '🚀',
      label: 'Precision & Hardware',
      value: 'Hosted model service',
      desc: 'The fine-tuned model is served through a FastAPI endpoint that returns a score and calibrated flag for each category.',
      badge: 'Deployed',
    },
  ];

  return (
    <section id="architecture" className={`section ${styles.archSection}`}>
      <div className="container">
        {/* Header */}
        <div className="sectionHeader">
          <div className="sectionBadge">
            <span className="sectionBadgeDot" />
            <span>Deep Learning Pipeline</span>
          </div>
          <h2 className="sectionTitle">
            Under the <span className="gradientText">Hood</span>
          </h2>
          <p className="sectionSubtitle">
            A look into the neural pipeline from raw textual input to multi-dimensional
            classification tensors, optimized for high throughput and precision.
          </p>
        </div>

        {/* Pipeline Horizontal Diagram */}
        <div className={styles.diagramWrapper}>
          <div className={styles.diagramTitleRow}>
            <span className={styles.diagramBadge}>End-to-End Inference Flow</span>
            <span className={styles.diagramSubtext}>From text input to category-level scores</span>
          </div>

          <div className={styles.pipelineFlow}>
            {pipelineSteps.map((step, index) => (
              <div key={index} className={styles.stepBlock}>
                <div className={`${styles.stepCard} glassCard`}>
                  <div className={styles.stepTop}>
                    <span className={styles.stepNumber}>{step.step}</span>
                    <span className={styles.stepIcon}>{step.icon}</span>
                  </div>
                  <h4 className={styles.stepTitle}>{step.title}</h4>
                  <div className={styles.stepSubtitle}>{step.subtitle}</div>
                  <p className={styles.stepDetail}>{step.detail}</p>
                </div>

                {index < pipelineSteps.length - 1 && (
                  <div className={styles.arrowConnector} aria-hidden="true">
                    <span className={styles.arrowLine}></span>
                    <span className={styles.arrowHead}>→</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Training Details 2x2 Grid */}
        <div className={styles.trainingSection}>
          <div className={styles.trainingHeader}>
            <h3 className={styles.trainingTitle}>Training & Hyperparameter Configuration</h3>
            <span className={styles.trainingSubtitle}>Trained on PyTorch 2.x & Hugging Face Transformers</span>
          </div>

          <div className={styles.trainingGrid}>
            {trainingDetails.map((item, idx) => (
              <div key={idx} className={`${styles.trainCard} glassCard`}>
                <div className={styles.trainCardTop}>
                  <div className={styles.trainIconBox}>
                    <span>{item.icon}</span>
                  </div>
                  <span className={styles.trainBadge}>{item.badge}</span>
                </div>
                <div className={styles.trainLabel}>{item.label}</div>
                <div className={styles.trainValue}>{item.value}</div>
                <p className={styles.trainDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
