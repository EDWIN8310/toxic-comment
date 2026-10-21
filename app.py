import os
import re
import json
import torch
import gradio as gr
from transformers import AutoModelForSequenceClassification, AutoTokenizer

# Constants
LABEL_COLUMNS = ['toxic', 'severe_toxic', 'obscene', 'threat', 'insult', 'identity_hate']
LABEL_DISPLAY = ['☠️ Toxic', '⚠️ Severe Toxic', '🤬 Obscene', '🔪 Threat', '😤 Insult', '🎯 Identity Hate']
MODEL_PATH = './toxic_comment_model_final'

def clean_text(text: str) -> str:
    """Preprocess and clean input text for tokenization."""
    text = str(text).lower()
    text = re.sub(r'\n', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

# Load model and tokenizer
def load_model(model_path: str):
    """Load model, tokenizer, and optimal thresholds from the specified path."""
    tokenizer = AutoTokenizer.from_pretrained(model_path)
    model = AutoModelForSequenceClassification.from_pretrained(model_path)
    model.eval()
    
    # Load optimal thresholds if available, otherwise default to 0.5
    threshold_path = os.path.join(model_path, 'optimal_thresholds.json')
    if os.path.exists(threshold_path):
        with open(threshold_path, 'r', encoding='utf-8') as f:
            thresholds = json.load(f)
    else:
        thresholds = {col: 0.5 for col in LABEL_COLUMNS}
    
    return model, tokenizer, thresholds

# Initial attempt to load the default model
try:
    model, tokenizer, thresholds = load_model(MODEL_PATH)
    model_loaded = True
    status_message = f"🟢 Model loaded from `{MODEL_PATH}`"
except Exception as e:
    model, tokenizer, thresholds = None, None, {col: 0.5 for col in LABEL_COLUMNS}
    model_loaded = False
    status_message = f"⚠️ Model not found at `{MODEL_PATH}`. Please train the model or specify a valid path in Model Settings."
    print(f"Notice: {status_message}")
    print(f"Details: {e}")

def predict(text: str):
    """Generate toxicity predictions for a given input comment."""
    if not text or not text.strip():
        return {label: 0.0 for label in LABEL_DISPLAY}
    
    if not model_loaded or model is None or tokenizer is None:
        gr.Warning(
            f"Model is not loaded from '{MODEL_PATH}'. "
            "Please ensure the model directory exists or update the path in 'Model Settings'."
        )
        return {label: 0.0 for label in LABEL_DISPLAY}
    
    cleaned = clean_text(text)
    encoding = tokenizer(
        cleaned,
        max_length=256,
        padding='max_length',
        truncation=True,
        return_tensors='pt'
    )
    
    with torch.no_grad():
        outputs = model(**encoding)
        probs = torch.sigmoid(outputs.logits).cpu().numpy()[0]
    
    results = {}
    for display_name, col, prob in zip(LABEL_DISPLAY, LABEL_COLUMNS, probs):
        results[display_name] = float(prob)
    
    return results

def reload_model_path(new_path: str):
    """Reload model and tokenizer from an alternate user-specified directory."""
    global model, tokenizer, thresholds, model_loaded, MODEL_PATH
    new_path = new_path.strip()
    if not new_path:
        return "⚠️ Please provide a non-empty directory path."
    try:
        model, tokenizer, thresholds = load_model(new_path)
        model_loaded = True
        MODEL_PATH = new_path
        gr.Info(f"Model successfully loaded from {new_path}")
        return f"🟢 Model loaded successfully from `{new_path}`"
    except Exception as e:
        model_loaded = False
        return f"🔴 Failed to load model from `{new_path}`: {e}"

# Build Gradio interface with dark-friendly theme styling
custom_css = """
.gradio-container {
    max-width: 900px !important;
    margin: 0 auto !important;
}
"""

theme = gr.themes.Soft(
    primary_hue='red',
    secondary_hue='orange',
    neutral_hue='slate',
    font=[gr.themes.GoogleFont('Inter'), 'ui-sans-serif', 'system-ui', 'sans-serif'],
)

with gr.Blocks(theme=theme, css=custom_css, title='Toxic Comment Detector') as demo:
    gr.Markdown('# 🛡️ Toxic Comment Detector')
    gr.Markdown(
        'Detect toxicity in comments using fine-tuned **DistilBERT**. '
        'Enter a comment below to analyze it across 6 toxicity categories in real time.'
    )
    
    with gr.Row():
        with gr.Column(scale=2):
            text_input = gr.Textbox(
                label='Enter Comment',
                placeholder='Type a comment to analyze...',
                lines=4
            )
            with gr.Row():
                submit_btn = gr.Button('🔍 Analyze', variant='primary', size='lg')
                clear_btn = gr.ClearButton(components=[text_input], value='🧹 Clear', size='lg')
        with gr.Column(scale=1):
            output = gr.Label(label='Toxicity Scores', num_top_classes=6)
    
    submit_btn.click(fn=predict, inputs=text_input, outputs=output)
    text_input.submit(fn=predict, inputs=text_input, outputs=output)
    clear_btn.add(output)
    
    gr.Examples(
        examples=[
            ['You are an amazing person and I appreciate your contributions!'],
            ['This article is terrible garbage'],
            ['I will find you and make you pay for this'],
            ['I disagree with your point but respect your opinion'],
            ['You are so stupid, just shut up already'],
            ['People of your group should not be allowed to post here'],
        ],
        inputs=text_input,
        label='💡 Example Comments to Try'
    )
    
    with gr.Accordion('⚙️ Model Settings & Path Configuration', open=False):
        gr.Markdown('If your fine-tuned model checkpoint is saved in a custom folder, enter the path below:')
        with gr.Row():
            path_input = gr.Textbox(
                value=MODEL_PATH,
                label='Model Directory Path',
                placeholder='./toxic_comment_model_final'
            )
            reload_btn = gr.Button('🔄 Reload Model', variant='secondary')
        status_display = gr.Markdown(value=status_message)
        reload_btn.click(fn=reload_model_path, inputs=path_input, outputs=status_display)

if __name__ == '__main__':
    demo.launch(share=False)
