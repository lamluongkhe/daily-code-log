# Hướng dẫn chi tiết Amazon S3 (Dành cho người mới)

Tài liệu này hướng dẫn bạn từng bước từ cơ bản đến nâng cao khi dùng Amazon S3: tạo bucket, upload/download, cấu hình public, static website, versioning, lifecycle, bảo mật, CORS, presigned URL, multipart upload và tối ưu chi phí.

---

## Mục lục
1. Giới thiệu nhanh
2. Quy ước tên bucket & region
3. Tạo bucket (Console & AWS CLI)
4. Upload / Download file (Console & CLI)
5. Quyền truy cập: Bucket policy, ACL, IAM
6. Làm public 1 file / toàn bucket
7. Static Website Hosting
8. Versioning & Restore
9. Lifecycle rule (chuyển lớp lưu trữ / xóa tự động)
10. Server-side encryption (SSE-S3, SSE-KMS) & Client-side
11. CORS cho browser upload
12. Presigned URL (tạo link tải/up private)
13. Multipart upload (file >100MB, upload reliable)
14. Logging & Access Analyzer & CloudTrail
15. Tối ưu chi phí (storage classes & transfer)
16. Cleanup: cách xóa đúng
17. Danh sách lệnh CLI hữu dụng

---

## 1. Giới thiệu nhanh
- **S3** (Simple Storage Service) là object storage: lưu file dạng object (key + metadata + data) trong bucket.
- Phù hợp: ảnh, video, backup, static website, tài liệu, artifact.

---

## 2. Quy ước tên bucket & region
- Tên bucket **phải toàn cầu duy nhất** (unique across all accounts/regions).
- Không dùng ký tự in hoa, cách dấu, khoảng trắng.
- Ví dụ hợp lệ: `my-username-static`, `company-backup-2025`.
- Chọn **Region gần nơi users** để giảm latency và transfer cost.

---

## 3. Tạo bucket

### A. Bằng AWS Console
1. AWS Console → Services → S3 → Create bucket
2. Điền **Bucket name** (unique) và **Region**
3. Các tùy chọn quan trọng:
   - Block public access: bật/tắt tùy mục đích. (Nếu public website: tắt 1 số block)
   - Versioning: bật nếu cần phiên bản file
   - Default encryption: bật SSE-S3 hoặc SSE-KMS nếu cần bảo mật
4. Create

### B. Bằng AWS CLI
- Cài AWS CLI & cấu hình (`aws configure`)

Tạo bucket (ví dụ region ap-southeast-1):
```bash
aws s3api create-bucket \
  --bucket my-unique-bucket-name-2025 \
  --region ap-southeast-1 \
  --create-bucket-configuration LocationConstraint=ap-southeast-1
```

*Lưu ý:* với `us-east-1` không cần `--create-bucket-configuration`.

---

## 4. Upload / Download file

### Console
- Vào bucket → Upload → kéo thả file → Upload
- Có thể bật “Set permissions” và “Set properties” trước khi upload

### CLI (s3 cp / s3 sync)
- Upload 1 file:
```bash
aws s3 cp ./local-file.txt s3://my-unique-bucket-name-2025/path/in/bucket.txt
```
- Download:
```bash
aws s3 cp s3://my-unique-bucket-name-2025/path/in/bucket.txt ./
```
- Sync folder:
```bash
aws s3 sync ./local-folder s3://my-bucket/folder
```

---

## 5. Quyền truy cập: Bucket policy, ACL, IAM

- **IAM**: quản lý quyền user/programmatic (thường dùng để cấp quyền cho app hoặc CI/CD). Ví dụ policy cho phép put/get object trên bucket:
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:PutObject","s3:GetObject","s3:DeleteObject"],
    "Resource": ["arn:aws:s3:::my-bucket/*"]
  }]
}
```

- **Bucket Policy**: áp dụng cho tất cả các request đến bucket. Dùng để public toàn bộ bucket, hoặc cho cross-account access.

Ví dụ: public read tất cả object:
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::my-bucket/*"
  }]
}
```

- **ACL**: cũ, tránh dùng nếu có thể. Dùng ACL khi cần grant read/write cho specific AWS account.

---

## 6. Làm public 1 file / toàn bucket
- Để public 1 object: bỏ block public access (nếu bật global block) → set object ACL Public-read hoặc gán bucket policy public.
- **Cẩn trọng:** public sẽ expose file cho mọi người.

### Cách public 1 file (Console):
1. Chọn object → Permissions → Object ACL → Check "Read" for "Everyone"
2. Copy URL hiển thị để truy cập

---

## 7. Static Website Hosting
- S3 có thể host static site (HTML/CSS/JS).
- Chỉ áp dụng cho static content (không có server-side rendering).

### Bước:
1. Enable static website hosting trong bucket properties
2. Đặt `index.html` và `error.html`
3. Nếu public: mở Block Public Access và gán bucket policy public-read

