import express, { Request, Response } from 'express';
import prisma from '../db';

const router = express.Router();

// CREATE - اضافه کردن دارو
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, genericName, dosageForm, strength, manufacturer, price, stock, description } = req.body;
    
    // اعتبارسنجی فیلدهای الزامی
    if (!name || !dosageForm || !strength) {
      return res.status(400).json({ 
        error: 'فیلدهای نام دارو، فرم دارویی و میزان الزامی است',
        details: { name: !!name, dosageForm: !!dosageForm, strength: !!strength }
      });
    }
    
    const medication = await prisma.medication.create({
      data: {
        name: name.trim(),
        genericName: genericName?.trim() || null,
        dosageForm: dosageForm.trim(),
        strength: strength.trim(),
        manufacturer: manufacturer?.trim() || null,
        price: price ? parseInt(String(price)) : null,
        stock: stock ? parseInt(String(stock)) : null,
        description: description?.trim() || null,
      },
    });
    
    res.json(medication);
  } catch (error: unknown) {
    console.error('Error creating medication:', error);
    
    // خطاهای Prisma را بهتر handle کنیم
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'داروی با این مشخصات از قبل وجود دارد' });
    }
    
    const errorMessage = error instanceof Error ? error.message : 'خطا در اضافه کردن دارو';
    res.status(500).json({ 
      error: 'خطا در اضافه کردن دارو',
      details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
    });
  }
});

// READ ALL - دریافت همه داروها
router.get('/', async (req: Request, res: Response) => {
  try {
    const medications = await prisma.medication.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(medications);
  } catch (error) {
    console.error('Error fetching medications:', error);
    res.status(500).json({ error: 'خطا در دریافت داروها' });
  }
});

// READ ONE - دریافت یک دارو
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const medication = await prisma.medication.findUnique({
      where: { id },
    });
    
    if (!medication) {
      return res.status(404).json({ error: 'دارو یافت نشد' });
    }
    
    res.json(medication);
  } catch (error) {
    console.error('Error fetching medication:', error);
    res.status(500).json({ error: 'خطا در دریافت دارو' });
  }
});

// UPDATE - به‌روزرسانی دارو
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { name, genericName, dosageForm, strength, manufacturer, price, stock, description } = req.body;
    
    const medication = await prisma.medication.update({
      where: { id },
      data: {
        name,
        genericName,
        dosageForm,
        strength,
        manufacturer,
        price: price ? parseInt(price) : null,
        stock: stock ? parseInt(stock) : null,
        description,
      },
    });
    
    res.json(medication);
  } catch (error) {
    console.error('Error updating medication:', error);
    res.status(500).json({ error: 'خطا در به‌روزرسانی دارو' });
  }
});

// DELETE - حذف دارو
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.medication.delete({
      where: { id },
    });
    
    res.json({ message: 'دارو با موفقیت حذف شد' });
  } catch (error) {
    console.error('Error deleting medication:', error);
    res.status(500).json({ error: 'خطا در حذف دارو' });
  }
});

export default router;

