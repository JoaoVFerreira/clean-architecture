import { Checkout } from './Checkout';
import { ProcutDataDatabase } from './ProductDataDatabase';
import { CouponDataDatabase } from './CouponDataDatabase';

const input: any = {
  items: [],
};

process.stdin.on('data', async chunk => {
  const command = chunk.toString().replace(/\n/g, '');
  if (command.startsWith('set-cpf')) {
    const params = command.replace('set-cpf', '');
    input.cpf = params.trim();
  }
  if (command.startsWith('add-item')) {
    const params = command.replace('add-item ', '');
    const [idProduct, quantity] = params.split(' ');
    input.items.push({ idProduct, quantity: quantity.trim() });
  }
  if (command.startsWith('checkout')) {
    try {
      const productData = new ProcutDataDatabase();
      const couponData = new CouponDataDatabase();
      const checkout = new Checkout(productData, couponData);
      const output = await checkout.execute(input);
      console.log(output);
    } catch (error: any) {
      console.log(error.message);
    }
  }
  console.log(input);
});
