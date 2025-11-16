# Netplan & NetworkManager: Lý thuyết, Tái hiện lỗi và Cách sửa

## 1. Giới thiệu
Netplan là công cụ quản lý cấu hình mạng trên Ubuntu (>=17.10).  
NetworkManager (NM) quản lý kết nối mạng động, bao gồm Ethernet, WiFi, VPN.  
Khi NM quản lý interface, nó có thể ghi đè Netplan → tắt DHCP trong Netplan không nhất thiết làm interface mất IP ngay.

---

## 2. Nguyên nhân mất mạng thường gặp
- Nhiều file Netplan (`90-NM-xxxx.yaml`) do NM auto generate → xung đột cấu hình.  
- Duplicate route, gateway hoặc DNS → mất mạng ngẫu nhiên.  
- Interface cấu hình DHCP bị override → tắt DHCP trong Netplan nhưng NM vẫn cấp IP.

---

## 3. Kiểm tra trạng thái mạng

### 3.1 Kiểm tra IP
```
ip a
```

### 3.2 Kiểm tra kết nối mạng
```
ping -c 4 8.8.8.8
ping -c 4 google.com
```

### 3.3 Kiểm tra Netplan
```
ls -l /etc/netplan/
sudo netplan try
sudo netplan --debug apply
```

---

## 4. Tái hiện lỗi mất mạng

### 4.1 Tắt DHCP thật sự bằng NetworkManager

#### Bước 1: Xóa các thuộc tính IPv4 cũ
```
sudo nmcli connection modify netplan-enp0s31f6 ipv4.addresses ""
sudo nmcli connection modify netplan-enp0s31f6 ipv4.gateway ""
sudo nmcli connection modify netplan-enp0s31f6 ipv4.dns ""
```

#### Bước 2: Tắt IPv4 hoàn toàn
```
sudo nmcli connection modify netplan-enp0s31f6 ipv4.method disabled
```

#### Bước 3: Restart connection
```
sudo nmcli connection down netplan-enp0s31f6
sudo nmcli connection up netplan-enp0s31f6
```

#### Bước 4: Kiểm tra
```
ip a show enp0s31f6
ping -c 4 8.8.8.8  # sẽ fail
```

> Kết quả: interface **không có IP → mất mạng**, tái hiện lỗi thành công.

---

### 4.2 Tạo lỗi bằng Netplan trực tiếp

#### Bước 1: Sửa file Netplan
```yaml
# /etc/netplan/01-netcfg.yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    enp0s31f6:
      dhcp4: false
```

#### Bước 2: Apply
```
sudo netplan apply
```

#### Bước 3: Kiểm tra
```
ip a show enp0s31f6
ping -c 4 8.8.8.8  # Fail
```

> Lưu ý: Nếu NM đang quản lý interface, nó có thể override → cách 1 chắc chắn hơn.

---

## 5. Khôi phục mạng (bật lại DHCP)

### 5.1 Bật DHCP (IP tự động)
```
sudo nmcli connection modify netplan-enp0s31f6 ipv4.method auto
sudo nmcli connection down netplan-enp0s31f6
sudo nmcli connection up netplan-enp0s31f6
ip a show enp0s31f6
ping -c 4 8.8.8.8
```

### 5.2 Hoặc IP tĩnh
```
sudo nmcli connection modify netplan-enp0s31f6 ipv4.method manual \
ipv4.addresses 192.168.1.50/24 \
ipv4.gateway 192.168.1.1 \
ipv4.dns "8.8.8.8 1.1.1.1"

sudo nmcli connection down netplan-enp0s31f6
sudo nmcli connection up netplan-enp0s31f6
ip a show enp0s31f6
ping -c 4 8.8.8.8
ping -c 4 google.com
```

### 5.3 Dùng Netplan quản lý 100%
- Sửa renderer thành `networkd` trong file Netplan:
```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    enp0s31f6:
      dhcp4: true
```
- Apply:
```
sudo netplan apply
```

---

## 6. Kiểm tra lại trạng thái mạng
```
ip a
ip route
ping -c 4 8.8.8.8
ping -c 4 google.com
```
- Nếu còn nhiều file `90-NM-xxxx.yaml` → nguy cơ xung đột cấu hình và mất mạng ngẫu nhiên.

---

## 7. Lời khuyên
- Chỉ giữ **1 file Netplan chính**, xóa các file auto `90-NM-xxxx.yaml` nếu không cần thiết.  
- Khi đổi DHCP → luôn restart connection.  
- Khi dùng method `manual` → phải khai báo IP, gateway, DNS.  
- Khi dùng method `disabled` → phải xóa hết các cấu hình IPv4 hiện có.

