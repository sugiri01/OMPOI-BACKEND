#!/bin/bash
echo "Starting OMPOI Backend Server..."
cd "$(dirname "$0")"
source venv/bin/activate
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
