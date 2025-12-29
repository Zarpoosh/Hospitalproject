# راهنمای راه‌اندازی دیتابیس PostgreSQL

## مراحل راه‌اندازی

### مرحله ۱: نصب PostgreSQL

```bash
# در Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# راه‌اندازی سرویس
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### مرحله ۲: ایجاد دیتابیس و کاربر

```bash
# ورود به PostgreSQL
sudo -u postgres psql

# ایجاد دیتابیس
CREATE DATABASE hospital_db;

# ایجاد کاربر (می‌توانید نام کاربری و رمز عبور را تغییر دهید)
CREATE USER hospital_user WITH PASSWORD 'hospital123';

# دادن دسترسی به دیتابیس
GRANT ALL PRIVILEGES ON DATABASE hospital_db TO hospital_user;

# خروج
\q
```

### مرحله ۳: ایجاد فایل `.env`

در روت پروژه، فایل `.env` ایجاد کنید:

```env
DATABASE_URL="postgresql://hospital_user:hospital123@localhost:5432/hospital_db?schema=public"
PORT=3001
```

**توجه**: `hospital_user` و `hospital123` را با نام کاربری و رمز عبوری که در مرحله ۲ ایجاد کردید جایگزین کنید.

### مرحله ۴: نصب Dependencies

```bash
npm install
```

### مرحله ۵: تولید Prisma Client و اجرای Migration

```bash
# تولید Prisma Client
npm run db:generate

# اجرای Migration برای ایجاد جداول در دیتابیس
npm run db:migrate
```

### مرحله ۶: راه‌اندازی پروژه

**ترمینال ۱ - Backend Server:**
```bash
npm run server
```

**ترمینال ۲ - Frontend:**
```bash
npm run dev
```

### مرحله ۷: باز کردن Prisma Studio

در یک ترمینال جدید:
```bash
npm run db:studio
```

این دستور Prisma Studio را در مرورگر باز می‌کند (معمولاً http://localhost:5555) و می‌توانید:
- تمام جداول (Tables) را ببینید
- داده‌ها را مشاهده و ویرایش کنید
- داده‌های جدید اضافه کنید

## جداول موجود در دیتابیس

پس از اجرای Migration، جداول زیر در دیتابیس ایجاد می‌شوند:

1. **User** - اطلاعات کاربران
2. **Patient** - اطلاعات بیماران
3. **Doctor** - اطلاعات پزشکان
4. **Pharmacist** - اطلاعات داروسازان
5. **Admin** - اطلاعات مدیران
6. **Medication** - اطلاعات داروها ⭐
7. **Appointment** - قرار ملاقات‌ها
8. **Prescription** - نسخه‌ها
9. **PrescriptionItem** - آیتم‌های نسخه

## API Endpoints

### Medications (داروها)

- **GET** `/api/medications` - دریافت همه داروها
- **GET** `/api/medications/:id` - دریافت یک دارو
- **POST** `/api/medications` - اضافه کردن دارو جدید
- **PUT** `/api/medications/:id` - به‌روزرسانی دارو
- **DELETE** `/api/medications/:id` - حذف دارو

## نکات مهم

1. **DATABASE_URL**: حتماً فایل `.env` را ایجاد کرده و `DATABASE_URL` را تنظیم کنید.
2. **Migration**: هر بار که `schema.prisma` را تغییر می‌دهید، باید `npm run db:migrate` را اجرا کنید.
3. **Prisma Studio**: برای مشاهده و مدیریت داده‌ها از `npm run db:studio` استفاده کنید.
4. **Backend**: Backend باید قبل از Frontend اجرا شود.

## عیب‌یابی

اگر با خطا مواجه شدید:

1. مطمئن شوید PostgreSQL در حال اجراست: `sudo systemctl status postgresql`
2. اتصال دیتابیس را بررسی کنید: `psql -U hospital_user -d hospital_db`
3. Migration را دوباره اجرا کنید: `npm run db:migrate`
4. Prisma Client را دوباره تولید کنید: `npm run db:generate`



