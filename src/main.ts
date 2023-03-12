import express from 'express';
import { Checkout } from '@src/Checkout';
import { ProcutDataDatabase } from '@src/ProductDataDatabase';
import { CouponDataDatabase } from '@src/CouponDataDatabase';

const app = express();
app.use(express.json());

app.post('/checkout', async function (req, res) {
  try {
    const productData = new ProcutDataDatabase();
    const couponData = new CouponDataDatabase();
    const checkout = new Checkout(productData, couponData);
    const output = await checkout.execute(req.body);
    return res.json(output);
  } catch (error: any) {
    return res.status(422).json({ message: error.message });
  }
});

app.listen(process.env.PORT, () => console.log(`Server listening on ${process.env.PORT}`));
