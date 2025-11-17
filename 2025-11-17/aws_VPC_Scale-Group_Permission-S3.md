# AWS Kiến Thức Tổng Hợp

Tài liệu này tổng hợp toàn bộ các kiến thức bạn đã hỏi và ghi chú hình vẽ, bao gồm: Subnet, NAT, IGW, VPC peering, Security Group, ACL, mô hình public/private, data transfer, EC2 loại on-demand/spot, container services, autoscaling, IAM, resize filesystem, và cấu hình AWS CLI.

---

## 1. Subnet trong AWS
### **Public Subnet**
- Có route tới **Internet Gateway (IGW)**.
- Cho phép EC2 nhận **public IPv4**.
- EC2 có thể truy cập trực tiếp từ Internet.

### **Private Subnet**
- Không có route tới IGW.
- Có thể ra Internet qua **NAT Gateway** (chỉ outbound).
- Không được cấp public IP.
- Dùng cho backend, DB, servers nội bộ.

---

## 2. NAT Gateway vs Internet Gateway
### **Internet Gateway (IGW)**
- Cho phép 2 chiều giữa Internet ↔ VPC.
- Dùng cho public subnet.

### **NAT Gateway**
- Chỉ cho outbound Internet từ private subnet.
- Không nhận inbound từ Internet.

---

## 3. VPC Peering
- Kết nối **VPC ↔ VPC**.
- Không dùng IGW.
- Không hỗ trợ routing bắc cầu (non‑transitive).

---

## 4. Network ACL (NACL)
- Firewall cấp độ **subnet**.
- Stateless → phải mở cả inbound lẫn outbound.
- Rule đánh giá theo số thứ tự.

---

## 5. Security Group (SG)
- Firewall cấp độ **instance**.
- Stateful → chỉ cần mở inbound.
- Dùng trong hầu hết thiết kế AWS.

---

## 6. Mô hình Public → Private qua Load Balancer
Luồng đúng:
```
Client → Internet → Load Balancer (public subnet) → EC2 private subnet
```
- EC2 private không lộ IP.
- Tăng bảo mật và độ ổn định.

---

## 7. AWS Data Transfer
- Dữ liệu Internet → AWS: tính phí.
- Dữ liệu giữa AZ: mất phí.
- Nội bộ cùng AZ: rẻ hoặc miễn phí.
- Internet outbound: đắt nhất.

---

## 8. Elastic IP (EIP)
- Public IP tĩnh.
- Gán được cho EC2 trong public subnet.
- Không dùng cho private subnet.

---

## 9. EC2 Pricing
EC2 có **4 hình thức thanh toán chính**:

### **1. On-Demand**
- Trả theo giờ/giây.
- Linh hoạt, không cam kết.
- Giá cao nhất nhưng dễ dùng.

### **2. Spot Instances**
- Rẻ hơn **70–90%** so với On-Demand.
- AWS có thể thu hồi bất cứ lúc nào.
- Hợp cho batch job, worker, render, task không quan trọng.

### **3. Reserved Instances (RI)**
- Cam kết **1 hoặc 3 năm**.
- Tiết kiệm **40–70%**.
- Gắn với 1 region + 1 instance family.
- Phù hợp hệ thống chạy ổn định lâu dài.

### **4. Savings Plans**
- Linh hoạt hơn RI.
- Chỉ cần cam kết **mức tiền/giờ**.
- Tiết kiệm **tới 72%**.
- Áp dụng cho nhiều loại compute: EC2, Fargate, Lambda.

---

## 10. Container Services: EKS / ECS / ECR

### **EKS (Elastic Kubernetes Service)**
- Dịch vụ **Kubernetes fully-managed** của AWS.
- AWS quản lý control plane → bạn không cần tự cài master, etcd, scheduler.
- Bạn chỉ triển khai node group và workloads (Pods, Deployments).
- Phù hợp hệ thống microservices lớn, yêu cầu HA, scaling linh hoạt.
- Hỗ trợ autoscaling: HPA, Cluster Autoscaler, Managed Node Groups.

### **ECS (Elastic Container Service)**
- Orchestrator **độc quyền** do AWS phát triển (không dựa trên Kubernetes).
- Đơn giản, nhẹ hơn EKS, dễ quản lý.
- Hai chế độ chạy:
  - **EC2 Launch Type** → container chạy trên máy EC2.
  - **Fargate Launch Type** → serverless, không cần quản lý hạ tầng.
