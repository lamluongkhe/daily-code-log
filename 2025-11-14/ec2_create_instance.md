# 🚀 Hướng dẫn EC2 cơ bản (Tạo → SSH → Xóa Instance)

## 1️⃣ Tạo EC2 Instance (từng bước)
1. Vào **AWS Console** → tìm **EC2**.
2. Chọn **Launch Instance**.
3. Đặt tên instance (ví dụ: `MyServer`).
4. Chọn hệ điều hành: **Amazon Linux 2** hoặc **Ubuntu 22.04**.
5. Chọn loại máy (Instance type): `t2.micro` (nằm trong Free Tier).
6. **Key Pair:**
   - Nhấn *Create new key pair* → Tải file `.pem` xuống.
7. **Network:** giữ mặc định (VPC + Subnet tự chọn).
8. **Security Group:**
   - Mở port **22** (SSH) để truy cập từ máy của bạn.
   - Mở port **80** (nếu chạy web HTTP).
9. Nhấn **Launch Instance**.

---

## 2️⃣ SSH vào EC2 Instance
### 🔧 Chuẩn bị
- File key: `mykey.pem`
- Lấy **Public IP** của instance từ giao diện EC2.

### 🔐 Lệnh SSH
#### 👉 Amazon Linux
```bash
chmod 400 mykey.pem
ssh -i mykey.pem ec2-user@PUBLIC_IP
```

#### 👉 Ubuntu
```bash
chmod 400 mykey.pem
ssh -i mykey.pem ubuntu@PUBLIC_IP
```

> ⚠️ Lưu ý: `PUBLIC_IP` là IP Public của EC2, khác với `My IP` trên máy bạn.

---

## 3️⃣ Xóa Instance để tránh tốn phí
1. Vào **EC2 → Instances**.
2. Chọn instance cần xóa.
3. Nhấn **Instance state → Terminate instance**.
4. Chọn **Confirm**.

➡️ Sau khi *Terminate*, AWS sẽ dừng tính phí hoàn toàn.

