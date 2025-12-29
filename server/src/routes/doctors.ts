import express, { Request, Response } from 'express';
import prisma from '../db';

const router = express.Router();

// READ ALL - دریافت همه پزشکان
router.get('/', async (req: Request, res: Response) => {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // تبدیل به فرمت مورد نیاز Frontend
    const formattedDoctors = doctors.map(doctor => ({
      id: doctor.id.toString(),
      userId: doctor.userId.toString(),
      name: doctor.user.name,
      specialization: doctor.specialization,
      availableDays: JSON.parse(doctor.availableDays || '[]'),
      availableHours: JSON.parse(doctor.availableHours || '[]'),
      consultationFee: doctor.consultationFee,
      email: doctor.user.email,
      phone: doctor.user.phone,
    }));

    res.json(formattedDoctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'خطا در دریافت پزشکان' });
  }
});

// READ BY SPECIALIZATION - دریافت پزشکان بر اساس تخصص
router.get('/specialization/:specialization', async (req: Request, res: Response) => {
  try {
    const { specialization } = req.params;
    
    const doctors = await prisma.doctor.findMany({
      where: {
        specialization: specialization,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const formattedDoctors = doctors.map(doctor => ({
      id: doctor.id.toString(),
      userId: doctor.userId.toString(),
      name: doctor.user.name,
      specialization: doctor.specialization,
      availableDays: JSON.parse(doctor.availableDays || '[]'),
      availableHours: JSON.parse(doctor.availableHours || '[]'),
      consultationFee: doctor.consultationFee,
      email: doctor.user.email,
      phone: doctor.user.phone,
    }));

    res.json(formattedDoctors);
  } catch (error) {
    console.error('Error fetching doctors by specialization:', error);
    res.status(500).json({ error: 'خطا در دریافت پزشکان' });
  }
});

// READ ONE - دریافت یک پزشک
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const doctor = await prisma.doctor.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });
    
    if (!doctor) {
      return res.status(404).json({ error: 'پزشک یافت نشد' });
    }

    const formattedDoctor = {
      id: doctor.id.toString(),
      userId: doctor.userId.toString(),
      name: doctor.user.name,
      specialization: doctor.specialization,
      availableDays: JSON.parse(doctor.availableDays || '[]'),
      availableHours: JSON.parse(doctor.availableHours || '[]'),
      consultationFee: doctor.consultationFee,
      email: doctor.user.email,
      phone: doctor.user.phone,
    };
    
    res.json(formattedDoctor);
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({ error: 'خطا در دریافت پزشک' });
  }
});

// GET SPECIALIZATIONS - دریافت لیست تخصص‌ها
router.get('/specializations/list', async (req: Request, res: Response) => {
  try {
    const specializations = await prisma.doctor.findMany({
      select: {
        specialization: true,
      },
      distinct: ['specialization'],
      orderBy: {
        specialization: 'asc',
      },
    });

    const specializationList = specializations.map(s => s.specialization);
    res.json(specializationList);
  } catch (error) {
    console.error('Error fetching specializations:', error);
    res.status(500).json({ error: 'خطا در دریافت تخصص‌ها' });
  }
});

export default router;

