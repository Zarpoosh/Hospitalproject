#!/bin/bash

echo "📦 راه‌اندازی دیتابیس PostgreSQL..."
echo ""

# ایجاد دیتابیس و کاربر
sudo -u postgres psql << EOF
-- حذف دیتابیس و کاربر قبلی (اگر وجود دارد)
DROP DATABASE IF EXISTS hospital_db;
DROP USER IF EXISTS hospital_user;

-- ایجاد کاربر جدید
CREATE USER hospital_user WITH PASSWORD 'hospital123';

-- ایجاد دیتابیس
CREATE DATABASE hospital_db OWNER hospital_user;

-- دادن دسترسی‌ها
GRANT ALL PRIVILEGES ON DATABASE hospital_db TO hospital_user;

-- اتصال به دیتابیس و دادن دسترسی به schema
\c hospital_db
GRANT ALL ON SCHEMA public TO hospital_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO hospital_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO hospital_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO hospital_user;

\q
EOF

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ دیتابیس و کاربر با موفقیت ایجاد شد!"
    echo ""
    echo "📝 حالا فایل .env را با این محتوا به‌روزرسانی کنید:"
    echo ""
    echo "DATABASE_URL=\"postgresql://hospital_user:hospital123@localhost:5432/hospital_db?schema=public\""
    echo "PORT=3001"
    echo ""
else
    echo ""
    echo "❌ خطا در ایجاد دیتابیس!"
fi