### Ví dụ bucket policy cho website:
```json
{
  "Version":"2012-10-17",
  "Statement":[{
    "Sid":"PublicReadGetObject",
    "Effect":"Allow",
    "Principal": "*",
    "Action":["s3:GetObject"],
    "Resource":["arn:aws:s3:::my-bucket/*"]
  }]
}
```

**Lưu ý:** dùng CloudFront làm CDN phía trước để có HTTPS custom domain và giảm latency.

---

## 8. Versioning & Restore
- Bật versioning để lưu mọi phiên bản object. Khi bật, object bị xóa sẽ tạo "delete marker" chứ không mất hoàn toàn.
- Restore: copy object với version-id cụ thể.

CLI lấy list versions:
```bash
aws s3api list-object-versions --bucket my-bucket
```

Lấy object version specific:
```bash
aws s3api get-object --bucket my-bucket --key path/to/object --version-id <versionId> out.txt
```

---

## 9. Lifecycle rule
- Dùng để chuyển lớp lưu trữ (Standard → IA → Glacier → Deep Archive) hoặc xóa tự động.
- Ví dụ rule: chuyển file sau 30 ngày sang STANDARD_IA, sau 365 ngày sang GLACIER.

Console → Management → Lifecycle rules → Create rule.

---

## 10. Encryption
- **SSE-S3**: AWS quản lý key (S3 managed)
- **SSE-KMS**: dùng KMS key (quản lý granular + audit)
- **Client-side encryption**: mã hóa trước khi upload

Bật default encryption trong bucket properties để đảm bảo mọi object mới đều mã hóa.

---

## 11. CORS (Cross-Origin Resource Sharing)
Khi upload từ browser (JS) bạn cần cấu hình CORS cho bucket.
Ví dụ đơn giản:
```xml
<CORSConfiguration>
 <CORSRule>
   <AllowedOrigin>*</AllowedOrigin>
   <AllowedMethod>GET</AllowedMethod>
   <AllowedMethod>PUT</AllowedMethod>
   <AllowedHeader>*</AllowedHeader>
 </CORSRule>
</CORSConfiguration>
```
Hạn chế AllowedOrigin càng cụ thể càng tốt (vd: https://example.com)

---

## 12. Presigned URL
- Dùng để cấp quyền tạm thời cho người không có IAM credentials.
- Tạo upload (PUT) hoặc download (GET).

Ví dụ Python (boto3):
```python
s3_client.generate_presigned_url('get_object', Params={'Bucket':'my-bucket','Key':'path/file.txt'}, ExpiresIn=3600)
```

CLI tạo presigned URL (aws cli v2):
```bash
aws s3 presign s3://my-bucket/path/file.txt --expires-in 3600
```

---

## 13. Multipart Upload
- Dùng cho file lớn (>100MB hoặc >5GB thực tế) để upload thành từng phần, resume được.
- SDK/CLI hỗ trợ multipart tự động.

CLI ví dụ (aws s3 cp dùng multipart tự động):
```bash
aws s3 cp largefile.mp4 s3://my-bucket/largefile.mp4
```

---

## 14. Logging & Audit
- **Access logging**: bật S3 Server Access Logging để log request đến bucket (ghi vào 1 bucket khác).
- **CloudTrail**: audit API calls (who created/deleted bucket/object).

---

## 15. Tối ưu chi phí
- Chọn storage class phù hợp: STANDARD, STANDARD_IA, ONEZONE_IA, INTELLIGENT_TIERING, GLACIER
- Dùng lifecycle rules để chuyển file cũ
- Tránh nhiều small-objects không cần thiết (overhead)
- Dùng CloudFront để giảm egress cost ở origin

---

## 16. Cleanup (xóa đúng cách)
- Xóa object trước, nếu bucket có versioning thì xóa phiên bản và delete markers.
- Sau đó delete bucket (bucket phải empty mới xóa được).

CLI xóa mọi version & delete bucket (cẩn thận):
```bash
aws s3 rb s3://my-bucket --force
```

---

## 17. Lệnh CLI hữu dụng
```bash
aws s3 ls s3://my-bucket
aws s3 cp file s3://my-bucket
aws s3 sync ./site s3://my-bucket --delete
aws s3 presign s3://my-bucket/path --expires-in 3600
aws s3api list-objects-v2 --bucket my-bucket
aws s3api put-bucket-policy --bucket my-bucket --policy file://policy.json
```

---

## Kết luận & Gợi ý thực hành
1. Tạo 1 bucket test vùng gần bạn (ap-southeast-1)
2. Upload 1 file small, public-read, truy cập bằng URL
3. Enable static website hosting và host 1 trang tĩnh
4. Bật versioning, upload 2 phiên bản cùng file, thử restore
5. Tạo lifecycle rule chuyển object >30 ngày sang IA (hoặc chỉ thử cấu hình)
6. Dùng `aws s3 presign` để tạo link truy cập private

---

Nếu bạn muốn, tôi có thể:
- Tạo file Markdown tải về (có sẵn ở đây)
- Hoặc chạy từng bước cùng bạn trên terminal (bạn gửi tên bucket và region)

