#!/bin/bash
# =============================================
# 🔧 Bộ ví dụ Bash Script với cut, awk, sed, tr, uniq, paste, sort, grep
# Mỗi lệnh có 2 ví dụ: 1 đơn giản + 1 dùng vòng lặp
# =============================================

# ==================== CUT ====================
echo "\n===== CUT ====="
# 🟢 Ví dụ 1: Lấy cột 1 từ file /etc/passwd
echo "Danh sách user:"
cut -d':' -f1 /etc/passwd | head -5

# 🔵 Ví dụ 2: Dùng while để đọc từng dòng và cắt cột
while IFS= read -r line; do
    user=$(echo "$line" | cut -d':' -f1)
    echo "User: $user"
done < /etc/passwd | head -3

# ==================== AWK ====================
echo "\n===== AWK ====="
# 🟢 Ví dụ 1: In cột 1 và 3 trong file mẫu
echo -e "A 10 100\nB 20 200\nC 30 300" | awk '{print $1, $3}'

# 🔵 Ví dụ 2: Tính tổng cột 2 trong vòng while
echo -e "A 10\nB 20\nC 30" > data.txt
total=0
while read -r line; do
    val=$(echo "$line" | awk '{print $2}')
    (( total += val ))
done < data.txt
echo "Tổng cột 2: $total"

# ==================== SED ====================
echo "\n===== SED ====="
# 🟢 Ví dụ 1: Thay chữ 'cat' thành 'dog'
echo "I have a cat" | sed 's/cat/dog/'

# 🔵 Ví dụ 2: Dùng vòng for để thay chuỗi trong nhiều file
echo "localhost test" > a.conf
echo "localhost dev" > b.conf
for f in *.conf; do
    sed -i 's/localhost/127.0.0.1/g' "$f"
    echo "Đã thay trong $f"
done

# ==================== TR ====================
echo "\n===== TR ====="
# 🟢 Ví dụ 1: Chuyển chữ thường sang chữ hoa
echo "hello world" | tr 'a-z' 'A-Z'

# 🔵 Ví dụ 2: Dùng vòng for để chuyển từng dòng
echo -e "apple\nbanana\ncherry" > fruits.txt
for f in $(cat fruits.txt); do
    echo "$f" | tr 'a-z' 'A-Z'
done

# ==================== UNIQ ====================
echo "\n===== UNIQ ====="
# 🟢 Ví dụ 1: Lọc dòng trùng lặp đơn giản
echo -e "A\nA\nB\nB\nC" | uniq

# 🔵 Ví dụ 2: Dùng while + sort + uniq để đếm
echo -e "apple\napple\nbanana\nbanana\ncherry" > words.txt
while read -r word; do
    echo "$word"
done < words.txt | sort | uniq -c

# ==================== PASTE ====================
echo "\n===== PASTE ====="
# 🟢 Ví dụ 1: Ghép 2 file đơn giản
echo -e "A\nB\nC" > col1.txt
echo -e "1\n2\n3" > col2.txt
paste col1.txt col2.txt

# 🔵 Ví dụ 2: Dùng while để đọc từng dòng ghép đôi
paste col1.txt col2.txt | while IFS=$'\t' read -r name num; do
    echo "$name có số $num"
done

# ==================== SORT ====================
echo "\n===== SORT ====="
# 🟢 Ví dụ 1: Sắp xếp danh sách số
echo -e "5\n2\n8\n1" | sort -n

# 🔵 Ví dụ 2: Dùng vòng while + sort để lọc top 3
echo -e "3\n10\n7\n8\n2" > numbers.txt
count=0
while read -r n; do
    echo "$n"
done < <(sort -nr numbers.txt) | head -3

# ==================== GREP ====================
echo "\n===== GREP ====="
# 🟢 Ví dụ 1: Tìm dòng chứa 'error'
echo -e "ok\nerror: failed\nok" | grep 'error'

# 🔵 Ví dụ 2: Dùng while để lọc dòng có 'fail'
echo -e "success\nfail task1\nfail task2\ncomplete" > log.txt
while IFS= read -r line; do
    if echo "$line" | grep -q "fail"; then
        echo "Lỗi: $line"
    fi
done < log.txt

# ==================== KẾT THÚC ====================
echo "\n✅ Hoàn tất các ví dụ Bash!"
