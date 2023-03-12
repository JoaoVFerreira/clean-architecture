import { ProductData } from '@src/ProcutData';
import { PrismaClient } from '@prisma/client';

export class ProcutDataDatabase implements ProductData {
  private readonly prisma = new PrismaClient();

  async getProduct(idProduct: number): Promise<any> {
    const product = await this.prisma.product.findUnique({ where: { id_product: +idProduct } });
    await this.prisma.$disconnect();
    return product;
  }
}
