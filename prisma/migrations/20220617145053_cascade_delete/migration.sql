-- DropForeignKey
ALTER TABLE "Dish" DROP CONSTRAINT "Dish_categoryName_fkey";

-- DropForeignKey
ALTER TABLE "Portion" DROP CONSTRAINT "Portion_dishName_fkey";

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "Category"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portion" ADD CONSTRAINT "Portion_dishName_fkey" FOREIGN KEY ("dishName") REFERENCES "Dish"("name") ON DELETE CASCADE ON UPDATE CASCADE;
