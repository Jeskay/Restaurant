import express from "express";
import {db} from "../database";
const router = express.Router();

router.get('/portions', async (req, res) => {
    const portions = await db.portion.findMany();
    res.json(portions);
});

router.post('/portions', express.json() , async (req, res) => {
    const {dishName, cost, amount, measure} = req.body;
    const dish = await db.dish.findFirst({
        where: {name: dishName},
        include: {portions: true}
    });
    if(!dish) 
        return res.status(404).send('Dish not found');
    else if(dish.portions.find(portion => portion.cost == cost && portion.amount == amount))
        return res.status(400).send('Portion already exists');
    const result = await db.portion.create({
        data: {
            dishName: dishName,
            cost: cost,
            amount: amount,
            measure: measure,
        }}
    ).catch(err => res.status(400).json(err));
    res.status(200).json(result);
});

router.delete('/portions/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    await db.portion.delete({
        where: {
            id: id
        }
    });
    res.status(200);
});
export default router;