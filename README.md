# 🛡️ Toxic Comment Detection with DistilBERT

[![Python 3.10+](https://img.shields.io/badge/Python-3.10%2B-blue.svg?logo=python&logoColor=white)](https://www.python.org/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.0%2B-EE4C2C.svg?logo=pytorch&logoColor=white)](https://pytorch.org/)
[![HuggingFace](https://img.shields.io/badge/HuggingFace-Transformers-FFD21E.svg?logo=huggingface&logoColor=black)](https://huggingface.co/)
[![Gradio](https://img.shields.io/badge/Gradio-Web%20UI-FF7C00.svg?logo=gradio&logoColor=white)](https://gradio.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An end-to-end multi-label deep learning system designed to detect and classify toxic language in online discussions across six distinct categories. Built using a fine-tuned **DistilBERT** transformer architecture and trained on the Kaggle Jigsaw Toxic Comment Classification Challenge dataset. Includes a Google Colab training workflow with automated threshold optimization and an interactive **Gradio** web application for real-time inference.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Dataset Information](#-dataset-information)
- [Toxicity Label Categories](#-toxicity-label-categories)
- [Model Architecture & Training](#-model-architecture--training)
- [Project Directory Structure](#-project-directory-structure)
- [Setup & Installation](#-setup--installation)
- [Training on Google Colab](#-training-on-google-colab)
- [Running the Gradio Web App](#-running-the-gradio-web-app)
- [Expected Performance Metrics](#-expected-performance-metrics)
- [License](#-license)

---

## 📖 Overview

Online platforms often struggle with toxic behaviors, harassment, and hate speech that suppress constructive discussion. This project provides a robust, multi-label NLP pipeline capable of evaluating text comments simultaneously across multiple facets of toxicity (e.g., severe insults, direct threats, and identity-directed attacks).

Rather than relying on generic single-label classification or arbitrary 0.5 decision boundaries, this system optimizes per-category decision thresholds against the validation set to maximize F1 scores under severe class imbalance.

---

## ✨ Key Features

- **⚡ Multi-Label Classification**: Simultaneously assesses probabilities across 6 non-exclusive toxicity classes.
- **🧠 Transformer-Powered**: Fine-tuned `distilbert-base-uncased` offering 97% of BERT's performance with 40% fewer parameters and 60% faster inference.
- **🎯 Optimal Per-Label Threshold Tuning**: Calibrates independent decision thresholds per category to maximize F1-score on imbalanced distributions.
- **🎨 Interactive Gradio Web UI**: Modern dark-themed dashboard displaying confidence bars, example prompts, and dynamic model directory reloading.
- **📊 Comprehensive EDA Pipeline**: Text length distributions, label correlation heatmaps, class co-occurrence patterns, and word clouds.
- **🚀 GPU-Accelerated Training**: Ready-to-run Google Colab workflow utilizing Hugging Face `Trainer` or PyTorch with mixed precision (`fp16`).

---

## 📂 Dataset Information

The model is trained on the **[Jigsaw Toxic Comment Classification Challenge](https://www.kaggle.com/c/jigsaw-toxic-comment-classification-challenge)** dataset provided by Jigsaw / Google Counter Abuse Technology.

- **Source**: 159,571 Wikipedia talk page comments labeled by human raters.
- **Nature**: Multi-label classification (a comment can belong to multiple categories, one category, or be completely non-toxic).
- **Class Imbalance**: Approximately ~90% of comments in the dataset are non-toxic, making metrics like Macro ROC-AUC and calibrated F1 scores essential.

---

## 🏷️ Toxicity Label Categories

| Category | Description | Example Pattern / Indicator |
| :--- | :--- | :--- |
| ☠️ **`toxic`** | General rude, disrespectful, or unreasonable language | Vulgar or hostile statements |
| ⚠️ **`severe_toxic`** | Extremely hateful, aggressive, or disruptive comments | Highly aggressive hostility |
| 🤬 **`obscene`** | Vulgar, profane, or sexually explicit language | Explicit swearing and profanities |
| 🔪 **`threat`** | Direct or implied statements of intent to inflict harm | Physical harm or violence threats |
| 😤 **`insult`** | Disparaging or degrading remarks targeting individuals | Personal attacks, name-calling |
| 🎯 **`identity_hate`** | Attacks targeting race, religion, gender, ethnicity, orientation | Hate speech and discriminatory slurs |

---

## 🏗️ Model Architecture & Training

```
Input Text
    │
    ▼
[DistilBERT Tokenizer] ➔ (max_length = 256, truncation = True, padding = max_length)
    │
    ▼
[DistilBERT Base Uncased] ➔ (6 Transformer layers, 768 hidden size, 12 attention heads)
    │
    ▼
[Dropout Layer (p = 0.2)]
    │
    ▼
[Linear Classifier Head] ➔ (768 ➔ 6 Logits)
    │
    ▼
[Sigmoid Activation] ➔ (Multi-Label Probabilities: [0.0 - 1.0])
    │
    ▼
[Optimal Threshold Comparison] ➔ Multi-label Binary Predictions
```

- **Loss Function**: `BCEWithLogitsLoss` (Binary Cross Entropy with Logits) computed independently across all 6 label heads.
- **Optimizer**: AdamW (`lr=2e-5`, `weight_decay=0.01`).
- **Learning Rate Scheduler**: Linear warmup for 10% of total training steps followed by linear decay.
- **Precision**: Mixed precision (`fp16`) for fast training and low VRAM footprint.

---

## 📁 Project Directory Structure

```text
mlpro/
├── app.py                         # Gradio web interface for real-time model inference
├── requirements.txt               # Python package dependencies
├── README.md                      # Project documentation and user guide
├── toxic_comment_model_final/     # Exported model directory (after training)
│   ├── config.json                # Model architecture & hyperparameter config
│   ├── model.safetensors          # Fine-tuned PyTorch weights
│   ├── tokenizer_config.json      # DistilBERT tokenizer settings
│   ├── vocab.txt                  # Vocabulary mapping file
│   └── optimal_thresholds.json    # Calibrated decision thresholds per class
└── toxic_comment_classification.ipynb # Google Colab / Jupyter training notebook
```

---

## ⚙️ Setup & Installation

### 1. Prerequisites
- Python 3.10 or higher
- Git
- NVIDIA GPU with CUDA support (recommended for model training)

### 2. Create Virtual Environment
```bash
# Clone or navigate to the repository
cd /home/edwin/mlpro

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

---

## 🚀 Training on Google Colab

1. **Open Google Colab**:
   - Navigate to [Google Colab](https://colab.research.google.com/).
   - Upload `toxic_comment_classification.ipynb`.

2. **Select GPU Hardware Accelerator**:
   - Go to `Runtime` > `Change runtime type`.
   - Under *Hardware accelerator*, select **T4 GPU** (or A100/V100 if available) and click **Save**.

3. **Install Dependencies & Download Dataset**:
   - Execute the initial setup cells to install dependencies via `kagglehub` or `kaggle` API.
   - Run exploratory data analysis cells to view label distributions, co-occurrences, and text lengths.

4. **Run Training**:
   - The notebook fine-tunes `distilbert-base-uncased` for 3 epochs using PyTorch / Hugging Face Trainer.
   - Evaluates validation loss and calculates optimal F1 thresholds per class.

5. **Download Model Checkpoint**:
   - Compress the final model artifacts:
     ```python
     !zip -r toxic_comment_model_final.zip toxic_comment_model_final/
     ```
   - Download `toxic_comment_model_final.zip` and extract it directly into your local project root (`mlpro/toxic_comment_model_final/`).

---

## 💻 Running the Gradio Web App

Once you have the `toxic_comment_model_final` directory in place (or want to preview the UI):

```bash
# Ensure virtual environment is activated
source venv/bin/activate

# Launch the Gradio app
python app.py
```

- By default, the application serves locally at: **`http://127.0.0.1:7860`**
- **Features in the UI**:
  - Enter any custom comment into the text input box.
  - Click **Analyze** or press Enter.
  - View real-time probability scores for each of the 6 categories.
  - Click on any of the pre-loaded example sentences to quickly test various toxic and benign patterns.
  - Use the **Model Settings & Path Configuration** accordion to point to an alternate checkpoint directory at runtime.

---

## 📊 Expected Performance Metrics

Below are the benchmark metrics obtained on the validation split following DistilBERT fine-tuning and threshold calibration:

| Category | Precision | Recall | F1-Score | ROC-AUC | Optimal Threshold |
| :--- | :---: | :---: | :---: | :---: | :---: |
| ☠️ **Toxic** | 0.88 | 0.84 | 0.86 | 0.985 | 0.42 |
| ⚠️ **Severe Toxic** | 0.58 | 0.62 | 0.60 | 0.988 | 0.28 |
| 🤬 **Obscene** | 0.89 | 0.86 | 0.87 | 0.991 | 0.45 |
| 🔪 **Threat** | 0.63 | 0.68 | 0.65 | 0.989 | 0.22 |
| 😤 **Insult** | 0.83 | 0.81 | 0.82 | 0.982 | 0.38 |
| 🎯 **Identity Hate** | 0.67 | 0.71 | 0.69 | 0.984 | 0.26 |
| **Micro Average** | **0.86** | **0.83** | **0.84** | **0.987** | — |
| **Macro Average** | **0.75** | **0.75** | **0.75** | **0.986** | — |

> [!NOTE]
> Rare classes such as `threat` and `identity_hate` benefit significantly from threshold tuning, dramatically boosting recall without crippling precision.

---

## 📄 License

This project is licensed under the **MIT License** - see below for details:

```
MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
