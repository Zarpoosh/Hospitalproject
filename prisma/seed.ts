import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

// در Prisma 7، باید از adapter استفاده کنیم
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set in .env file');
}

const pool = new Pool({ connectionString: databaseUrl });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 شروع seed کردن دیتابیس...');

  // ایجاد کاربران و پزشکان
  const doctorsData = [
    {
      user: {
        create: {
          username: 'doctor1',
          password: 'doctor123',
          role: 'doctor',
          name: 'دکتر علی محمدی',
          email: 'ali.mohammadi@hospital.com',
          phone: '09123456789',
        },
      },
      specialization: 'متخصص داخلی',
      availableDays: JSON.stringify(['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه']),
      availableHours: JSON.stringify(['08:00', '09:00', '10:00', '11:00', '14:00', '15:00']),
      consultationFee: 150000,
    },
    {
      user: {
        create: {
          username: 'doctor2',
          password: 'doctor123',
          role: 'doctor',
          name: 'دکتر احمد رضایی',
          email: 'ahmad.rezaei@hospital.com',
          phone: '09123456790',
        },
      },
      specialization: 'متخصص داخلی',
      availableDays: JSON.stringify(['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه']),
      availableHours: JSON.stringify(['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']),
      consultationFee: 160000,
    },
    {
      user: {
        create: {
          username: 'doctor3',
          password: 'doctor123',
          role: 'doctor',
          name: 'دکتر مریم حسینی',
          email: 'maryam.hosseini@hospital.com',
          phone: '09123456791',
        },
      },
      specialization: 'متخصص داخلی',
      availableDays: JSON.stringify(['شنبه', 'یکشنبه', 'چهارشنبه']),
      availableHours: JSON.stringify(['08:00', '09:00', '10:00', '15:00', '16:00']),
      consultationFee: 145000,
    },
    {
      user: {
        create: {
          username: 'doctor4',
          password: 'doctor123',
          role: 'doctor',
          name: 'دکتر فاطمه کریمی',
          email: 'fateme.karimi@hospital.com',
          phone: '09123456792',
        },
      },
      specialization: 'متخصص زنان',
      availableDays: JSON.stringify(['شنبه', 'یکشنبه', 'دوشنبه']),
      availableHours: JSON.stringify(['09:00', '10:00', '11:00', '15:00', '16:00']),
      consultationFee: 180000,
    },
    {
      user: {
        create: {
          username: 'doctor5',
          password: 'doctor123',
          role: 'doctor',
          name: 'دکتر زهرا احمدی',
          email: 'zahra.ahmadi@hospital.com',
          phone: '09123456793',
        },
      },
      specialization: 'متخصص زنان',
      availableDays: JSON.stringify(['دوشنبه', 'سه‌شنبه', 'چهارشنبه']),
      availableHours: JSON.stringify(['08:00', '09:00', '10:00', '14:00', '15:00']),
      consultationFee: 175000,
    },
    {
      user: {
        create: {
          username: 'doctor6',
          password: 'doctor123',
          role: 'doctor',
          name: 'دکتر محمود نوری',
          email: 'mahmood.nouri@hospital.com',
          phone: '09123456794',
        },
      },
      specialization: 'متخصص قلب',
      availableDays: JSON.stringify(['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه']),
      availableHours: JSON.stringify(['08:00', '09:00', '10:00', '11:00', '14:00']),
      consultationFee: 200000,
    },
    {
      user: {
        create: {
          username: 'doctor7',
          password: 'doctor123',
          role: 'doctor',
          name: 'دکتر سعید امینی',
          email: 'saeed.amini@hospital.com',
          phone: '09123456795',
        },
      },
      specialization: 'متخصص قلب',
      availableDays: JSON.stringify(['یکشنبه', 'دوشنبه', 'چهارشنبه']),
      availableHours: JSON.stringify(['09:00', '10:00', '11:00', '15:00', '16:00']),
      consultationFee: 195000,
    },
    {
      user: {
        create: {
          username: 'doctor8',
          password: 'doctor123',
          role: 'doctor',
          name: 'دکتر لیلا موسوی',
          email: 'leila.mousavi@hospital.com',
          phone: '09123456796',
        },
      },
      specialization: 'متخصص اطفال',
      availableDays: JSON.stringify(['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه']),
      availableHours: JSON.stringify(['08:00', '09:00', '10:00', '11:00', '14:00', '15:00']),
      consultationFee: 170000,
    },
    {
      user: {
        create: {
          username: 'doctor9',
          password: 'doctor123',
          role: 'doctor',
          name: 'دکتر رضا صادقی',
          email: 'reza.sadeghi@hospital.com',
          phone: '09123456797',
        },
      },
      specialization: 'متخصص اطفال',
      availableDays: JSON.stringify(['دوشنبه', 'سه‌شنبه', 'چهارشنبه']),
      availableHours: JSON.stringify(['09:00', '10:00', '11:00', '14:00', '15:00']),
      consultationFee: 165000,
    },
    {
      user: {
        create: {
          username: 'doctor10',
          password: 'doctor123',
          role: 'doctor',
          name: 'دکتر حسن کاظمی',
          email: 'hasan.kazemi@hospital.com',
          phone: '09123456798',
        },
      },
      specialization: 'متخصص چشم',
      availableDays: JSON.stringify(['شنبه', 'یکشنبه', 'دوشنبه']),
      availableHours: JSON.stringify(['08:00', '09:00', '10:00', '14:00', '15:00', '16:00']),
      consultationFee: 190000,
    },
    {
      user: {
        create: {
          username: 'doctor11',
          password: 'doctor123',
          role: 'doctor',
          name: 'دکتر نرگس رحمانی',
          email: 'narges.rahmani@hospital.com',
          phone: '09123456799',
        },
      },
      specialization: 'متخصص پوست',
      availableDays: JSON.stringify(['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه']),
      availableHours: JSON.stringify(['09:00', '10:00', '11:00', '14:00', '15:00']),
      consultationFee: 185000,
    },
    {
      user: {
        create: {
          username: 'doctor12',
          password: 'doctor123',
          role: 'doctor',
          name: 'دکتر مهدی قاسمی',
          email: 'mahdi.ghasemi@hospital.com',
          phone: '09123456800',
        },
      },
      specialization: 'متخصص ارتوپدی',
      availableDays: JSON.stringify(['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه']),
      availableHours: JSON.stringify(['08:00', '09:00', '10:00', '11:00', '14:00']),
      consultationFee: 210000,
    },
    {
      user: {
        create: {
          username: 'doctor13',
          password: 'doctor123',
          role: 'doctor',
          name: 'دکتر سارا فرهادی',
          email: 'sara.farahadi@hospital.com',
          phone: '09123456801',
        },
      },
      specialization: 'متخصص مغز و اعصاب',
      availableDays: JSON.stringify(['دوشنبه', 'سه‌شنبه', 'چهارشنبه']),
      availableHours: JSON.stringify(['09:00', '10:00', '11:00', '15:00', '16:00']),
      consultationFee: 220000,
    },
  ];

  // ایجاد پزشکان
  for (const doctorData of doctorsData) {
    try {
      await prisma.doctor.create({
        data: doctorData,
      });
      console.log(`✅ پزشک ${doctorData.user.create.name} اضافه شد`);
    } catch (error) {
      console.error(`❌ خطا در اضافه کردن ${doctorData.user.create.name}:`, error);
    }
  }

  console.log('✅ Seed کردن دیتابیس با موفقیت انجام شد!');
}

main()
  .catch((e) => {
    console.error('❌ خطا در seed کردن:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

