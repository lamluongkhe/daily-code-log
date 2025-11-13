# 💻 Tóm tắt Hệ sinh thái AWS (Dành cho người học AWS Educate)

## ⚙️ **Tầng Compute (Tính toán)**
| Dịch vụ | Mô tả | Ví dụ thực tế |
|----------|--------|----------------|
| **EC2 (Elastic Compute Cloud)** | Máy ảo chạy ứng dụng, có thể chọn CPU, RAM, OS. | Chạy web server, game server, API. |
| **Lambda** | Chạy code không cần máy chủ (serverless), hỗ trợ Python, Node.js, PHP,... | Trigger code khi có upload file S3. |
| **ECS (Elastic Container Service)** | Chạy container (Docker), AWS quản lý hạ tầng. | Deploy app microservices. |
| **EKS (Elastic Kubernetes Service)** | Dịch vụ Kubernetes quản lý container quy mô lớn. | Cluster Kubernetes cho backend/webapp. |

---

## 💮 **Tầng Lưu trữ (Storage)**
| Dịch vụ | Mô tả | Ví dụ |
|----------|--------|--------|
| **S3 (Simple Storage Service)** | Lưu trữ file, ảnh, video, log, backup. | Lưu hình ảnh, file logs, static website. |
| **EBS (Elastic Block Store)** | Ổ cứng gắn vào EC2, lưu dữ liệu hệ điều hành và ứng dụng. | Ổ đĩa của máy ảo. |
| **RDS (Relational Database Service)** | CSDL (MySQL, PostgreSQL, SQL Server...) có backup tự động. | Database cho webapp. |
| **Secret Manager** | Lưu trữ mật khẩu, token, API key an toàn. | Lưu credential DB/API. |

---

## 🌐 **Tầng Mạng (Networking & CDN)**
| Dịch vụ | Mô tả | Ví dụ |
|----------|--------|--------|
| **VPC (Virtual Private Cloud)** | Tạo mạng riêng (subnet, route table, gateway) cho hệ thống. | Môi trường mạng riêng của bạn. |
| **Security Group** | Tường lửa cho EC2. | Mở port 22 (SSH), 80 (HTTP). |
| **WAF (Web Application Firewall)** | Chặn tấn công web (SQLi, XSS, bot...). | Bảo vệ web public. |
| **ALB (Application Load Balancer)** | Cân bằng tải HTTP/HTTPS. | Phân chia request đến nhiều server. |
| **CloudFront** | CDN cache nội dung tại edge locations. | Giảm độ trễ toàn cầu. |
| **Route 53** | Dịch vụ DNS quản lý domain. | Trỏ domain về IP hoặc ALB. |

---

## 🧬 **Tầng Quản lý & Bảo mật**
| Dịch vụ | Mô tả | Ví dụ |
|----------|--------|--------|
| **IAM (Identity & Access Management)** | Quản lý quyền truy cập user, group, role. | Cho developer truy cập EC2, cấm xóa S3. |
| **CloudWatch** | Giám sát CPU, RAM, logs, alert. | Theo dõi EC2, cảnh báo downtime. |

---

## 🧱 **Mô hình trực quan (ASCII)**

```plaintext
               ┌────────────────────────────────────┐
               │        Route 53 (DNS)         │
               └──────────────┬───────────────┘
                              │
                   ┌────────────┬────────────┐
                   │   CloudFront (CDN)   │
                   └────────────┬────────────┘
                              │
                      ┌─────────────┐
                      │   ALB (Load    │
                      │   Balancer)    │
                      └─────────────┘
                              │
          ┌───────────────┬─────────────────────────────────┐
          │                   │                   │
   ┌───────┐    ┌───────┐    ┌───────┐
   │  EC2 (App)   │    │  ECS/EKS     │    │  Lambda      │
   │  Web Server  │    │  Containers  │    │  Serverless  │
   └───────┘    └───────┘    └───────┘
          │                   │
   ┌───────┐     ┌───────┐
   │   RDS (DB)   │     │   S3 (Files) │
   └───────┘     └───────┘
          │
   ┌───────────────┐
   │ Secret Manager   │
   │ (API keys, Pass) │
   └───────────────┘

   [VPC + Security Group + WAF bảo vệ toàn bộ]
   [CloudWatch giám sát hiệu suất và cảnh báo]
```

---

## 🎓 **Dành cho tài khoản AWS Educate / Academy**

### ✅ **Dịch vụ dùng được**
- EC2 (tạo và SSH vào máy ảo)
- S3 (upload/download file)
- RDS (MySQL/PostgreSQL)
- IAM (user, role, policy)
- CloudWatch (metric, log)
- Lambda (function nhỏ)
- CloudFront (CDN)

### ⚠️ **Hạn chế**
- EKS / ECS: giới hạn tài nguyên, khó deploy cluster lớn
- Route 53 / WAF: cần domain thật, thường bị hạn trong gói free