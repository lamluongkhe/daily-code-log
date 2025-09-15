FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY templates app.py backendsess.py .
CMD ["python", "app.py"]
