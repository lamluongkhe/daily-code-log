# Ubuntu NVIDIA Resolution Fix Guide

## 1. Kiểm tra GPU và driver
```bash
lspci -k | grep -A 3 -i "VGA"
```
- Ví dụ:
```
01:00.0 VGA compatible controller: NVIDIA Corporation GP107 [GeForce GTX 1050 Ti] (rev a1)
	Subsystem: Gigabyte Technology Co., Ltd GP107 [GeForce GTX 1050 Ti]
	Kernel modules: nvidiafb, nouveau
```
- Nếu hiện `nouveau` -> cần cài driver NVIDIA chính thức.

## 2. Cài driver NVIDIA chính thức
```bash
sudo apt update
sudo apt install ubuntu-drivers-common
ubuntu-drivers devices
sudo apt install nvidia-driver-535   # thay 535 bằng version đề xuất
sudo reboot
```
- Kiểm tra driver:
```bash
nvidia-smi
```

## 3. Thêm resolution 1920x1080 (16:9)
1. Tạo mode:
```bash
cvt 1920 1080 60
```
Ví dụ kết quả:
```
# 1920x1080 59.96 Hz (CVT 2.07M9) hsync: 67.50 kHz; pclk: 173.00 MHz
Modeline "1920x1080_60.00" 173.00 1920 2048 2256 2592 1080 1083 1088 1120 -hsync +vsync
```
2. Thêm mode vào màn hình:
```bash
xrandr --newmode "1920x1080_60.00" 173.00 1920 2048 2256 2592 1080 1083 1088 1120 -hsync +vsync
xrandr --addmode <tên_output> "1920x1080_60.00"
xrandr --output <tên_output> --mode "1920x1080_60.00"
```
- Thay `<tên_output>` bằng tên màn hình thực tế (`xrandr` liệt kê, ví dụ `eDP-1` hoặc `HDMI-1`).

## 4. Khắc phục nếu Ubuntu Settings không hiển thị
- Ubuntu mặc định dùng **Wayland**, xrandr có thể không hiện mode.
- Giải pháp: đăng nhập bằng **Xorg**:
  1. Logout
  2. Gear icon → "Ubuntu on Xorg"
  3. Login lại
- Sau đó Settings → Resolution sẽ hiển thị thêm 1920x1080.

## 5. Giữ resolution sau reboot
Tạo file `~/.xprofile`:
```bash
#!/bin/bash
xrandr --newmode "1920x1080_60.00" 173.00 1920 2048 2256 2592 1080 1083 1088 1120 -hsync +vsync
xrandr --addmode <tên_output> "1920x1080_60.00"
xrandr --output <tên_output> --mode "1920x1080_60.00"
```
- Lưu và cấp quyền chạy:
```bash
chmod +x ~/.xprofile
```
- Sau reboot, resolution 1920x1080 sẽ luôn hiển thị trong Settings.

## 6. Thông số Resolution 1920x1080 (16:9)
| Resolution | Tần số | Aspect Ratio |
|------------|--------|--------------|
| 1920x1080  | 60Hz   | 16:9         |

