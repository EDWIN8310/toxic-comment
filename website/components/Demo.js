'use client';

import { useState } from 'react';
import styles from './Demo.module.css';

const CATEGORY_META = [
  { key: 'toxic', name: 'Toxic', emoji: '☠️' },
  { key: 'severe_toxic', name: 'Severe Toxic', emoji: '⚠️' },
  { key: 'obscene', name: 'Obscene', emoji: '🤬' },
  { key: 'threat', name: 'Threat', emoji: '🔪' },
  { key: 'insult', name: 'Insult', emoji: '😤' },
  { key: 'identity_hate', name: 'Identity Hate', emoji: '🎯' },
];

export default function Demo() {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState(null);
  const [thresholds, setThresholds] = useState({});
  const [inferenceTime, setInferenceTime] = useState(null);
  const [error, setError] = useState('');

  const analyzeText = async (text) => {
    if (!text.trim()) return;
    setLoading(true);
    setError('');
    const startTime = performance.now();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_MODEL_API_URL || ''}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) throw new Error(`Model API returned ${response.status}`);
      const result = await response.json();
      setPredictions(result.scores);
      setThresholds(result.thresholds || {});
      setInferenceTime(Math.round(performance.now() - startTime));
    } catch (requestError) {
      setError('The model service is unavailable. Please try again in a moment.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = () => analyzeText(inputText);

  const handleKeyDown = (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault();
      handleAnalyze();
    }
  };

  // Check if any category exceeds 0.5
  const isToxicDetected = predictions
    ? Object.entries(predictions).some(([key, val]) => {
        const meta = CATEGORY_META.find((c) => c.key === key);
        return val >= (meta ? thresholds[key] ?? 0.5 : 0.5);
      })
    : false;

  const getScoreColor = (prob) => {
    if (prob < 0.3) return '#10b981'; // green
    if (prob < 0.6) return '#eab308'; // yellow
    return '#ef4444'; // red
  };

  const getScoreStatus = (prob) => {
    if (prob < 0.3) return 'Low Risk';
    if (prob < 0.6) return 'Moderate';
    return 'High Risk';
  };

  return (
    <section id="predict" className={`section ${styles.demoSection}`}>
      <div className="container">
        {/* Header */}
        <div className="sectionHeader">
          <div className="sectionBadge">
            <span className="sectionBadgeDot" />
            <span>Live Model</span>
          </div>
          <h2 className="sectionTitle">
            Analyze a <span className="gradientText">Comment</span>
          </h2>
          <p className="sectionSubtitle">
            Paste a comment below. The result shows the model’s confidence for every category.
          </p>
        </div>

        <div className={styles.demoCard}>
          <div className={styles.consoleGrid}>
            <div className={styles.inputPanel}>
              <div className={styles.panelHeader}>
                <label className={styles.panelTitle} htmlFor="comment-input">Comment to analyze</label>
                <span className={styles.charCount}>
                  {inputText.length} characters
                </span>
              </div>

              <div className={styles.textareaWrapper}>
                <textarea
                  className={styles.textarea}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type or paste any comment here to analyze for toxicity..."
                  rows={6}
                  id="comment-input"
                  maxLength={5000}
                  aria-describedby="input-help"
                />
                {inputText && (
                  <button
                    type="button"
                    className={styles.clearBtn}
                    onClick={() => setInputText('')}
                    title="Clear text"
                    aria-label="Clear comment"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className={styles.inputActions}>
                <button
                  type="button"
                  className={styles.analyzeBtn}
                  onClick={handleAnalyze}
                  disabled={loading || !inputText.trim()}
                >
                  {loading ? (
                    <>
                      <span className={styles.spinner} />
                      <span>Analyzing comment…</span>
                    </>
                  ) : (
                    <>
                      <span>⚡ Analyze Comment</span>
                      <span className={styles.btnShortcut}>Ctrl ↵</span>
                    </>
                  )}
                </button>

                {inferenceTime && (
                  <div className={styles.latencyBadge}>
                    <span className={styles.latencyDot} />
                  <span>Inference: {inferenceTime}ms</span>
                  </div>
                )}
              </div>
              <p id="input-help" className={styles.inputHelp}>Your text is sent to the model API for analysis. Do not enter sensitive personal information.</p>
            </div>

            <div className={styles.resultsPanel}>
              <div className={styles.panelHeader}>
                <div className={styles.resultTitleWrapper}>
                  <span className={styles.panelTitle}>Toxicity Breakdown</span>
                  {predictions && (
                    <span
                      className={`${styles.statusPill} ${
                        isToxicDetected ? styles.statusToxic : styles.statusSafe
                      }`}
                    >
                      {isToxicDetected ? '🚨 Toxicity Flagged' : '✅ Content Clean'}
                    </span>
                  )}
                </div>
              </div>

              {predictions ? <div className={styles.barsContainer} aria-live="polite">
                {CATEGORY_META.map((cat) => {
                  const prob = predictions ? predictions[cat.key] : 0;
                  const percentage = Math.min(100, Math.max(0, Math.round(prob * 100)));
                  const scoreColor = getScoreColor(prob);
                  const statusText = getScoreStatus(prob);

                  return (
                    <div key={cat.key} className={styles.barItem}>
                      <div className={styles.barLabelRow}>
                        <div className={styles.barNameGroup}>
                          <span className={styles.barEmoji}>{cat.emoji}</span>
                          <span className={styles.barName}>{cat.name}</span>
                        </div>
                        <div className={styles.barScoreGroup}>
                          <span
                            className={styles.riskTag}
                            style={{
                              color: scoreColor,
                              backgroundColor: `${scoreColor}15`,
                              borderColor: `${scoreColor}40`,
                            }}
                          >
                            {statusText}
                          </span>
                          <span className={styles.barPercent}>
                            {percentage}%
                          </span>
                        </div>
                      </div>

                      <div className={styles.track}>
                        <div
                          className={styles.fill}
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: scoreColor,
                            boxShadow: `0 0 12px ${scoreColor}80`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div> : (
                <div className={styles.emptyState}>
                  <span className={styles.emptyIcon} aria-hidden="true">⌁</span>
                  <p>Results will appear here after you analyze a comment.</p>
                </div>
              )}
            </div>
          </div>

          {error && <p className={styles.errorMessage} role="alert">{error}</p>}
          <div className={styles.demoFooter}>
            <span className={styles.infoIcon}>ℹ️</span>
            <span>
              Predictions come from the deployed fine-tuned DistilBERT model. The first request may take longer while the service wakes up.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
