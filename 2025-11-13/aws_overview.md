# ☁️ Tổng quan hệ sinh thái AWS (cho người học AWS Educate)

## ⚙️ **Tầng Compute (Tính toán)**
| Dịch vụ | Mô tả | Ví dụ thực tế |
|----------|--------|----------------|
| **EC2 (Elastic Compute Cloud)** | Máy ảo chạy ứng dụng, có thể chọn CPU, RAM, OS. | Chạy web server, game server, API. |
| **Lambda** | Chạy code không cần máy chủ (serverless), hỗ trợ Python, Node.js, PHP,... | Trigger code khi có upload file S3. |
| **ECS (Elastic Container Service)** | Chạy container (Docker), AWS quản lý hạ tầng. | Deploy app microservices. |
| **EKS (Elastic Kubernetes Service)** | Dịch vụ Kubernetes quản lý container ở quy mô lớn. | Cluster Kubernetes cho backend/webapp. |

---

## 💾 **Tầng Lưu trữ (Storage)**
| Dịch vụ | Mô tả | Ví dụ |
|----------|--------|--------|
| **S3 (Simple Storage Service)** | Ổ lưu trữ dạng object (file, ảnh, log, video, backup). | Lưu hình ảnh, file logs, static website. |
| **EBS (Elastic Block Store)** | Ổ cứng gắn vào EC2, lưu dữ liệu hệ điều hành và ứng dụng. | Dữ liệu ổ đĩa máy ảo. |
| **RDS (Relational Database Service)** | CSDL (MySQL, PostgreSQL, SQL Server...) có backup tự động. | Database cho ứng dụng web. |
| **Secret Manager** | Lưu trữ mật khẩu, token, API key an toàn. | Lưu credential kết nối DB/API. |

---

## 🌐 **Tầng Mạng (Networking & CDN)**
| Dịch vụ | Mô tả | Ví dụ |
|----------|--------|--------|
| **VPC (Virtual Private Cloud)** | Tạo mạng riêng (subnet, route table, gateway) cho hệ thống. | Môi trường mạng riêng của bạn. |
| **Security Group** | Tường lửa cho máy ảo (EC2). | Mở port 22 (SSH), 80 (HTTP). |
| **WAF (Web Application Firewall)** | Chặn tấn công web (SQLi, XSS, bot...). | Bảo vệ web public. |
| **ALB (Application Load Balancer)** | Cân bằng tải HTTP/HTTPS. | Phân chia request web đến nhiều server. |
| **CloudFront** | Mạng CDN, cache nội dung tĩnh ở edge locations. | Giảm độ trễ cho người dùng toàn cầu. |
| **Route 53** | Dịch vụ DNS quản lý domain. | Trỏ tên miền về IP hay load balancer. |

---

## 🧩 **Tầng Quản lý & Bảo mật**
| Dịch vụ | Mô tả | Ví dụ |
|----------|--------|--------|
| **IAM (Identity & Access Management)** | Quản lý quyền truy cập người dùng, nhóm, role. | Cho phép developer truy cập EC2, cấm xóa S3. |
| **CloudWatch** | Giám sát tài nguyên (CPU, RAM, logs, alert). | Theo dõi hiệu suất EC2, cảnh báo downtime. |

---

## 🧱 **Mô hình trực quan (dễ hiểu)**

```
             ┌─────────────────────────────┐
             │        Route 53 (DNS)       │
             └──────────────┬──────────────┘
                            │
                ┌───────────▼───────────┐
                │   CloudFront (CDN)    │
                └───────────┬───────────┘
                            │
                    ┌───────▼───────┐
                    │  ALB (Load    │
                    │  Balancer)    │
                    └───────┬───────┘
                            │
           ┌────────────────┼────────────────┐
           │                │                │
     ┌─────▼────┐    ┌─────▼────┐      ┌─────▼────┐
     │  EC2     │    │  ECS/EKS │      │  Lambda  │
     │  App/Web │    │ Container│      │ Function │
     └─────┬────┘    └─────┬────┘      └──────────┘
           │               │
     ┌─────▼────┐     ┌────▼─────┐
     │   RDS    │     │    S3    │
     │ Database │     │  Storage │
     └─────┬────┘     └─────┬────┘
           │                │
     ┌─────▼────────────────▼─────┐
     │   Secret Manager (Keys)    │
     └────────────────────────────┘

 [VPC + Security Group + WAF bảo vệ toàn hệ thống]
 [CloudWatch giám sát hiệu suất, cảnh báo tự động]
```

---

## 🎓 **Dành cho tài khoản AWS Educate / Academy**

### ✅ **Dịch vụ bạn có thể học và thử nghiệm**
- EC2 (tạo máy ảo, SSH, cài web server)
- S3 (upload/download file)
- RDS (MySQL, PostgreSQL)
- IAM (user, role, policy)
- CloudWatch (giám sát metric và log)
- Lambda (chạy function nhỏ)
- CloudFront (triển khai CDN)

### ⚠️ **Giới hạn trong tài khoản Educate**
- EKS / ECS: tài nguyên giới hạn, khó triển khai cluster lớn.
- Route 53 / WAF: cần domain thật, có thể bị khóa trong gói miễn phí.

---

## 🔗 **Tài liệu tham khảo nhanh (AWS Docs)**
- [EC2 Documentation](https://docs.aws.amazon.com/ec2/)
- [S3 Documentation](https://docs.aws.amazon.com/s3/)
- [RDS Documentation](https://docs.aws.amazon.com/rds/)
- [IAM Documentation](https://docs.aws.amazon.com/iam/)
- [CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [EKS Documentation](https://docs.aws.amazon.com/eks/)
- [ECS Documentation](https://docs.aws.amazon.com/ecs/)
- [Lambda Documentation](https://docs.aws.amazon.com/lambda/)
- [CloudWatch Documentation](https://docs.aws.amazon.com/cloudwatch/)

