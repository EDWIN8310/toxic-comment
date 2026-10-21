"""Small FastAPI service for the exported toxicity classifier."""

import json
import os
import re
from pathlib import Path

import torch
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from transformers import AutoModelForSequenceClassification, AutoTokenizer

LABELS = ["toxic", "severe_toxic", "obscene", "threat", "insult", "identity_hate"]
MODEL_DIR = Path(os.getenv("MODEL_DIR", Path(__file__).parent / "toxic_comment_model_final"))

app = FastAPI(title="Toxic Comment Model API", version="1.0.0")
allowed_origins = [origin.strip() for origin in os.getenv("ALLOWED_ORIGINS", "*").split(",") if origin.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

tokenizer = AutoTokenizer.from_pretrained(str(MODEL_DIR), local_files_only=True)
model = AutoModelForSequenceClassification.from_pretrained(str(MODEL_DIR), local_files_only=True)
model.eval()
threshold_file = MODEL_DIR / "optimal_thresholds.json"
thresholds = json.loads(threshold_file.read_text()) if threshold_file.exists() else {label: 0.5 for label in LABELS}


class PredictionRequest(BaseModel):
    text: str = Field(min_length=1, max_length=10000)


@app.get("/health")
def health():
    return {"status": "ok", "model_loaded": True}


@app.post("/predict")
def predict(request: PredictionRequest):
    cleaned = re.sub(r"\s+", " ", request.text.lower()).strip()
    if not cleaned:
        raise HTTPException(status_code=422, detail="Text must contain non-whitespace characters")
    encoded = tokenizer(cleaned, max_length=256, padding="max_length", truncation=True, return_tensors="pt")
    with torch.inference_mode():
        probabilities = torch.sigmoid(model(**encoded).logits)[0].tolist()
    scores = {label: float(value) for label, value in zip(LABELS, probabilities)}
    decisions = {label: scores[label] >= float(thresholds.get(label, 0.5)) for label in LABELS}
    return {"scores": scores, "thresholds": thresholds, "flags": decisions}
