import React from "react";

export default function TopicToturial() {
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Hướng dẫn tác giả</h3>
      <div
        style={{
          overflow: "auto",
          height: 500,
          display: "block",
          maxWidth: "100%",
        }}
      >
        <p style={{ fontStyle: "italic", fontSize: 18 }}>
          *Sau khi đăng nhập thành công bạn sẽ thấy được giao diện trang thông
          tin cá nhân, ngoài ra còn có giao diện trang chủ, trang tác giả có thể
          try cập thông qua thanh điều hướng.
          <p style={{ fontWeight: "bold" }}>1. Trang thông tin cá nhân</p>
          <p>
            Bạn sẽ thấy được những thông tin cá nhân của mình. Để có thể thay
            đổi thông tin bạn cần liên hệ với quản trị viên.
          </p>
          <p style={{ fontWeight: "bold" }}>2. Trang chủ</p>
          <p>Hiển thị tất cả các bài đăng công khai đã được duyệt.</p>
          <p style={{ fontWeight: "bold" }}>3. Trang tác giả</p>
          <p>
            Đây sẽ là nơi bạn thấy hướng dẫn này.Bên cạnh đó là tạo chủ đề và
            bài đăng.
            <p>*Chủ đề bao gồm:</p>
            <p>- Thẻ chủ đề:</p>
            <p>+ Thêm thẻ chủ đề</p>
            <p>+ Sửa, xóa thẻ chủ đề trong danh sách.</p>
            <p>- Chủ đề:</p>
            <p>+ Thêm chủ đề phân cấp.</p>
            <p>+ Sửa, xóa chủ đề phân cấp trong danh sách.</p>
            <p>**Bài đăng:</p>
            <p>- Thêm, sửa, xóa bài đăng</p>
            <p>- Xem trước bài đăng</p>
            <p>- Trạng thái bài đăng (chờ duyệt, đã duyệt, không được duyệt)</p>
          </p>
        </p>
      </div>
    </div>
  );
}
