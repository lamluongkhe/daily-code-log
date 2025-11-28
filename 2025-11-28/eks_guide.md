# Hướng dẫn tạo Amazon EKS cluster (chi tiết, từng bước) — dùng `eksctl`

> Tài liệu này hướng dẫn từ chuẩn bị môi trường, cài công cụ, tạo cluster với `eksctl`, kiểm tra, deploy ứng dụng mẫu, tới dọn dẹp (xóa) để tránh bị tính phí. Viết bằng tiếng Việt, dành cho người mới bắt đầu.

---

## Mục lục
1. Tóm tắt và cảnh báo chi phí
2. Yêu cầu / chuẩn bị
3. Cài đặt công cụ (AWS CLI, kubectl, eksctl)
4. Cấu hình AWS credentials
5. Tạo cluster nhanh với một lệnh (demo)
6. Tạo cluster bằng file cấu hình (recommended)
7. Kiểm tra cluster và kết nối `kubectl`
8. Deploy ứng dụng mẫu (nginx)
9. Quản lý nodegroup (scale, thêm, xóa)
10. Cài IAM OIDC và ServiceAccount cho addons (ví dụ: cert-manager, aws-load-balancer-controller)
11. Gỡ cluster (xóa sạch) — tránh bị tính tiền
12. Các lỗi thường gặp & cách khắc phục
13. Tài nguyên tham khảo

---

## 1) Tóm tắt & cảnh báo chi phí
- EKS **không miễn phí**: Control plane (EKS) và EC2 worker nodes đều có chi phí. Luôn kiểm tra bill và xóa cluster nếu không dùng nữa.
- Nếu bạn chỉ học K8s, cân nhắc dùng Minikube/Kind hoặc Play With Kubernetes để tiết kiệm.

---

## 2) Yêu cầu / chuẩn bị
- Tài khoản AWS có quyền tạo EKS, EC2, CloudFormation, IAM, VPC.
- Máy cục bộ (Linux / macOS / Windows) có kết nối internet.
- Các tool: `aws` (AWS CLI v2), `kubectl`, `eksctl`, `jq` (tuỳ chọn), `curl`, `ssh` (nếu cần SSH vào node).

---

## 3) Cài đặt công cụ
### a) Cài AWS CLI v2 (Linux example)
```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
aws --version
```

### b) Cài `kubectl`
*Chọn phiên bản `kubectl` tương thích (within one minor version) với cluster.* (Ví dụ cài latest stable client)
```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
kubectl version --client
```

### c) Cài `eksctl`
(Linux example)
```bash
curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
sudo mv /tmp/eksctl /usr/local/bin
eksctl version
```

---

## 4) Cấu hình AWS credentials
```bash
aws configure
# nhập AWS Access Key ID, Secret Access Key, default region (ví dụ ap-southeast-1), default output (json)
```
> Lưu ý: IAM user phải có quyền đủ (EKS, EC2, CloudFormation, IAM, VPC). Nếu bạn dùng profile khác tên non-default, thêm `--profile your-profile` trong các lệnh.

---

## 5) Tạo cluster nhanh (một lệnh)
Lệnh đơn giản (demo):
```bash
eksctl create cluster \
  --name my-cluster \
  --region ap-southeast-1 \
  --version 1.29 \
  --nodegroup-name linux-nodes \
  --node-type t3.small \
  --nodes 2
```
**Giải thích ngắn:**
- `--version` là phiên bản Kubernetes (hãy dùng phiên bản được AWS hỗ trợ)
- `--node-type` chọn loại EC2 (t3.small là cấu hình demo)

> Thời gian tạo: ~10–20 phút tuỳ region và resource.

---

## 6) Tạo cluster bằng file cấu hình (khuyến nghị)
Tạo file `cluster.yaml` để dễ tái sử dụng & version control.

`cluster.yaml` ví dụ:
```yaml
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig
metadata:
  name: my-cluster
  region: ap-southeast-1
  version: "1.29"
nodeGroups:
  - name: ng-1
    instanceType: t3.small
    desiredCapacity: 2
    ssh:
      allow: true
      publicKeyName: your-keypair-name
```
Tạo cluster:
```bash
eksctl create cluster -f cluster.yaml
```

**Ưu điểm file:** dễ thay đổi, tạo nhiều môi trường giống nhau.

---

## 7) Kiểm tra cluster & cấu hình `kubectl`
`eksctl` tự động cập nhật kubeconfig. Kiểm tra:
```bash
kubectl get nodes
kubectl get pods -A
```
Nếu dùng profile AWS khác:
```bash
aws eks --region ap-southeast-1 update-kubeconfig --name my-cluster --profile your-profile
```

---

## 8) Deploy ứng dụng mẫu (nginx)
Tạo deployment + service:
```bash
kubectl create deployment nginx-demo --image=nginx:stable
kubectl expose deployment nginx-demo --port=80 --type=LoadBalancer
kubectl get svc nginx-demo
```
Lệnh `kubectl get svc` sẽ cho External IP/LoadBalancer DNS (AWS ELB) sau vài phút.

---

## 9) Quản lý nodegroup
- Scale nodegroup:
```bash
eksctl scale nodegroup --cluster=my-cluster --name=ng-1 --nodes=3
```
- Thêm nodegroup mới (managed):
```bash
eksctl create nodegroup --cluster my-cluster --name extra-ng --node-type t3.medium --nodes 2
```
- Xóa nodegroup:
```bash
eksctl delete nodegroup --cluster my-cluster --name extra-ng
```

---

## 10) IAM OIDC & ServiceAccount (ví dụ cài aws-load-balancer-controller)
Một số addon cần IAM role liên kết với ServiceAccount.
- Tạo OIDC provider (eksctl thường tự tạo khi create cluster). Nếu không:
```bash
eksctl utils associate-iam-oidc-provider --cluster my-cluster --approve
```
- Tạo IAM policy, serviceaccount theo hướng dẫn addon (tham khảo docs chính thức của addon).

---

## 11) Xóa cluster (dọn sạch)
**Rất quan trọng**: xóa cluster ngay khi không dùng để tránh phí.
```bash
eksctl delete cluster --name my-cluster --region ap-southeast-1
```
Kiểm tra console AWS để chắc chắn các resource (ENIs, ELBs, EBS) đã được xóa.

---

## 12) Một số lỗi thường gặp & fix nhanh
- `eksctl create cluster` stuck / timeout: kiểm tra CloudFormation stack trong AWS CloudFormation console để xem lỗi chi tiết.
- `kubectl get nodes` empty: kiểm tra IAM role của nodegroup, security group, subnet và route table.
- LoadBalancer không hiện IP: chờ vài phút, kiểm tra `kubectl describe svc` để xem events.

---

## 13) Tài nguyên tham khảo
- Trang docs chính thức `eksctl` và EKS (Amazon).  
- Hướng dẫn cài `kubectl` (Kubernetes docs).  
- Hướng dẫn cài AWS CLI (AWS docs).

---

### Ghi chú cuối
- Luôn kiểm tra chi phí trong AWS Billing & Cost Explorer.
- Nếu bạn chỉ học, cân nhắc `--without-nodegroup` để không tạo node tự động (nhưng control plane vẫn tính phí) hoặc dùng Minikube/Kind để 100% miễn phí.



