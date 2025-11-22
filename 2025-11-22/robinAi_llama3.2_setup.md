# Hướng Dẫn Cài Đặt Robin với LLaMA 3.2 trên Ubuntu

## 1. Cài đặt Ollama và LLaMA 3.2

### 1.1 Gỡ phiên bản Ollama cũ (nếu có)
```bash
sudo pkill -f "ollama serve"
sudo rm -rf /usr/local/bin/ollama ~/.ollama
```

### 1.2 Cài đặt Ollama mới
```bash
wget https://ollama.com/download/ollama-linux.tar.gz -O ollama-linux.tar.gz

tar -xzf ollama-linux.tar.gz

sudo mv ollama /usr/local/bin/ollama
sudo chmod +x /usr/local/bin/ollama

ollama --version
```

### 1.3 Pull LLaMA 3.2
```bash
OLLAMA_HOST=0.0.0.0:11434 ollama serve &
curl http://127.0.0.1:11434/v1/models
ollama pull llama3.2:latest
ollama list
```

### 1.4 Chạy Ollama server với LLaMA 3.2
```bash
export LLM_MODEL=llama3.2
export OLLAMA_BASE_URL=http://host.docker.internal:11434

OLLAMA_HOST=0.0.0.0:11434 ollama serve &
```

## 2. Cài đặt Robin

### 2.1 Clone repository Robin
```bash
git clone https://github.com/apurvsinghgautam/robin.git
cd robin
```

### 2.2 Tạo file `.env`
```bash
cat <<EOF > .env
LLM_MODEL=llama3.2
OLLAMA_BASE_URL=http://host.docker.internal:11434
EOF
```

## 3. Chạy Docker Robin

### 3.1 Lệnh chạy Docker
```bash
docker run --rm \
  -v "$(pwd)/.env:/app/.env" \
  --add-host=host.docker.internal:host-gateway \
  -p 8501:8501 \
  apurvsg/robin:latest ui --ui-port 8501 --ui-host 0.0.0.0
```

### 3.2 Kiểm tra UI
Mở trình duyệt:
```
http://localhost:8501
```

## 4. Kiểm tra kết nối Ollama từ Docker
```bash
docker exec -it <container_id> bash
curl http://host.docker.internal:11434/v1/models
```
Kết quả sẽ hiển thị `llama3.2:latest`.

## 5. Lưu ý và Tips
1. Nếu gặp lỗi **address already in use**, dừng server Ollama cũ:
```bash
sudo pkill -f "ollama serve"
```
2. Cập nhật model:
```bash
ollama pull llama3.2:latest
```
3. Thay đổi LLM trong Robin chỉ cần sửa `.env`.
4. Ollama server cần chạy trước khi Docker Robin kết nối.

