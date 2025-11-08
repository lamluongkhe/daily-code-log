# DevOps — Câu hỏi & Trả lời (Tóm tắt)

> Tài liệu tóm tắt các câu hỏi DevOps theo mức độ và trả lời ngắn gọn, phù hợp để ôn tập hoặc in ra.

---

## I. Cơ bản (Fundamentals)

1. **DevOps là gì? Mục tiêu của DevOps là gì?**  
   DevOps là tập hợp thực hành kết hợp phát triển (Dev) và vận hành (Ops) để chuyển giao phần mềm nhanh hơn, đáng tin cậy hơn. Mục tiêu: tự động hóa, liên tục tích hợp và triển khai, tăng chất lượng và rút ngắn thời gian ra sản phẩm.

2. **Sự khác biệt giữa DevOps và Agile?**  
   Agile là phương pháp phát triển phần mềm tập trung vào vòng lặp ngắn và phản hồi người dùng; DevOps mở rộng tư duy Agile sang vận hành, chú trọng tự động hóa và CI/CD.

3. **Mô hình CI/CD là gì?**  
   CI (Continuous Integration): tự động build & test khi có thay đổi. CD (Continuous Delivery/Deployment): tự động deploy ra môi trường (delivery: chuẩn bị sẵn; deployment: triển khai tự động).

4. **Jenkins dùng để làm gì?**  
   Jenkins là công cụ tự động hóa CI/CD, chạy pipeline (build, test, deploy) và tích hợp nhiều plugin.

5. **Pipeline trong CI/CD gồm những giai đoạn nào?**  
   Thường: Checkout → Build → Test → Package → Publish Artifact → Deploy → Monitor.

6. **Git là gì? Sự khác nhau giữa `git pull`, `git fetch`, và `git merge`?**  
   Git là hệ thống quản lý phiên bản phân tán. `git fetch` lấy thay đổi từ remote sang local nhưng không merge; `git merge` hợp nhất nhánh; `git pull` = `git fetch` + `git merge` (mặc định).

7. **Docker là gì? Tại sao nên dùng Docker?**  
   Docker là nền tảng container hoá, đóng gói ứng dụng và phụ thuộc. Lợi: môi trường nhất quán, nhẹ hơn VM, dễ scale và deploy.

8. **Container khác gì so với VM (Virtual Machine)?**  
   VM ảo hoá cả OS, nặng hơn; container chia sẻ kernel host, nhẹ, khởi động nhanh hơn.

9. **Lệnh thường dùng trong Docker?**  
   Ví dụ: `docker run`, `docker ps`, `docker images`, `docker logs`, `docker exec`, `docker build`, `docker pull`, `docker push`, `docker rm`, `docker rmi`.

10. **Dockerfile là gì và vai trò của nó?**  
    Dockerfile là script mô tả cách build image (base image, copy file, cài đặt, entrypoint). Dùng để reproducible build.

---

## II. Trung cấp (Intermediate)

1. **Kiến trúc Docker: image, container, layer, registry.**  
   Image: template bất biến; Container: instance chạy của image; Layer: các lớp filesystem xếp chồng tạo image; Registry: nơi lưu trữ image (Docker Hub, private registry).

2. **Tối ưu Dockerfile để build nhanh hơn & nhẹ hơn.**  
   Giảm số layer, dùng multi-stage build, cache hợp lý, chọn base image nhẹ, xóa file tạm, kết hợp `RUN` khi phù hợp.

3. **Kubernetes (K8s) là gì?**  
   Hệ thống orchestration container, quản lý deployment, scaling, networking, storage cho container.

4. **Thành phần chính của K8s cluster?**  
   Pod, Node, Deployment/ReplicaSet, Service, Ingress, ConfigMap, Secret, Namespace, PersistentVolume, StatefulSet.

5. **`kubectl apply` khác gì `kubectl create`?**  
   `create` chỉ tạo mới và báo lỗi nếu đã tồn tại; `apply` áp dụng thay đổi (declarative) và có thể cập nhật resource hiện có.

6. **Pod khác Deployment như thế nào?**  
   Pod là đơn vị nhỏ nhất (1+ container); Deployment quản lý ReplicaSet để đảm bảo số lượng Pod và rollout/versioning.

7. **Ingress Controller là gì và khi nào cần dùng?**  
   Ingress controller xử lý HTTP(S) routing từ ngoài vào cluster theo rules; dùng khi cần expose nhiều service qua 1 entrypoint với rule dựa trên host/path.

