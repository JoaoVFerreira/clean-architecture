import express from 'express';
import { PrismaClient } from '@prisma/client';
import { isValidCPF } from '@src/cpf/cpfValidator';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.post('/checkout', async function (req, res) {
  const isValid = isValidCPF(req.body.cpf);
  if (!isValid) {
    return res.status(422).json({
      message: 'Invalid cpf',
    });
  }
  let total = 0;
  let freight = 0;
  const products: number[] = [];
  for (const item of req.body.items) {
    if (products.some(idProduct => idProduct === item.idProduct)) {
      return res.status(422).json({
        message: 'Duplicated product',
      });
    }
    products.push(item.idProduct);
    const product = await prisma.product.findUnique({
      where: {
        id_product: item.idProduct,
      },
    });
    if (product) {
      if (item.quantity <= 0) {
        return res.status(422).json({
          message: 'Quantity must be positive',
        });
      }
      total += product.price * item.quantity;
      const volume = (product.width / 100) * (product.height / 100) * (product.length / 100);
      const density = product.weight / volume;
      const itemFreight = 1000 * volume * (density / 100);
      freight += itemFreight >= 10 ? itemFreight : 10;
    } else {
      await prisma.$disconnect();
      return res.status(422).json({
        message: 'Product not found',
      });
    }
  }
  if (req.body.coupon) {
    const coupon = await prisma.coupon.findUnique({
      where: {
        code: req.body.coupon,
      },
    });
    const today = new Date();
    if (coupon && coupon.expire_date.getTime() > today.getTime()) {
      total -= (total * coupon.percentage) / 100;
    }
  }
  await prisma.$disconnect();
  total += freight;
  res.json({
    total,
  });
});

app.listen(process.env.PORT, () => console.log(`Server listening on ${process.env.PORT}`));
