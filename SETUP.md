# راهنمای سریع راه‌اندازی پروژه

## مرحله ۱: نصب PostgreSQL

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

## مرحله ۲: ایجاد دیتابیس

```bash
sudo -u postgres psql
```

در PostgreSQL:
```sql
CREATE DATABASE hospital_db;
CREATE USER hospital_user WITH PASSWORD 'hospital123';
GRANT ALL PRIVILEGES ON DATABASE hospital_db TO hospital_user;
\q
```

## مرحله ۳: تنظیم فایل .env

فایل `.env` در روت پروژه ایجاد کنید:

```env
DATABASE_URL="postgresql://hospital_user:hospital123@localhost:5432/hospital_db?schema=public"
PORT=3001
```

## مرحله ۴: نصب و راه‌اندازی

```bash
# نصب dependencies
npm install

# تولید Prisma Client
npm run db:generate

# ایجاد جداول در دیتابیس
npm run db:migrate
```

## مرحله ۵: اجرای پروژه

**ترمینال ۱:**
```bash
npm run server
```

**ترمینال ۲:**
```bash
npm run dev
```

## مشاهده دیتابیس با Prisma Studio

```bash
npm run db:studio
```

این دستور Prisma Studio را در مرورگر باز می‌کند (http://localhost:5555)

در Prisma Studio می‌توانید:
- ✅ همه جداول (Tables) را ببینید
- ✅ داده‌های هر جدول را مشاهده کنید
- ✅ داده‌های جدید اضافه/ویرایش/حذف کنید

## جداول موجود

- **User** - کاربران
- **Patient** - بیماران  
- **Doctor** - پزشکان
- **Pharmacist** - داروسازان
- **Admin** - مدیران
- **Medication** - داروها ⭐
- **Appointment** - قرار ملاقات‌ها
- **Prescription** - نسخه‌ها
- **PrescriptionItem** - آیتم‌های نسخه

## API Endpoints برای داروها

- `GET /api/medications` - دریافت همه داروها
- `GET /api/medications/:id` - دریافت یک دارو
- `POST /api/medications` - اضافه کردن دارو
- `PUT /api/medications/:id` - به‌روزرسانی دارو
- `DELETE /api/medications/:id` - حذف دارو



