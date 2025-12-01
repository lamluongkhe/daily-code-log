Dưới đây là tổng hợp các câu hỏi cơ bản và quan trọng cho Fresher Java Backend, bao gồm Java Core, Spring, REST API và Database, với câu trả lời chi tiết, dễ hiểu và đủ trọng tâm:

---

### 1. Java Core
1. **Java là gì?**
   - Java là ngôn ngữ lập trình hướng đối tượng, được thiết kế để chạy trên JVM nên có khả năng chạy trên nhiều nền tảng mà không cần thay đổi code. Nó được sử dụng phổ biến cho backend web, ứng dụng doanh nghiệp, và các hệ thống lớn.

2. **Sự khác nhau giữa JDK, JRE và JVM?**
   - JVM (Java Virtual Machine): chạy bytecode Java trên bất kỳ hệ điều hành nào.
   - JRE (Java Runtime Environment): gồm JVM và các thư viện cần thiết để chạy ứng dụng Java.
   - JDK (Java Development Kit): gồm JRE + các công cụ phát triển như compiler (javac), debugger, và utility để viết và biên dịch Java.

3. **== vs .equals()**
   - `==` so sánh địa chỉ bộ nhớ của hai object, tức là kiểm tra xem chúng có phải là cùng một instance hay không.
   - `.equals()` so sánh giá trị thực tế bên trong object, cần override method này nếu muốn so sánh nội dung cho các class tùy chỉnh.

4. **Static là gì?**
   - Từ khóa `static` dùng cho biến, phương thức hoặc block, cho phép chúng thuộc về class thay vì instance. Tất cả instance của class chia sẻ cùng biến/method static.

5. **final, finally, finalize**
   - `final`: biến hằng số, method không thể override, class không thể extend.
   - `finally`: block luôn được thực thi sau try-catch, dùng để đóng tài nguyên.
   - `finalize()`: method được JVM gọi trước khi garbage collector hủy object, ít dùng hiện nay.

6. **ArrayList vs LinkedList**
   - ArrayList lưu dữ liệu theo mảng động, truy cập nhanh O(1), thêm/xóa ở giữa hoặc đầu chậm O(n).
   - LinkedList lưu dữ liệu theo liên kết node, truy cập chậm O(n), nhưng thêm/xóa đầu/cuối nhanh O(1).

7. **HashMap vs HashTable**
   - HashMap không thread-safe, cho phép key hoặc value là null.
   - Hashtable thread-safe, đồng bộ hóa, không cho phép key hoặc value null.

### 2. Spring Framework
8. **Spring là gì?**
   - Spring là framework Java giúp phát triển ứng dụng backend dễ dàng hơn, hỗ trợ Dependency Injection (DI), Inversion of Control (IOC), quản lý transaction, bảo mật, và phát triển web với Spring MVC hoặc Spring Boot.

9. **IOC và DI**
   - IOC (Inversion of Control): Spring quản lý vòng đời object, tạo instance và inject phụ thuộc.
   - DI (Dependency Injection): cơ chế inject dependency (thành phần cần thiết) vào object, giảm coupling và dễ test.

10. **@Component, @Service, @Repository khác nhau gì?**
   - @Component: annotation chung, đánh dấu class là bean để Spring quản lý.
   - @Service: chuyên dùng cho logic business.
   - @Repository: chuyên dùng cho layer truy cập dữ liệu (DAO), hỗ trợ bắt exception DB.

11. **@Autowired vs @Inject**
   - @Autowired: Spring DI tự động tìm bean và inject.
   - @Inject: chuẩn Java (JSR-330), tương tự nhưng ít tính năng hơn Spring.

12. **@Controller vs @RestController**
   - @Controller: trả về view (HTML, JSP).
   - @RestController: tích hợp @ResponseBody, trả về JSON/XML cho API.

13. **Scope của Bean**
   - Singleton: một instance duy nhất.
   - Prototype: tạo instance mới mỗi lần gọi.
   - Request: một instance cho mỗi HTTP request.
   - Session: một instance cho mỗi session người dùng.

### 3. REST API
14. **REST là gì?**
   - REST (Representational State Transfer) là kiến trúc dùng HTTP để client-server giao tiếp, sử dụng method GET, POST, PUT, DELETE để thao tác tài nguyên, thường trả về JSON hoặc XML.

15. **GET vs POST**
   - GET: lấy dữ liệu từ server, không thay đổi trạng thái server, thông tin hiển thị trong URL.
   - POST: gửi dữ liệu tới server, có thể tạo mới hoặc thay đổi dữ liệu, không hiển thị trong URL.

16. **Status code phổ biến**
   - 200: OK
   - 201: Created
   - 400: Bad Request
   - 401: Unauthorized
   - 404: Not Found
   - 500: Internal Server Error

17. **JSON là gì?**
   - JSON là định dạng dữ liệu nhẹ, lưu trữ theo key-value, dễ đọc và phổ biến để trao đổi dữ liệu giữa client và server.

### 4. Database & SQL
18. **Primary key vs Foreign key**
   - Primary key: duy nhất, định danh bảng.
   - Foreign key: liên kết bảng khác, đảm bảo tính toàn vẹn dữ liệu.

19. **JOIN trong SQL**
   - INNER JOIN: lấy bản ghi khớp giữa hai bảng
   - LEFT JOIN: lấy tất cả bản ghi bên trái + khớp bên phải
   - RIGHT JOIN: lấy tất cả bản ghi bên phải + khớp bên trái
   - FULL JOIN: lấy tất cả bản ghi của cả hai bảng

20. **Normalization là gì?**
   - Quá trình sắp xếp dữ liệu để tránh trùng lặp, cải thiện tính nhất quán và giảm rủi ro lỗi dữ liệu.

21. **Index trong DB**
   - Tạo index giúp tìm kiếm nhanh, nhưng tăng dung lượng lưu trữ và có thể làm chậm insert/update.

22. **Transaction là gì?**
   - Giao dịch trong DB đảm bảo tính ACID: Atomicity (nguyên tử), Consistency (nhất quán), Isolation (cô lập), Durability (bền vững).