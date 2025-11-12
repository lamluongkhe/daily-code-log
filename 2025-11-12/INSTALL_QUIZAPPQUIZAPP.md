# 🧩 QuizApp Helm Deployment Guide

## 🗂️ 1. Kiến trúc tổng quan

Hệ thống gồm 3 thành phần chính:

| Thành phần | Mô tả | Port | Image |
|-------------|-------|------|--------|
| **tracnghiem-api** | .NET 6 API xử lý logic và kết nối DB | 80 | `lamluongkhe/tracnghiem-api:v2` |
| **tracnghiem-frontend** | React app giao diện người dùng | 80 | `lamluongkhe/tracnghiem-frontend:v2` |
| **quizapp-mssql** | SQL Server lưu trữ dữ liệu | 1433 | `mcr.microsoft.com/mssql/server:2022-latest` |

---

## 🖼️ 2. Mô hình triển khai (Kubernetes)

```
                +---------------------+
                |     Ingress/Nginx   |
                |   (Load Balancer)   |
                +----------+----------+
                           |
             +-------------+-------------+
             |                           |
     +-------v-------+           +-------v-------+
     | tracnghiem-frontend |     | tracnghiem-api |
     | React + Nginx        |     | .NET 6 API     |
     | Port 80              |     | Port 80        |
     +----------+-----------+     +---------+------+
                |                           |
                |        Internal Service   |
                |          (ClusterIP)      |
                +-------------+-------------+
                              |
                       +------v------+
                       | quizapp-mssql |
                       |   SQL Server   |
                       |    Port 1433   |
                       +---------------+
```

---

## ⚙️ 3. Chuẩn bị Docker Images

### 🧱 Backend (.NET API)

**Dockerfile:**  
`tracnghiemAPI/tracnghiemAPI/Dockerfile`
```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY tracnghiemAPI.sln ./
COPY tracnghiemAPI/ ./tracnghiemAPI/
RUN dotnet restore tracnghiemAPI/tracnghiemAPI.csproj
RUN dotnet publish tracnghiemAPI/tracnghiemAPI.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "tracnghiemAPI.dll"]
```

**Build & Push:**
```bash
docker build -t lamluongkhe/tracnghiem-api:v2 tracnghiemAPI/tracnghiemAPI
docker push lamluongkhe/tracnghiem-api:v2
```

---

### 🎨 Frontend (React + Nginx)

**Dockerfile:**  
`tracnghiem/Dockerfile`
```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Build & Push:**
```bash
docker build -t lamluongkhe/tracnghiem-frontend:v2 tracnghiem
docker push lamluongkhe/tracnghiem-frontend:v2
```

---

### 🧠 Database (MSSQL)

```bash

docker run -d   --name quizapp-mssql   -e "ACCEPT_EULA=Y"   -e "SA_PASSWORD=Admin@123"   -p 1433:1433   -v $(pwd)/QuizDB.bak:/var/opt/mssql/backup/QuizDB.bak   -v $(pwd)/data:/var/opt/mssql   mcr.microsoft.com/mssql/server:2022-latest
```

---

## 🐳 4. Helm Chart Cấu Trúc

```
quizapp-k8s/
├── Chart.yaml
├── values.yaml
└── templates/
    ├── backend-deployment-service.yaml
    ├── frontend-deployment-service.yaml
    ├── mssql-deployment-service.yaml
    └── ingress.yaml (nếu có)
```

---

## 📦 5. Triển khai bằng Helm

### 1️⃣ Cài đặt chart
```bash
helm install quizapp ./quizapp-k8s
```

### 2️⃣ Kiểm tra
```bash
kubectl get pods
kubectl get svc
```

### 3️⃣ Copy database backup vào pod MSSQL
```bash
kubectl cp ~/Desktop/QuizApp-k8s/QuizDB.bak quizapp-mssql-0:/var/opt/mssql/backup/QuizDB.bak
```

### 4️⃣ Restore database (vào container MSSQL)
```bash
kubectl exec -it quizapp-mssql-0 -- /opt/mssql-tools/bin/sqlcmd    -S localhost -U SA -P 'Admin@123'    -Q "RESTORE DATABASE QuizDB FROM DISK='/var/opt/mssql/backup/QuizDB.bak' WITH MOVE 'QuizDB' TO '/var/opt/mssql/data/QuizDB.mdf', MOVE 'QuizDB_log' TO '/var/opt/mssql/data/QuizDB.ldf', REPLACE"
```

---

## 🌐 6. Truy cập ứng dụng

- **Frontend (UI):**  
  `http://<NodeIP>:<NodePort hoặc ingress domain>`

- **API (Swagger):**  
  `http://<NodeIP>/swagger/index.html`

---

## 🧩 7. Mẹo & Ghi chú

- Mọi service đều dùng `ClusterIP`, truy cập bên ngoài qua **Ingress Controller** hoặc **NodePort**.
- Mỗi service nên được tách thành **một Pod riêng** để dễ scale độc lập.
- Nếu dùng **bridge network (Docker Compose)** thay vì K8s, cần sửa CORS của API.
