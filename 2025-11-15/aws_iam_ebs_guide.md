# Hướng Dẫn AWS: Tạo IAM User và EBS Volume

## 📌 1. Tạo IAM User
IAM (Identity and Access Management) giúp quản lý người dùng và quyền hạn trên AWS.

### Bước 1: Truy cập IAM Console
1. Đăng nhập AWS Management Console.
2. Chọn **Services → Security, Identity, & Compliance → IAM**.

### Bước 2: Thêm User mới
1. Chọn **Users → Add users**.
2. Nhập tên user (ví dụ: `dev-user`).
3. Chọn loại truy cập:
   - **Programmatic access**: dùng CLI hoặc SDK.
   - **AWS Management Console access**: dùng đăng nhập console.
4. Nếu chọn console access, đặt **password** hoặc để AWS tạo tự động.

### Bước 3: Gán quyền cho User
1. Chọn **Attach existing policies directly**.
2. Ví dụ:
   - `AdministratorAccess` (quyền toàn quyền)
   - Hoặc `AmazonEC2FullAccess` để thao tác EC2/EBS.
3. Nhấn **Next → Review → Create user**.

### Bước 4: Lưu thông tin User
- Lưu **Access key ID + Secret** nếu dùng CLI/SDK.
- User đã sẵn sàng sử dụng.

---

## 📌 2. Tạo EBS Volume
EBS (Elastic Block Store) là storage gắn ngoài EC2, dữ liệu giữ nguyên khi stop/start instance.

### Bước 1: Truy cập EC2 Console
1. Chọn **Services → Compute → EC2 → Elastic Block Store → Volumes**.

### Bước 2: Tạo Volume mới
1. Chọn **Create volume**.
2. Chọn các thông số:
   - **Volume type**: gp3 (SSD), io2, st1…
   - **Size (GB)**: ví dụ 20 GB.
   - **Availability Zone (AZ)**: phải cùng AZ với instance bạn muốn attach.
3. Nhấn **Create volume**.

### Bước 3: Gắn Volume vào EC2
1. Chọn volume vừa tạo → **Actions → Attach volume**.
2. Chọn instance cần gắn.
3. Chọn device name (ví dụ `/dev/sdf`) → **Attach**.

### Bước 4: Trên EC2, mount Volume
```bash
# Kiểm tra device
lsblk

# Tạo filesystem (chỉ lần đầu)
sudo mkfs -t ext4 /dev/xvdf

# Tạo thư mục mount
sudo mkdir /data

# Mount volume
sudo mount /dev/xvdf /data

# Kiểm tra
df -h
```

✅ **Lưu ý**:
- Nếu muốn tự động mount khi restart, thêm volume vào `/etc/fstab`.

---

## 📌 3. Tóm tắt
- **IAM User**: quản lý quyền người dùng AWS.
- **EBS Volume**: storage gắn ngoài EC2, dữ liệu giữ nguyên khi stop/start.
- Thực hành này giúp bạn sẵn sàng deploy EC2 và lưu trữ dữ liệu an toàn.

