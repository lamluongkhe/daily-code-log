# AWS ECS Networking Setup - Detailed Canvas

## Bước 1: Tạo VPC
- Console AWS -> VPC -> Create VPC
- CIDR Block: 10.0.0.0/16
- Enable DNS Hostname: Yes
- Tag: Name=my-vpc

## Bước 2: Tạo Subnet (Public + Private, Multi-AZ)
- Console AWS -> VPC -> Subnets -> Create Subnet
- Public Subnet AZ1: 10.0.1.0/24, Tag=public-subnet-1
- Private Subnet AZ1: 10.0.2.0/24, Tag=private-subnet-1
- Public Subnet AZ2: 10.0.3.0/24, Tag=public-subnet-2
- Private Subnet AZ2: 10.0.4.0/24, Tag=private-subnet-2
- Public Subnet AZ3: 10.0.5.0/24, Tag=public-subnet-3
- Private Subnet AZ3: 10.0.6.0/24, Tag=private-subnet-3

## Bước 3: Tạo Internet Gateway (IGW)
- Console AWS -> VPC -> Internet Gateways -> Create IGW
- Name tag: my-igw
- Attach to VPC: my-vpc

## Bước 4: Tạo Route Table Public
- Console AWS -> VPC -> Route Tables -> Create Route Table
- Name tag: public-rt
- Associate Subnets: public-subnet-1, public-subnet-2, public-subnet-3
- Edit Routes: 0.0.0.0/0 -> Target: IGW my-igw

## Bước 5: Tạo NAT Gateway cho Private Subnet
- Console AWS -> NAT Gateways -> Create NAT Gateway
- Subnet: public-subnet-1 (hoặc bất kỳ public subnet nào)
- Elastic IP: allocate new
- Chờ NAT Gateway trạng thái available

## Bước 6: Tạo Route Table Private
- Console AWS -> VPC -> Route Tables -> Create Route Table
- Name tag: private-rt
- Associate Subnets: private-subnet-1, private-subnet-2, private-subnet-3
- Edit Routes: 0.0.0.0/0 -> Target: NAT Gateway ID vừa tạo

## Bước 7: Cấu hình Security Groups
- Web Server Public (ECS Task Public Subnet): allow inbound 80/443, outbound all
- Backend / Database Private (ECS Task Private Subnet): inbound only từ internal/public subnet cần thiết, outbound tùy nhu cầu

## Bước 8: Đổi tên Network ACLs (NACLs)
- Vào VPC -> Network ACLs
- Đổi tên NACLs tương ứng với public/private subnet để dễ quản lý và phân biệt

## Notes
- Thiết kế multi-AZ + public/private subnet giúp HA, fault-tolerance, bảo mật.
- NAT Gateway cho phép private subnet outbound Internet mà không expose public IP.
- Route Tables quyết định traffic outbound/inbound cho từng subnet.
- Security Groups kiểm soát chi tiết quyền truy cập.
- Đổi tên NACLs giúp quản lý subnet dễ dàng và trực quan.

---
*File này là canvas chi tiết theo video hướng dẫn tạo VPC + 6 subnet + IGW + NAT + route table cho ECS.*

