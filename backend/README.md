# OMPOI Backend

## Setup

1.  **Create Virtual Environment**:
    ```bash
    python -m venv venv
    ```

2.  **Activate Virtual Environment**:
    - Windows: `venv\Scripts\activate`
    - Linux/Mac: `source venv/bin/activate`

3.  **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4.  **Environment Variables**:
    - Copy `.env.example` to `.env`
    - Update `.env` with your database credentials and API keys.

5.  **Database Migrations**:
    ```bash
    alembic upgrade head
    ```

## Running the Server

### Option 1: Using Scripts
- **Windows**: Double-click `run.bat` or run `.\run.bat` in terminal.
- **Linux/Mac**: Run `./run.sh`

### Option 2: Manual Command
```bash
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

## API Documentation
Once running, access the docs at:
- http://localhost:8000/docs
- http://localhost:8000/redoc
