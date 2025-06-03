
---

### **Markdown khác gì so với HTML?**
| Đặc điểm         | Markdown                  | HTML                     |
|------------------|---------------------------|--------------------------|
| **Cú pháp**      | Ngắn gọn (`#`, `**`)      | Dài dòng (`<h1>`, `<b>`) |
| **Mục đích**     | Viết nội dung nhanh       | Xây dựng trang web       |
| **Độ phức tạp**  | Dễ học (5 phút)           | Cần hiểu thẻ/tag         |
| **Chuyển đổi**   | Dễ dàng thành HTML/PDF    | Không cần chuyển đổi     |

> 🔥 **Markdown thực chất được biên dịch thành HTML** khi hiển thị trên web!

---

### **Các công cụ hỗ trợ Markdown**
1. **Trình soạn thảo**:  
   - VS Code (với extension **Markdown Preview Enhanced**).  
   - Typora, Obsidian (app chuyên cho Markdown).  
2. **Xem trực tuyến**:  
   - [StackEdit](https://stackedit.io/), [Dillinger](https://dillinger.io/).  
3. **Hỗ trợ trong lập trình**:  
   - GitHub (`README.md`), Jekyll (blog), Next.js (MDX).  

---

### **Nâng cao: Markdown mở rộng (MDX, GFM)**
1. **MDX**:  
   - Cho phép nhúng **React component** vào Markdown.  
   - Dùng trong Next.js để viết blog động.  
   ```mdx
   # Bài viết có Component

   <MyButton onClick={() => alert("Hello!")}>Click me</MyButton>