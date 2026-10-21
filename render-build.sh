#!/usr/bin/env bash
set -euo pipefail

if [[ ! -f toxic_comment_model_final/model.safetensors ]]; then
  : "${MODEL_ARCHIVE_URL:?Set MODEL_ARCHIVE_URL to the public model ZIP release asset URL.}"
  archive_path="/tmp/toxic_comment_model_final.zip"
  curl --fail --location --retry 3 "$MODEL_ARCHIVE_URL" --output "$archive_path"
  unzip -q "$archive_path" -d /tmp/toxic-model
  model_dir="/tmp/toxic-model/toxic_comment_model_final"
  if [[ ! -f "$model_dir/model.safetensors" ]]; then
    echo "Downloaded archive does not contain toxic_comment_model_final/model.safetensors" >&2
    exit 1
  fi
  cp -R "$model_dir"/. ./toxic_comment_model_final/
fi

pip install -r api-requirements.txt