8. **Helm là gì? Helm Chart hoạt động ra sao?**  
   Helm là package manager cho K8s; Chart là template các resource; Helm render templates với values và deploy theo release.

9. **Triển khai nhiều môi trường bằng Helm?**  
   Dùng `values.yaml` khác nhau cho dev/staging/prod, chart parameterization, secrets via external secret manager.

10. **Monitoring & Logging — công cụ phổ biến?**  
    Monitoring: Prometheus + Grafana; Logging: ELK (Elasticsearch, Logstash, Kibana) hoặc EFK/Loki; Tracing: Jaeger/Zipkin.

---

## III. Nâng cao (Advanced)

1. **Zero downtime deployment: blue-green, rolling, canary?**  
   Blue-Green: 2 môi trường, chuyển traffic nguyên tử; Rolling: thay thế dần từng pod; Canary: deploy một phần traffic tới version mới để test trước.

2. **Quản lý secrets an toàn trong pipeline?**  
   Dùng Vault (HashiCorp), cloud KMS, SealedSecrets, SOPS, tránh lưu secrets plaintext trong repo; RBAC hạn chế quyền.

3. **Terraform là gì và khác gì Ansible?**  
   Terraform: IaC khai báo cho provisioning hạ tầng (cloud infra). Ansible: automation config & procedural tasks (cài đặt, config). Terraform quản lý state/hệ thống, Ansible mạnh config server.

4. **Dùng Terraform để tạo hạ tầng cloud?**  
   Viết file `.tf`, khai báo provider, resources; `terraform init` -> `plan` -> `apply`; quản lý state (remote state recommended).

5. **Infrastructure as Code (IaC) là gì?**  
   Viết hạ tầng dưới dạng mã, version control, reproducible, reviewable và automated.

6. **Monitor hiệu năng container?**  
   Dùng cAdvisor, Prometheus node-exporter, kube-state-metrics, Grafana dashboard, metrics server để autoscaling.

7. **Xử lý pod crash loop?**  
   Kiểm tra logs, `kubectl describe pod`, kiểm tra readiness/liveness, resource limits, image, entrypoint, dependencies; tái tạo hoặc debug bằng image tương tự.

8. **GitOps là gì? Khác gì DevOps truyền thống?**  
   GitOps: điều khiển hạ tầng & deploy bằng Git repo làm source-of-truth và agent tự đồng bộ (ArgoCD, Flux). DevOps truyền thống có thể dùng pipelines imperative.

9. **Chiến lược rollback khi deploy lỗi?**  
   Rollback deployment qua Helm rollback, kubectl rollout undo, blue-green switch back, hoặc deploy previous stable artifact.

10. **Bảo mật container & image registry?**  
    Scan image (Trivy, Clair), dùng minimal base images, cập nhật CVE, dùng private registry với auth, policy scanning, RBAC, image signing.

---

## IV. Một vài câu hỏi thực tế (với trả lời ngắn)

1. **Thiết lập pipeline CI/CD cho Flask/NodeJS/Java?**  
   Dùng Git repo → CI (build/test) với GitHub Actions/Jenkins/GitLab CI → build image → push registry → deploy (Helm/K8s or VM) → monitor.

2. **Khi Jenkins build fail, debug nhanh?**  
   Xem console logs, reproduce locally, kiểm tra môi trường agent, dependency, network, credentials, cache.

3. **Docker container chiếm nhiều disk space, xử lý?**  
   `docker system df`, `docker image prune`, `docker container prune`, xóa dangling images, dọn volumes, cấu hình log rotation.

4. **Scale ứng dụng trong K8s khi traffic tăng đột biến?**  
   Horizontal Pod Autoscaler (HPA) theo CPU/metrics, Cluster Autoscaler để tăng node, chuẩn hóa readiness/liveness.

5. **Chọn chiến lược deploy cho ứng dụng nhạy cảm downtime?**  
   Blue-Green hoặc Canary với traffic shifting & health checks, rollback plan rõ ràng.

---

## Ghi chú
- Đây là bản tóm tắt ngắn. Nếu bạn muốn **bản chi tiết** cho từng câu hỏi (ví dụ: ví dụ lệnh, pipeline mẫu Jenkinsfile, Dockerfile tối ưu, manifest K8s, Helm chart sample), mình sẽ xuất file riêng **hoặc** mở rộng file này ngay.

