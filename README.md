# FRONT END SUMMER 2023 - 2024

## Cốt lõi

- Tìm hiểu về next-auth.
- Chuyển đổi ngôn ngữ với next-i18n.
- Sử dụng Unsplash API.
- Tìm hiểu các loại animation (framer-motion).

## Chức năng

- Đăng nhập (credentials và OAuth), đăng ký, quên mật khẩu.
- Chuyển đổi hai ngôn ngữ Vietnamese và English.
- Dark theme.

## Chạy code

- `git clone --url-repository`
- `npm i`: tải các package, thư viện cần thiết.
- Tạo file `.env` hoặc `.env.local` rồi thêm các thông tin đã được nêu sẵn ở file `.env.nextauth`.
- Prisma ORM
  - Tạo ra Prisma Client để sử dụng trong code: `npx prisma generate`
  - Chạy các migration để đồng bộ schema với cơ sở dữ liệu: `npx prisma migrate dev`
  - Hoặc đẩy schema hiện tại lên cơ sở dữ liệu mà không cần migration: `npx prisma db push`
