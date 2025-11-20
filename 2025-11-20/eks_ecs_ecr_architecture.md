# Kiến trúc EKS / ECS / ECR (AWS) – Lý Thuyết & Sơ Đồ

## 1. Tổng quan
Bộ ba dịch vụ chạy container phổ biến trong AWS gồm:
- **EKS (Elastic Kubernetes Service)** – Chạy Kubernetes managed.
- **ECS (Elastic Container Service)** – Orchestrator container của AWS.
- **ECR (Elastic Container Registry)** – Lưu trữ Docker image.

Các dịch vụ này thường kết hợp để triển khai CI/CD và chạy workload container.

---

## 2. Kiến trúc EKS + ECR
```
Developer → Build Docker Image → Push → ECR → Pull → EKS (Deployment → Pod → Service → Ingress ALB)
```

### Luồng chi tiết
1. Developer build Docker image.
2. CI/CD push image lên **ECR**.
3. **EKS Deployment** pull image từ ECR.
4. EKS tạo Pod chạy container.
5. Service expose Pod trong cluster.
6. Ingress (ALB) đưa traffic từ Internet vào.

### Sơ đồ EKS
```
                   +------------------------+
                   |      Developer         |
                   |    (Build Docker)      |
                   +-----------+------------+
                               |
                               | Push image
                               v
                     +------------------+
                     |       ECR        |
                     | (Docker Registry)|
                     +--------+---------+
                              |
                              | Pull image
                              v
         +-----------------------------------------------+
         |                   EKS Cluster                  |
         |                                               |
         |   +-------------------+    +----------------+  |
         |   |   Deployment      |    |   Service      | |
         |   |   (Pods replicas) |    | (NodePort/CLB) | |
         |   +---------+---------+    +----------------+ |
         |             |                                |
         |           (Pods)                             |
         +-----------------------------------------------+
                              |
                              | Ingress ALB
                              v
                    +------------------------+
                    |   Internet / Clients   |
                    +------------------------+
```

---

## 3. Kiến trúc ECS + ECR
```
Developer → Build Docker → ECR → ECS Task → ALB → Client
```

### Luồng ECS (Fargate mode)
1. Developer build Docker → push lên **ECR**.
2. ECS Task pull image từ ECR.
3. ECS chạy container bằng **Fargate** hoặc **EC2**.
4. ALB phân phối traffic tới các task.

### Sơ đồ ECS
```
                   +------------------------+
                   |      Developer         |
                   |    (Build Docker)      |
                   +-----------+------------+
                               |
                               v
                     +------------------+
                     |       ECR        |
                     | (Docker Registry)|
                     +--------+---------+
                              |
                   ECS Task pulls image
                              v
           +-------------------------------------------+
           |                 ECS Cluster               |
           |                                           |
           |  +---------------+      +---------------+ |
           |  |   ECS Task   |      |   ECS Task    | |
           |  |(Container 1) |      |(Container 2)  | |
           |  +-------+------+      +-------+-------+ |
           |          |                     |         |
           +-------------------------------------------+
                              |
                              | Load Balancer (ALB)
                              v
                    +------------------------+
                    |   Internet / Clients   |
                    +------------------------+
```

---

## 4. Kiến trúc CI/CD với ECR + ECS/EKS
```
Developer → GitLab/GitHub/Jenkins → Build → Push ECR → Deploy → ECS/EKS
```

### Sơ đồ
```
Developer
   |
   | Commit code
   v
CI/CD Pipeline (GitLab / GitHub / Jenkins)
   |
   | Build Docker image
   | Push
   v
+-------------------+
|        ECR        |
|  (Image Storage)  |
+---------+---------+
          |
          | Deploy
          v
   +------------------+                 +------------------+
   |       EKS        |                 |       ECS        |
   |  (Kubernetes)    |                 |  (AWS Orchestr.) |
   +------------------+                 +------------------+
```

---

