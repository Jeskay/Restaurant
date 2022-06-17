-- CreateTable
CREATE TABLE "Portion" (
    "id" SERIAL NOT NULL,
    "cost" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "dishName" TEXT NOT NULL,

    CONSTRAINT "Portion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Portion" ADD CONSTRAINT "Portion_dishName_fkey" FOREIGN KEY ("dishName") REFERENCES "Dish"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
