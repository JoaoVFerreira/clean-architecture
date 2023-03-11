-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "id_product" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "length" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coupon" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "percentage" INTEGER NOT NULL,
    "expire_date" TIMESTAMP NOT NULL,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_product_key" ON "Product"("id_product");


INSERT INTO "Product" ("id_product", "description", "price", "width", "height", "length", "weight", "currency") VALUES (1, 'A', 1000, 100, 30, 10, 3, 'BRL');
INSERT INTO "Product" ("id_product", "description", "price", "width", "height", "length", "weight", "currency") VALUES (2, 'B', 5000, 50, 50, 50, 22, 'BRL');
INSERT INTO "Product" ("id_product", "description", "price", "width", "height", "length", "weight", "currency") VALUES (3, 'C', 30, 10, 10, 10, 0.9, 'BRL');
INSERT INTO "Product" ("id_product", "description", "price", "width", "height", "length", "weight", "currency") VALUES (4, 'D', 100, 100, 30, 10, 3, 'USD');

INSERT INTO "Coupon" ("code", "percentage", "expire_date") VALUES ('VALE20', 20, '2022-12-01T10:00:00');
INSERT INTO "Coupon" ("code", "percentage", "expire_date") VALUES ('VALE20_EXPIRED', 20, '2022-10-01T10:00:00');