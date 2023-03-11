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
  for (const item of req.body.items) {
    const product = await prisma.product.findUnique({
      where: {
        id_product: item.idProduct,
      },
    });
    if (product) {
      total += product.price * item.quantity;
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
    if (coupon) {
      total -= (total * coupon.percentage) / 100;
    }
  }
  await prisma.$disconnect();
  res.json({
    total,
  });
});

app.listen(process.env.PORT, () => console.log(`Server listening on ${process.env.PORT}`));
