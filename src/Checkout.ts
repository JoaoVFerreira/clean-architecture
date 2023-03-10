import { isValidCPF } from './cpf/cpfValidator';
import { CouponData } from './CouponData';
import { ProductData } from './ProcutData';

type Input = {
  cpf: string;
  items: { idProduct: number; quantity: number }[];
  coupon?: string;
};

class Checkout {
  constructor(readonly productData: ProductData, readonly couponData: CouponData) {}

  async execute(input: Input) {
    const isValid = isValidCPF(input.cpf);
    if (!isValid) throw new Error('Invalid cpf');
    let total = 0;
    let freight = 0;
    const products: number[] = [];
    for (const item of input.items) {
      if (products.some(idProduct => idProduct === item.idProduct)) throw new Error('Duplicated product');
      products.push(item.idProduct);
      const product = await this.productData.getProduct(item.idProduct);
      if (product) {
        if (item.quantity <= 0) throw new Error('Quantity must be positive');
        total += product.price * item.quantity;
        const volume = (product.width / 100) * (product.height / 100) * (product.length / 100);
        const density = product.weight / volume;
        const itemFreight = 1000 * volume * (density / 100);
        freight += itemFreight >= 10 ? itemFreight : 10;
      } else {
        throw new Error('Product not found');
      }
    }
    if (input.coupon) {
      const coupon = await this.couponData.getCoupon(input.coupon);
      const today = new Date();
      if (coupon && coupon.expire_date.getTime() > today.getTime()) {
        total -= (total * coupon.percentage) / 100;
      }
    }
    total += freight;
    return { total };
  }
}

export { Checkout };
