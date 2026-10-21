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
            Enter a comment to run it through the deployed fine-tuned DistilBERT model.
          </p>
        </div>

        <div className={styles.demoCard}>
          <div className={styles.consoleGrid}>
            {/* Input Panel */}
            <div className={styles.inputPanel}>
              <div className={styles.panelHeader}>
                <span className={styles.panelTitle}>Input Text</span>
                <span className={styles.charCount}>
                  {inputText.length} characters
                </span>
              </div>

              <div className={styles.textareaWrapper}>
                <textarea
                  className={styles.textarea}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type or paste any comment here to analyze for toxicity..."
                  rows={6}
                />
                {inputText && (
                  <button
                    type="button"
                    className={styles.clearBtn}
                    onClick={() => setInputText('')}
                    title="Clear text"
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
                      <span>Classifying tokens...</span>
                    </>
                  ) : (
                    <>
                      <span>⚡ Analyze Comment</span>
                      <span className={styles.btnShortcut}>Return ↵</span>
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
            </div>

            {/* Results Panel */}
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

              {/* Progress Bars */}
              <div className={styles.barsContainer}>
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
              </div>
            </div>
          </div>

          {/* Footer note */}
          {error && <p role="alert">{error}</p>}
          <div className={styles.demoFooter}>
            <span className={styles.infoIcon}>ℹ️</span>
            <span>
              ⚡ Predictions come from the fine-tuned DistilBERT model. First request may take longer while the free service wakes up.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
