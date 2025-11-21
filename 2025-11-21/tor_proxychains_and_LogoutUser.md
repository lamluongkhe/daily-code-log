# Hướng Dẫn Cài Đặt Tor + Tor Browser + Cấu Hình ProxyChains (Ubuntu/Linux)

Tài liệu này hướng dẫn chi tiết cách:

1. Cài **Tor service**
2. Cài **Tor Browser**
3. Cài đặt & cấu hình **ProxyChains4**
4. Kiểm tra kết nối Tor

---

## 🚀 1. Cài Tor (Tor service)

Tor sẽ chạy dưới dạng một dịch vụ nền và mở cổng SOCKS5 mặc định.

### **Cài đặt Tor**

```bash
sudo apt update
sudo apt install tor -y
```

### **Kiểm tra Tor đang chạy hay chưa**

```bash
sudo systemctl status tor
```

Khi Tor chạy đúng, bạn sẽ thấy dòng:

```
Active: active (running)
```

### **Khởi động và bật tự động**

```bash
sudo systemctl start tor
sudo systemctl enable tor
```

---

## 🌐 2. Cài Tor Browser (trình duyệt Tor)

Tor Browser an toàn hơn chạy Firefox qua ProxyChains.

### **Cài Tor Browser Launcher**

```bash
sudo apt update
sudo apt install torbrowser-launcher -y
```

### **Chạy Tor Browser lần đầu**

```bash
torbrowser-launcher
```

---

## 🔧 3. Cài ProxyChains4

```bash
sudo apt install proxychains4 -y
```

---

## ⚙️ 4. Cấu hình ProxyChains4

File cấu hình: `/etc/proxychains4.conf`

### **Mở file cấu hình**
```bash
sudo nano /etc/proxychains4.conf
```

### **Bật dynamic_chain**
```
dynamic_chain
```

### **Bật proxy DNS**
```
proxy_dns
```

### **Thêm proxy Tor**
```
[ProxyList]
socks5 127.0.0.1 9050
```

---

## 🧪 5. Kiểm tra ProxyChains + Tor

```bash
proxychains4 curl https://check.torproject.org/
```

```bash
proxychains4 firefox
```

---

# 👥 6. Lệnh Kiểm Tra User Đang Đăng Nhập & Logout Bằng Root

## 🔎 6.1. Kiểm tra user đang đăng nhập
```bash
who
w
whoami
last
```

---

## 🚪 6.2. Logout user bằng quyền root
```bash
sudo pkill -KILL -u username
```

---

## 🖥️ 6.3. Logout user GUI
```bash
loginctl list-sessions
sudo loginctl terminate-session <SESSION_ID>
```

---

## 🔥 6.4. Logout session SSH cụ thể
```bash
sudo pkill -KILL -t pts/0
```

---

## 💣 6.5. Logout tất cả user (trừ root)
```bash
for u in $(who | awk '{print $1}' | sort -u | grep -v root); do sudo pkill -KILL -u $u; done
```

---

## 🛠️ 6.6. Xem process của user
```bash
ps -u username
```

---

## 📌 6.7. Xem user đang dùng ứng dụng gì (real-time)
```bash
sudo nethogs
```

