# Hướng dẫn Push Docker Image lên AWS ECR

## 1. Tạo repository trên ECR
```bash
aws ecr create-repository --repository-name sample-web --region ap-southeast-1
```

- Kiểm tra repository vừa tạo:
```bash
aws ecr describe-repositories --repository-names sample-web --region ap-southeast-1
```

**Lỗi phổ biến:**
- `AccessDeniedException` → user thiếu quyền IAM. Giải pháp: gán policy `AmazonEC2ContainerRegistryFullAccess` cho user.
- `Could not connect to endpoint URL` → sai region (`ap-southeast-1a` là AZ, phải dùng `ap-southeast-1`).

---

## 2. Login Docker vào ECR
```bash
aws ecr get-login-password --region ap-southeast-1 | \
docker login --username AWS --password-stdin 923154134666.dkr.ecr.ap-southeast-1.amazonaws.com
```

**Lưu ý:**
- Nếu dùng `sudo docker`, token phải login dưới root hoặc thêm ec2-user vào group docker.
- Lỗi `no basic auth credentials` xuất hiện nếu bạn push bằng sudo nhưng login token lưu dưới user khác.

---

## 3. Build Docker image
```bash
cd /path/to/your/app
docker build -t sample-web .
```

Kiểm tra image:
```bash
docker images
```

**Lỗi phổ biến:**
- Không thấy image khi push → chưa build hoặc tag sai.

---

## 4. Tag image theo chuẩn ECR
```bash
docker tag sample-web:latest 923154134666.dkr.ecr.ap-southeast-1.amazonaws.com/sample-web:latest
```

**Lỗi phổ biến:**
- Lỗi `An image does not exist locally with the tag` → chưa tag đúng tên repository.

---

## 5. Push image lên ECR
```bash
docker push 923154134666.dkr.ecr.ap-southeast-1.amazonaws.com/sample-web:latest
```

**Lỗi phổ biến:**
- `name unknown` → repository chưa tồn tại trên ECR. Giải pháp: tạo repository trước khi push.
- `permission denied while trying to connect to the Docker daemon socket` → ec2-user không có quyền truy cập Docker, giải pháp: thêm ec2-user vào group docker hoặc dùng sudo.

---

## 6. Kiểm tra image đã push
**AWS CLI:**
```bash
aws ecr describe-images --repository-name sample-web --region ap-southeast-1
```
```bash
aws ecr list-images --repository-name sample-web --region ap-southeast-1
```

**AWS Console:**
- Truy cập: https://console.aws.amazon.com/ecr/home
- Chọn repository `sample-web` và kiểm tra danh sách image.

---
## Tổng kết
1. Tạo repository trên ECR.
2. Login Docker bằng token.
3. Build và tag image.
4. Push image lên ECR.
5. Kiểm tra image thành công.

**Các lỗi thường gặp:**
- Sai region.
- Thiếu quyền IAM.
- Chưa login Docker hoặc login dưới user khác.
- Repository chưa tồn tại.
- Quyền Docker daemon (permission denied).

