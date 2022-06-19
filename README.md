# Restaurant

Настройка перед использованием:
1. ```npm install``` в папке `src/`
2. `yarn install` в папке ```client/```
3. Создать в корне файл `.env` со следующими переменными:
Адрес API Cloudinary для хранения изобрежений в облаке:  
```CLOUDINARY_URL=YOUR_URL```  
Адрес базы данных PostgreSQL:  
```DATABASE_URL="YOUR_URL"``` 
4. `npx prisma db pull` в корне для создания базы данных по схеме
5. в корне `npx ts-node src/index.ts` для запуска API
6. в папке `client/` `yarn serve` для клиентского приложения

После необходимо перейти по адресу указанному в командной строке
