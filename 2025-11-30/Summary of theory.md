# **TỔNG HỢP 50 CÂU HỎI PHỎNG VẤN DEVOPS FRESHER**

**Ứng viên:** Lâm Lương Khê **Mục tiêu:** Vị trí Fresher DevOps / System Admin

---

## **PHẦN 1: TƯ DUY DEVOPS & KỸ NĂNG MỀM (5 CÂU)**

**1\. Theo bạn, DevOps giải quyết vấn đề gì lớn nhất trong quy trình phát triển phần mềm?**

* **Trả lời:** DevOps giải quyết mâu thuẫn giữa đội Dev (muốn thay đổi, tính năng mới) và Ops (muốn ổn định). Nó xóa bỏ bức tường ngăn cách (silos) bằng tự động hóa và giao tiếp liên tục.

**2\. Bạn từng làm Backend Developer, tại sao lại chuyển sang DevOps?**

* **Trả lời:** (Dựa trên ) Em có nền tảng Java/Go. Khi làm backend, em nhận thấy việc code chạy được ở local nhưng lỗi ở production rất phổ biến. Em muốn chuyển sang DevOps để làm chủ quy trình deployment, giúp code của mình và team chạy ổn định trên mọi môi trường.

**3\. Bạn xử lý thế nào khi bị Developer đổ lỗi "Server lởm" trong khi bạn nghĩ do "Code lởm"?**

* **Trả lời:** Thay vì tranh cãi, em sẽ dùng số liệu. Em sẽ check log hệ thống, metrics từ Prometheus/Grafana. Nếu CPU/RAM bình thường mà app chậm \-\> khả năng cao do code/query DB. Nếu Server quá tải \-\> trách nhiệm của Ops phải scale hoặc tối ưu hạ tầng.

**4\. Chu trình phát triển phần mềm (SDLC) có những giai đoạn nào? DevOps tham gia vào đâu?**

* **Trả lời:** Gồm: Plan \-\> Code \-\> Build \-\> Test \-\> Deploy \-\> Operate \-\> Monitor. DevOps tham gia vào **tất cả**, nhưng đậm nét nhất từ khâu Build đến Monitor.

**5\. Bạn định hướng phát triển bản thân như thế nào trong 2 năm tới?**

* **Trả lời:** Năm đầu tiên em muốn thành thạo vận hành hệ thống K8s và CI/CD nâng cao. Năm thứ 2 em hướng tới DevSecOps (tích hợp bảo mật) và Infrastructure as Code chuyên sâu (Terraform/Ansible).

---

## **PHẦN 2: HỆ ĐIỀU HÀNH LINUX & MẠNG (10 CÂU)**

**6\. Quá trình boot của Linux diễn ra như thế nào (ngắn gọn)?**

* **Trả lời:** BIOS/UEFI \-\> MBR/GPT \-\> Bootloader (GRUB) \-\> Kernel \-\> Init System (Systemd) \-\> Userspace.

**7\. Phân biệt `Soft Link` và `Hard Link`?**

* **Trả lời:**  
  * Hard Link: Trỏ trực tiếp vào inode của file gốc. Xóa file gốc, hard link vẫn đọc được data.  
  * Soft Link: Giống Shortcut trên Windows, chỉ trỏ vào tên file. Xóa file gốc, soft link hỏng.

**8\. Ý nghĩa của các quyền `755` và `644` trong lệnh `chmod`?**

* **Trả lời:**  
  * 755: Owner (Đọc/Ghi/Thực thi), Group (Đọc/Thực thi), Others (Đọc/Thực thi). Thường dùng cho thư mục hoặc script.  
  * 644: Owner (Đọc/Ghi), Group (Đọc), Others (Đọc). Thường dùng cho file text/config.

**9\. Lệnh `grep` dùng để làm gì? Ví dụ?**

* **Trả lời:** Dùng để tìm kiếm chuỗi ký tự trong file. VD: `grep "error" /var/log/syslog` để tìm lỗi hệ thống.

**10\. Làm sao để kiểm tra port 80 đang được chiếm dụng bởi tiến trình nào?**

* **Trả lời:** `netstat -tulpn | grep :80` hoặc `ss -tulpn | grep :80` hoặc `lsof -i :80`.

**11\. SSH hoạt động như thế nào? Private Key và Public Key để ở đâu?**

* **Trả lời:** SSH dùng mã hóa bất đối xứng. Public Key để trên server (`~/.ssh/authorized_keys`), Private Key giữ ở máy client. Client dùng Private Key để giải mã challenge từ Server gửi tới.

**12\. DNS là gì? Khi gõ https://www.google.com/search?q=google.com thì điều gì xảy ra?**