- Phù hợp hệ thống container nhỏ đến trung bình hoặc muốn tối ưu chi phí.

### **ECR (Elastic Container Registry)**
- Registry dùng để lưu **Docker images**.
- Tích hợp chặt với ECS/EKS.
- Hỗ trợ:
  - Scan lỗ hổng bảo mật.
  - Versioning image.
  - Quản lý access bằng IAM.

## 11. Auto Scaling Group (ASG). Auto Scaling Group (ASG)
- Tự động scale theo CPU/Load.
- Dùng Launch Template.
- Liên quan:
  - AMI
  - Instance type
  - EBS

---

## 12. IAM: Policies, Roles, ARN
### **Tạo Permission bằng file JSON và dùng ARN**
Bạn có thể tạo **policy** bằng file JSON và attach vào user/role bằng **ARN**.

#### 1. Tạo file policy JSON
Ví dụ: `s3-full-access.json`
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:*",
      "Resource": "*"
    }
  ]
}
```

#### 2. Tạo policy bằng AWS CLI
```bash
aws iam create-policy \
  --policy-name S3FullAccessCustom \
  --policy-document file://s3-full-access.json
```
Kết quả trả về sẽ có một ARN dạng:
```
arn:aws:iam::123456789012:policy/S3FullAccessCustom
```

#### 3. Attach policy vào user hoặc role
Ví dụ attach vào user:
```bash
aws iam attach-user-policy \
  --user-name myuser \
  --policy-arn arn:aws:iam::123456789012:policy/S3FullAccessCustom
```

Ví dụ attach vào role:
```bash
aws iam attach-role-policy \
  --role-name EC2AccessRole \
  --policy-arn arn:aws:iam::123456789012:policy/S3FullAccessCustom
```

---
### **Policy**
- Tập hợp quyền.

### **Role**
- Gán cho EC2 hoặc service.
- EC2 dùng role để gọi AWS CLI mà không cần access key.

### **Trust Relationship**
- Cho phép service nào được assume role.

### **ARN**
- Định danh tài nguyên AWS.

---

## 13. Resize Disk trên EC2 dùng XFS
- Amazon Linux dùng **XFS**, nên *không dùng* resize2fs.

### Bước 1: Mở rộng partition
```bash
sudo growpart /dev/nvme0n1 1
```

### Bước 2: Mở rộng filesystem XFS
```bash
sudo xfs_growfs -d /
```

### Kiểm tra lại
```bash
df -h
```

---

## 14. Export AWS Access Key / Cấu hình AWS CLI
### Cách tạm thời
```bash
export AWS_ACCESS_KEY_ID="xxxxx"
export AWS_SECRET_ACCESS_KEY="yyyyy"
export AWS_DEFAULT_REGION="ap-southeast-1"
```

### Cách chuẩn
```bash
aws configure
```
Lưu vào:
- `~/.aws/credentials`
- `~/.aws/config`

### Dùng nhiều profile
```bash
export AWS_PROFILE=myprofile
```

---

## 15. Tổng Kết Chung
- Public subnet dành cho Internet; Private subnet dùng cho backend.
- IGW cho public; NAT cho private.
- NACL stateless; SG stateful.
- Mô hình chuẩn: Client → LB → Private EC2.
- Nắm các service chính: EC2, EKS, ECS, ECR, IAM.
- Resize disk Amazon Linux phải dùng XFS.
- AWS CLI nên cấu hình bằng `aws configure`.


## 0. Container Services: EKS / ECS / ECR

### **EKS (Elastic Kubernetes Service)**
- Dịch vụ **Kubernetes fully-managed** của AWS.
- AWS quản lý control plane, bạn chỉ quản lý node và workload.
- Phù hợp hệ thống microservices lớn, cần tính mở rộng linh hoạt.

### **ECS (Elastic Container Service)**
- Hệ thống **orchestrator riêng của AWS** (không phải Kubernetes).
- Đơn giản hơn EKS, dễ triển khai.
- Hai chế độ chạy:
  - **EC2 Mode**: chạy container trên EC2.
  - **Fargate Mode**: chạy container không cần server.

### **ECR (Elastic Container Registry)**
- Registry lưu trữ **Docker images** của AWS.
- Tích hợp sẵn với ECS/EKS.
- Hỗ trợ scan bảo mật image.
