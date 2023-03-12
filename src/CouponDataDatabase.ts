import { CouponData } from '@src/CouponData';
import { PrismaClient } from '@prisma/client';

export class CouponDataDatabase implements CouponData {
  private readonly prisma = new PrismaClient();

  async getCoupon(code: string): Promise<any> {
    const coupon = await this.prisma.coupon.findUnique({ where: { code } });
    await this.prisma.$disconnect();
    return coupon;
  }
}
