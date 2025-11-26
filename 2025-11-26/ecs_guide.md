# AWS ECS – Elastic Container Service

## 1. ECS là gì
**ECS (Elastic Container Service)** là dịch vụ quản lý **container** của AWS, giúp triển khai, quản lý và mở rộng ứng dụng dạng Docker mà không phải tự quản lý máy chủ nhiều.

### Launch type chính
| Launch Type | Mô tả |
|------------|-------|
| EC2        | Container chạy trên **EC2 instance** do bạn quản lý hoặc ECS tạo tự động. |
| Fargate    | AWS quản lý instance, bạn chỉ cần lo container. |

## 2. Cấu trúc ECS

- **Cluster**: tập hợp các container instances (EC2) hoặc Fargate tasks.
- **EC2 Instance / Container Instance**: máy chủ chạy container.
- **Task Definition**: mô tả container (image, CPU, memory, port, env…).
- **Task / Service**: chạy container, service quản lý số lượng task, auto-restart.
- **IAM Role**: quyền cho EC2 hoặc ECS agent truy cập AWS.

## 3. Tạo ECS Cluster với EC2

### Bước 1: Tạo Cluster
1. AWS Console → ECS → **Clusters → Create Cluster**
2. Chọn **EC2 Linux + Networking**
3. Nhập thông tin:
   - Cluster name  
   - EC2 instance type (ví dụ t2.micro)
   - Number of instances
   - Key pair (nếu muốn SSH)
   - VPC, Subnet, Security group
4. Create → ECS sẽ tạo **Launch Template** + **EC2 instance mới**.

> ⚠️ Lưu ý: EC2 mới được tạo tự động chỉ khi dùng giao diện này. Nếu muốn dùng EC2 sẵn, cần cài ECS agent và gán IAM role thủ công.

### Bước 2: Kiểm tra ECS Instance
- ECS → Clusters → Your Cluster → ECS Instances → thấy EC2 instance đã được quản lý.

### Bước 3: Tạo Task Definition
1. ECS → Task Definitions → **Create new Task Definition**
2. Chọn **EC2 launch type**
3. Cấu hình container:
   - Container name  
   - Image (ví dụ `nginx:latest`)
   - Memory / CPU
   - Port mapping (80:80)
4. Lưu task definition

### Bước 4: Tạo Service
1. ECS → Clusters → Your Cluster → **Create → Service**
2. Chọn:
   - Launch type: EC2  
   - Task definition: chọn task vừa tạo
   - Number of tasks: số container chạy
3. Chọn **VPC & Security group** phù hợp
4. Create service → container sẽ chạy trên EC2 instance.

### Bước 5: Kiểm tra
- SSH vào EC2 → `docker ps` để thấy container đang chạy.
- Service sẽ tự động restart container nếu crash.

## 4. Dùng EC2 hiện có
1. Cài ECS agent (Amazon Linux 2 có sẵn, Ubuntu cài thủ công)
2. Gán IAM Role: `AmazonEC2ContainerServiceforEC2Role`
3. Cấu hình `/etc/ecs/ecs.config`:
```bash
ECS_CLUSTER=YourClusterName
```
4. Khởi động lại agent: `sudo systemctl restart ecs`
5. EC2 sẽ đăng ký vào cluster.

## 5. IAM Role đơn giản để tạo ECS Cluster với EC2
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ecs:*",
                "ec2:Describe*",
                "ec2:RunInstances",
                "ec2:CreateLaunchTemplate",
                "ec2:CreateTags",
                "iam:PassRole"
            ],
            "Resource": "*"
        }
    ]
}
```
> ⚠️ Đây là policy đơn giản nhất, đủ để tạo ECS Cluster với EC2 và tự động khởi tạo instance. Bạn có thể tinh chỉnh sau để bảo mật hơn.

## 6. Lưu ý
- ECS tạo EC2 mới nếu bạn dùng giao diện Cluster EC2.  
- Dùng EC2 sẵn cần thao tác thủ công.  
- IAM role phải có quyền EC2 và ECS (ec2:RunInstances, ec2:CreateLaunchTemplate, ecs:*, v.v.).