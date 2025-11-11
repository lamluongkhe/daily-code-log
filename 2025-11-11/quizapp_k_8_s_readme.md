# QuizApp Kubernetes Deployment

> Sau khi helm install, thực hiện các bước dưới đây để thêm database QuizDB.bak và truy cập ứng dụng.

## Thêm file database `.bak` vào pod MSSQL

### a. Copy file `.bak` vào pod
```bash
kubectl cp ~/Desktop/QuizApp-k8s/QuizDB.bak quizapp-mssql-689779d464-jsqs4:/var/opt/mssql/backup/QuizApp.bak
```

### b. Kết nối vào pod MSSQL bằng `sqlcmd`
```bash
kubectl exec -it quizapp-mssql-689779d464-jsqs4 -- /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "Admin@123" -C
```

### c. Restore database trong `sqlcmd`
```sql
RESTORE DATABASE QuizDB
FROM DISK = '/var/opt/mssql/backup/QuizDB.bak'
WITH MOVE 'QuizDB' TO '/var/opt/mssql/data/QuizDB.mdf',
     MOVE 'QuizDB_log' TO '/var/opt/mssql/data/QuizDB_log.ldf';
GO
```

---

## Forward port để truy cập frontend & API

### a. Frontend
```bash
kubectl port-forward svc/tracnghiem-frontend 3000:80
```
- Truy cập: [http://localhost:3000](http://localhost:3000)

### b. API / Backend
```bash
kubectl port-forward svc/tracnghiem-api 5000:80
```
- Truy cập: [http://localhost:5000](http://localhost:5000)

> 💡 **Lưu ý:** Khi bạn nhấn Ctrl+C, port-forward sẽ dừng. Nếu muốn chạy lâu dài, dùng `tmux` hoặc `screen`.