* **Trả lời:** DNS là hệ thống phân giải tên miền thành IP. Quy trình: Browser cache \-\> OS Cache (/etc/hosts) \-\> Resolver Server (ISP/8.8.8.8) \-\> Root Server \-\> TLD Server (.com) \-\> Authoritative Server (https://www.google.com/search?q=google.com) \-\> Trả về IP.

**13\. Phân biệt TCP và UDP?**

* **Trả lời:**  
  * TCP: Có kết nối, đảm bảo tin cậy, chậm hơn (Web, Email, FTP).  
  * UDP: Không kết nối, không đảm bảo, nhanh (Stream, Gaming, DNS).

**14\. Load Balancing hoạt động ở tầng nào trong mô hình OSI?**

* **Trả lời:**  
  * Layer 4 (Transport): Load Balance dựa trên IP và Port (VD: HAProxy mode TCP).  
  * Layer 7 (Application): Load Balance dựa trên URL, Cookie, Host (VD: Nginx, Ingress).

**15\. Bạn dùng lệnh nào để check dung lượng ổ đĩa và thư mục?**

* **Trả lời:** `df -h` (toàn bộ ổ đĩa), `du -sh <thư mục>` (dung lượng cụ thể thư mục đó).

---

## **PHẦN 3: CONTAINERIZATION \- DOCKER (8 CÂU)**

**16\. Docker Image được xây dựng như thế nào (Layer)?**

* **Trả lời:** Image được build từ các layer xếp chồng lên nhau (Union File System). Mỗi lệnh trong Dockerfile (`RUN`, `COPY`) tạo ra một layer mới. Các layer này là Read-only.

**17\. Tại sao nên dùng Alpine Linux cho Docker Image?**

* **Trả lời:** Vì nó rất nhẹ (chỉ khoảng 5MB), giúp giảm dung lượng Image, tăng tốc độ build và pull/push, giảm bề mặt tấn công bảo mật.

**18\. Sự khác biệt giữa `COPY` và `ADD` trong Dockerfile?**

* **Trả lời:** `COPY` chỉ copy file từ local vào container. `ADD` làm được như COPY nhưng còn có thể giải nén file `.tar`hoặc tải file từ URL (nhưng ít được khuyên dùng).

**19\. Docker Volume là gì? Tại sao cần nó?**

* **Trả lời:** Volume dùng để lưu trữ dữ liệu bền vững (persist data). Nếu container bị xóa, dữ liệu trong container mất hết, nhưng dữ liệu trong Volume vẫn còn. Rất quan trọng cho Database (MySQL/Redis).

**20\. Docker Network: Phân biệt Bridge và Host mode?**

* **Trả lời:**  
  * Bridge (Default): Container có IP riêng, giao tiếp qua NAT.  
  * Host: Container dùng chung IP và Port với máy chủ (Host). Hiệu năng cao hơn nhưng dễ đụng độ Port.

**21\. Làm sao để dọn dẹp các image/container không dùng đến?**

* **Trả lời:** `docker system prune` (xóa hết container đã stop, network ko dùng, dangling images).

**22\. Docker Compose dùng để làm gì trong dự án của bạn?**

* **Trả lời:** Dùng để định nghĩa stack gồm nhiều container (VD: App \+ MySQL \+ Redis) trong 1 file YAML và chạy tất cả chỉ với lệnh `docker-compose up`.

**23\. File `.dockerignore` dùng để làm gì?**

* **Trả lời:** Giống `.gitignore`, dùng để loại bỏ các file không cần thiết (như `.git`, `node_modules`, file log) khi build image, giúp image nhẹ hơn.

---

## **PHẦN 4: ORCHESTRATION \- KUBERNETES & HELM (8 CÂU)**

**24\. Kiến trúc K8s gồm những thành phần chính nào?**

* **Trả lời:**  
  * Master Node (Control Plane): API Server, Etcd, Scheduler, Controller Manager.  
  * Worker Node: Kubelet, Kube-proxy, Container Runtime (Docker/Containerd).

**25\. Namespace trong K8s là gì?**

* **Trả lời:** Là cách để chia tách logic tài nguyên trong cùng 1 cluster. VD: Namespace `dev`, `prod`, `monitoring`.

**26\. Lệnh `kubectl apply` khác gì `kubectl create`?**

* **Trả lời:** `create` tạo mới resource (lỗi nếu đã tồn tại). `apply` là declarative, nó sẽ tạo mới hoặc cập nhật cấu hình nếu resource đã tồn tại (khuyên dùng).

**27\. Ingress Controller là gì? Khác gì Service LoadBalancer?**

* **Trả lời:** Service LoadBalancer tốn kém (mỗi service 1 IP public). Ingress là "Cổng vào" thông minh, dùng 1 IP public nhưng định tuyến được cho nhiều service dựa trên domain/path (Layer 7 Routing). Em dùng Nginx Ingress.

**28\. StatefulSet khác gì Deployment? Khi nào dùng?**

* **Trả lời:** Deployment dùng cho ứng dụng Stateless (Web App). StatefulSet dùng cho ứng dụng cần định danh cố định và lưu trữ thứ tự (Database: MySQL, Redis Cluster).

**29\. Readiness Probe và Liveness Probe là gì?**

* **Trả lời:**  
  * Liveness: Check xem App còn sống không? Nếu chết \-\> Restart container.  
  * Readiness: Check xem App đã khởi động xong chưa? Nếu chưa \-\> Không routing traffic vào.

**30\. Helm Chart cấu trúc như thế nào?**

* **Trả lời:** Gồm folder `templates/` (chứa file YAML có biến), file `values.yaml` (chứa giá trị mặc định), và `Chart.yaml` (meta info).

**31\. HPA (Horizontal Pod Autoscaler) là gì?**

* **Trả lời:** Tự động tăng giảm số lượng Pod dựa trên CPU/RAM usage.

---

## **PHẦN 5: CI/CD \- GITLAB CI (6 CÂU)**

**32\. Thành phần `artifacts` trong GitLab CI dùng để làm gì?**

* **Trả lời:** Dùng để truyền file (file build, file jar, report) từ Stage này sang Stage khác trong Pipeline (VD: Build xong truyền file .jar sang stage Test).

**33\. Bạn hiểu thế nào về khái niệm "Pipeline as Code"?**

* **Trả lời:** Là việc định nghĩa toàn bộ quy trình CI/CD trong file code (VD: `.gitlab-ci.yml`) và lưu trong Source Control, thay vì cấu hình tay trên giao diện Jenkins/GitLab.

**34\. Sự khác nhau giữa GitLab CI Variables và Environment Variables của OS?**

* **Trả lời:** GitLab CI Variables được tiêm vào môi trường khi Runner chạy job, dùng để bảo mật key/password mà không cần lộ trong code.

**35\. Khi Deploy thất bại, Pipeline nên làm gì?**

* **Trả lời:** Nên có cơ chế thông báo (qua Email/Slack) và tốt nhất là Auto Rollback về phiên bản trước đó.

**36\. Bạn đã bao giờ tối ưu tốc độ build chưa? Bằng cách nào?**

* **Trả lời:** Em sử dụng Docker Cache Layers (sắp xếp lệnh trong Dockerfile hợp lý) và dùng tính năng `cache` của GitLab CI để lưu thư viện (node\_modules, maven repository) giữa các lần build.

**37\. Chiến lược deployment "Rolling Update" là gì?**

* **Trả lời:** K8s mặc định dùng cái này. Cập nhật lần lượt từng Pod (tạo 1 mới \-\> xóa 1 cũ), giúp ứng dụng không bao giờ bị downtime (Zero Downtime Deployment).

---

## **PHẦN 6: GIÁM SÁT & DATABASE (8 CÂU)**

**38\. Metric trong Prometheus có những loại nào?**

* **Trả lời:** 4 loại chính: Counter (chỉ tăng, vd: tổng request), Gauge (tăng giảm, vd: RAM usage), Histogram và Summary (đo lường phân phối, vd: latency).

**39\. Alertmanager dùng để làm gì?**

* **Trả lời:** Nhận cảnh báo từ Prometheus, gom nhóm (grouping), lọc trùng (deduplication) và gửi thông báo đến Email/Slack/Telegram.

**40\. Blackbox Exporter là gì?**

* **Trả lời:** Là exporter của Prometheus dùng để probe (thăm dò) các endpoint từ bên ngoài (như ping, check HTTP 200 OK) để xem service có sống không.

**41\. MySQL Replication là gì? Bạn đã config bao giờ chưa?**

* **Trả lời:** Là cơ chế sao chép dữ liệu từ Master sang Slave. Master để ghi, Slave để đọc, giúp tăng hiệu năng đọc và backup dữ liệu.

**42\. Redis thường được dùng làm gì trong hệ thống?**

* **Trả lời:** Dùng làm Caching (lưu dữ liệu tạm truy xuất nhanh), Session Store (lưu phiên đăng nhập), hoặc Message Broker (Pub/Sub).

**43\. Sự khác nhau giữa SQL (MySQL) và NoSQL (MongoDB) mà bạn từng làm?**

* **Trả lời:** MySQL là quan hệ (RDBMS), schema cứng, tuân thủ ACID chặt chẽ. MongoDB là dạng document (JSON), schema linh hoạt, dễ scale ngang.

**44\. ELK Stack gồm những gì? Bạn dùng nó làm gì?**

* **Trả lời:** Elasticsearch (Lưu trữ & Search), Logstash (Thu thập & Xử lý), Kibana (Hiển thị). Em dùng để tập trung log từ nhiều container về một chỗ để dễ debug.

**45\. Filebeat đóng vai trò gì trong ELK?**

* **Trả lời:** Logstash khá nặng, nên thường dùng Filebeat (nhẹ hơn) cài trên máy đích để đẩy log về Logstash hoặc trực tiếp về Elasticsearch.

---

## **PHẦN 7: CÂU HỎI VỀ DỰ ÁN MAIL SERVER & GAME (5 CÂU)**

**46\. Tại sao email gửi từ server tự dựng hay bị vào Spam?**

* **Trả lời:** Do IP server chưa có độ uy tín (reputation), hoặc thiếu các bản ghi xác thực DNS như SPF, DKIM, DMARC, hoặc IP nằm trong Blacklist.

**47\. Giao thức SMTP dùng port nào? Có mã hóa không?**

* **Trả lời:** Port 25 (không mã hóa/cũ), Port 465 (SMTPS), Port 587 (STARTTLS \- chuẩn hiện nay).

**48\. Trong dự án Game, Backend giao tiếp với Database qua giao thức nào?**

* **Trả lời:** Thường dùng JDBC (Java) hoặc driver native của Go qua TCP/IP connection pool.

**49\. Nginx đóng vai trò gì đối với Mail Server?**

* **Trả lời:** Nó có thể làm Web Server phục vụ cho SquirrelMail (Webmail client) để người dùng truy cập qua trình duyệt.

**50\. Bạn dùng công cụ gì để quản lý source code trong dự án nhóm?**

* **Trả lời:** Em dùng Git, cụ thể là Sourcetree để quản lý branch, merge code và giải quyết conflict khi làm việc với team R\&D và Tester.

## **PHẦN BỔ SUNG: DATABASE MASTER-SLAVE (REPLICATION)**

**51\. Mô hình Master-Slave (hay Primary-Replica) trong Database giải quyết vấn đề gì?**

* **Trả lời:** Nó giải quyết 2 vấn đề chính:  
  1. **Scale Read (Mở rộng khả năng đọc):** Vì lượng request Đọc (Read) thường gấp nhiều lần request Ghi (Write), nên ta đẩy việc đọc sang Slave để giảm tải cho Master.  
  2. **Backup & High Availability:** Nếu Master chết, dữ liệu vẫn còn ở Slave để khôi phục hoặc thăng cấp (promote) Slave lên làm Master mới. Ngoài ra, backup trên Slave an toàn hơn vì không làm lock bảng trên Master.

**52\. Cơ chế sao chép (Replication) của MySQL hoạt động như thế nào (ngắn gọn)?**

* **Trả lời:** Dựa trên **Binary Log (Binlog)**.  
  1. Mọi thao tác ghi (INSERT, UPDATE, DELETE) trên Master được ghi vào file Binlog.  
  2. Slave kết nối tới Master, đọc Binlog đó về và lưu vào **Relay Log** của mình.  
  3. Slave chạy một luồng (SQL Thread) để thực thi lại các câu lệnh trong Relay Log, giúp dữ liệu đồng bộ với Master.

**53\. Làm sao ứng dụng (Backend) biết khi nào ghi vào Master, khi nào đọc từ Slave?**

* **Trả lời:** Có 2 cách:  
  1. **Code Logic:** Trong code Backend cấu hình 2 kết nối DB riêng biệt (1 cho Write, 1 cho Read).  
  2. **Middleware (Proxy):** Dùng một Proxy đứng giữa (như **HAProxy** mà em đã dùng ). Proxy sẽ tự động điều hướng: câu lệnh `SELECT` thì qua Slave, câu lệnh `INSERT/UPDATE` thì qua Master. Cách này trong suốt với Code.

**54\. "Replication Lag" là gì? Làm sao để kiểm tra?**

* **Trả lời:**  
  * **Khái niệm:** Là độ trễ giữa thời điểm dữ liệu được ghi ở Master và thời điểm nó xuất hiện ở Slave.  
  * **Kiểm tra:** Trên MySQL Slave, dùng lệnh `SHOW SLAVE STATUS\G` và nhìn thông số `Seconds_Behind_Master`. Nếu số này \> 0 tức là đang bị trễ (do mạng chậm hoặc Slave quá tải).

**55\. Trong mô hình này, nếu Master bị sập (Crash) thì hệ thống xử lý thế nào?**

* **Trả lời:** Khi Master sập, hệ thống ghi (Write) sẽ bị gián đoạn.  
  * **Thủ công:** Ops phải vào cấu hình lại ứng dụng trỏ sang Slave, hoặc chạy lệnh để biến Slave thành Master (Promote).  
  * **Tự động:** Cần dùng các công cụ quản lý Failover như **MHA** (Master High Availability) hoặc **Orchestrator** để tự động phát hiện Master chết và chuyển quyền cho Slave nhanh nhất có thể.

