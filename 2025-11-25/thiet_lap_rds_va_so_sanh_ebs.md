# Thiết Lập AWS RDS & So Sánh Với EBS

## 1. Hướng Dẫn Tạo RDS (MySQL/PostgreSQL)

### **Bước 1: Mở AWS RDS Console**
- Vào **AWS Console → RDS**
- Chọn **Create database**

### **Bước 2: Chọn phương thức tạo**
- **Standard create** (đầy đủ tuỳ chỉnh)
- Engine: **MySQL / PostgreSQL / MariaDB / Oracle / SQL Server**

### **Bước 3: Chọn mục đích sử dụng**
- **Dev/Test** → tiết kiệm chi phí
- **Production** → bật Multi-AZ, backup đầy đủ

### **Bước 4: Cấu hình DB**
- DB identifier: `mydb`
- Credentials: user + password

### **Bước 5: Cấu hình máy chủ**
- DB instance class: `db.t3.micro` (Free tier)
- Storage: **gp3** hoặc **io-optimized**
- Autostorage scaling: Tùy chọn

### **Bước 6: Connectivity**
- VPC: chọn VPC của bạn
- Subnet group: chọn subnet group tự động tạo
- Public access: **Yes/No** tùy nhu cầu
- VPC security group: mở port 3306/5432

### **Bước 7: Additional configs**
- Backup retention: 7 ngày
- Monitoring: bật Enhanced Monitoring nếu cần
- Maintenance window: chọn thời gian update

### **Bước 8: Tạo DB**
- Nhấn **Create database**
- Chờ khoảng 3–5 phút

### **Bước 9: Cài MariaDB/MySQL client trên Amazon Linux**
```bash
# Kiểm tra các gói có sẵn
dnf search mariadb

# Cài MariaDB client (ví dụ mariadb105)
sudo dnf install -y mariadb105

# Kiểm tra phiên bản đã cài
mysql -V
```

### **Bước 10: Kết nối vào RDS MySQL/MariaDB**
```bash
mysql -h <RDS-endpoint> -u <username> -p
# Nhập password khi được yêu cầu
```

### **Bước 11: Một số lệnh MySQL cơ bản sau khi connect**
```sql
SHOW DATABASES;
USE testdb;
SHOW TABLES;
SELECT * FROM tablename;
```

**Mẹo:**
- Nếu không connect được, kiểm tra **Security Group** của RDS: mở port 3306 cho IP của bạn.
- Nếu RDS Public Access = No, phải connect từ EC2 trong cùng VPC hoặc qua VPN.

---

## 2. RDS Khác Gì EBS?

| Tiêu chí | AWS RDS | AWS EBS |
|---------|---------|---------|
| Loại dịch vụ | **Managed Database Service** | **Block Storage** |
| Chức năng | Chạy DB hoàn chỉnh (MySQL, PostgreSQL...) | Là ổ đĩa gắn vào EC2 |
| Backup | Tự động backup, point-in-time recovery | Không tự backup nếu không bật snapshot |
| Tự động cập nhật | Có (patch engine DB) | Không |
| High Availability | Multi-AZ | Chỉ dựa vào EC2 và EBS replication |
| Quản lý | **AWS quản lý DB** | Người dùng tự quản lý database |
| Sử dụng khi | Cần DB sẵn sàng cao, ít quản lý | Bạn tự cài DB trên EC2 |
| Giá | Cao hơn | Thấp hơn |

> **Tóm lại:**
> - RDS = *Database-as-a-service* (AWS vận hành).
> - EBS = *Storage*, bạn phải tự cài và quản trị DB.

---

Nếu bạn muốn mình thêm **hướng dẫn tạo EBS**, **tạo EC2 + gắn EBS**, hoặc **hướng dẫn kết nối RDS từ ứng dụng**, hãy nói mình biết.

