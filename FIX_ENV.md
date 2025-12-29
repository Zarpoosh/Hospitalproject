# راهنمای رفع خطای Authentication

## مشکل
خطای `Authentication failed` یعنی نام کاربری یا رمز عبور PostgreSQL در فایل `.env` درست نیست.

## راه‌حل‌ها

### راه‌حل 1: استفاده از کاربر postgres (اگر رمز آن را می‌دانید)

فایل `.env` را ویرایش کنید:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/hospital_db?schema=public"
PORT=3001
```

`YOUR_PASSWORD` را با رمز عبور واقعی کاربر `postgres` جایگزین کنید.

### راه‌حل 2: تنظیم رمز عبور برای کاربر postgres

اگر رمز کاربر `postgres` را نمی‌دانید یا تنظیم نشده:

```bash
sudo -u postgres psql
```

سپس در PostgreSQL:
```sql
ALTER USER postgres PASSWORD 'new_password';
\q
```

سپس در فایل `.env`:
```env
DATABASE_URL="postgresql://postgres:new_password@localhost:5432/hospital_db?schema=public"
```

### راه‌حل 3: استفاده از کاربر hospital_user (اگر ایجاد کرده‌اید)

ابتدا بررسی کنید کاربر وجود دارد:

```bash
sudo -u postgres psql -c "\du"
```

اگر کاربر `hospital_user` وجود ندارد، ایجاد کنید:

```bash
sudo -u postgres psql
```

```sql
CREATE USER hospital_user WITH PASSWORD 'hospital123';
CREATE DATABASE hospital_db;
GRANT ALL PRIVILEGES ON DATABASE hospital_db TO hospital_user;
\c hospital_db
GRANT ALL ON SCHEMA public TO hospital_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO hospital_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO hospital_user;
\q
```

سپس در فایل `.env`:
```env
DATABASE_URL="postgresql://hospital_user:hospital123@localhost:5432/hospital_db?schema=public"
PORT=3001
```

### راه‌حل 4: بررسی تنظیمات pg_hba.conf (برای توسعه محلی)

اگر می‌خواهید بدون رمز عبور اتصال برقرار کنید (فقط برای توسعه محلی):

```bash
sudo nano /etc/postgresql/*/main/pg_hba.conf
```

خط زیر را پیدا کنید:
```
local   all             all                                     peer
```

به این تغییر دهید:
```
local   all             all                                     trust
```

سپس:
```bash
sudo systemctl restart postgresql
```

و در `.env`:
```env
DATABASE_URL="postgresql://postgres@localhost:5432/hospital_db?schema=public"
```

⚠️ **هشدار**: استفاده از `trust` فقط برای محیط توسعه محلی است و نباید در production استفاده شود.

## تست اتصال

بعد از تنظیم `.env`، تست کنید:

```bash
# تست اتصال با psql
psql $DATABASE_URL -c "SELECT 1;"

# یا اگر DATABASE_URL را export کردید
psql -U postgres -d hospital_db -c "SELECT 1;"
```

سپس دوباره تلاش کنید:
```bash
npm run db:push
```



