```
      ___        __        
     /   | ____/ /___ ___ 
    / /| |/ __  / __ `__ \
   / ___ / /_/ / / / / / /
  /_/  |_\__,_/_/ /_/ /_/ 
        Amazon Web Services
```

# Tài Liệu Phỏng Vấn AWS Cơ Bản – EC2, S3, IAM, VPC Dành Cho IT/System/DevOps

## I. IAM (Identity & Access Management)

### 1. IAM là gì?
Dịch vụ quản lý người dùng, quyền hạn, nhóm, role trong AWS.

### 2. IAM User, Group, Role khác nhau?
- **User**: tài khoản cho con người.
- **Group**: nhóm user để gán quyền chung.
- **Role**: cấp quyền cho EC2, Lambda hoặc cross-account.

### 3. IAM Policy là gì?
Tập JSON xác định quyền Allow/Deny trên tài nguyên.

### 4. MFA là gì?
Multi-Factor Authentication tăng bảo mật khi đăng nhập.

---

## II. EC2 (Elastic Compute Cloud)

### 5. EC2 là gì?
Máy chủ ảo chạy trên AWS Cloud.

### 6. Các loại EC2 thường dùng
- t3/t2: general
- c5: CPU
- r5: RAM
- g4/g5: GPU

### 7. Security Group
Firewall stateful ở mức instance.

### 8. Security Group vs NACL
- SG: stateful, không có deny
- NACL: stateless, có allow/deny

### 9. Elastic IP
IP tĩnh có thể gán/attach giữa các EC2.

### 10. EBS vs Instance Store
- EBS: persistent, snapshot được
- Instance Store: mất dữ liệu khi stop

### 11. On-demand, Reserved, Spot
- On-demand: đắt nhưng linh hoạt
- Reserved: rẻ hơn, commit 1–3 năm
- Spot: rẻ nhất nhưng dễ bị thu hồi

---

## III. S3 (Simple Storage Service)

### 12. S3 là gì?
Object storage dùng lưu file.

### 13. Storage Class
- Standard
- Standard-IA
- Glacier
- Deep Archive

### 14. S3 Bucket Policy
Quy định ai được truy cập bucket.

### 15. Versioning
Lưu nhiều phiên bản file.

### 16. Lifecycle Rule
Tự động chuyển lớp lưu trữ hoặc xóa.

---

## IV. VPC (Virtual Private Cloud)

### 17. VPC là gì?
Mạng ảo riêng trong AWS.

### 18. Public vs Private Subnet
- Public: có route ra Internet Gateway
- Private: không ra internet

### 19. Internet Gateway
Thiết bị ảo kết nối VPC với internet.

### 20. NAT Gateway
Private subnet đi ra internet nhưng không nhận inbound.

---

## V. Load Balancer & Auto Scaling

### 21. Elastic Load Balancer (ELB)
Phân tải traffic vào EC2.

### 22. Auto Scaling Group (ASG)
Tự tăng/giảm EC2 dựa trên CloudWatch metrics.

---

## VI. AWS Storage khác

### 23. S3 vs EBS vs EFS
- S3: Object storage
- EBS: Block storage cho EC2
- EFS: Network filesystem

### 24. Khi nào dùng EFS?
Khi nhiều EC2 dùng chung dữ liệu.

---

## VII. Monitoring

### 25. CloudWatch
Theo dõi CPU, RAM, network và tạo alarm.

### 26. CloudTrail
Theo dõi hành vi "ai làm gì" (audit logs).

---

## VIII. Câu phỏng vấn tình huống

### 27. Deploy web app đơn giản trên AWS
VPC → Subnet → EC2 → SG → ALB → Route53 → Auto Scaling.

### 28. Bảo mật EC2
Chỉ mở port cần thiết, dùng keypair, gán IAM Role.

### 29. Backup EC2
Snapshot EBS, tạo AMI.

### 30. Lý do SSH không vào được EC2
- SG chưa mở port 22
- Keypair sai
- Không có public IP
- Route table/SUBNET sai
- Permission key sai (600)

---

**File này tổng hợp kiến thức đủ cho mức Junior – Middle khi phỏng vấn AWS.**

