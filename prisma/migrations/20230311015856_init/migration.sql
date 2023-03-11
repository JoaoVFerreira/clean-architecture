-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "id_product" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

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


INSERT INTO "Product" ("id_product", "description", "price") VALUES (1, 'A', 1000);
INSERT INTO "Product" ("id_product", "description", "price") VALUES (2, 'B', 5000);
INSERT INTO "Product" ("id_product", "description", "price") VALUES (3, 'C', 30);

INSERT INTO "Coupon" ("code", "percentage", "expire_date") VALUES ('VALE20', 20, '2022-12-01T10:00:00');
INSERT INTO "Coupon" ("code", "percentage", "expire_date") VALUES ('VALE20_EXPIRED', 20, '2022-10-01T10:00:00');