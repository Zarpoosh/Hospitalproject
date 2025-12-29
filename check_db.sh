#!/bin/bash
echo "در حال بررسی اتصال به دیتابیس..."
psql -U postgres -d hospital_db -c "SELECT 1;" 2>&1 | head -3
