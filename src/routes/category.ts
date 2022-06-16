import express from "express";
import {db} from "../database";
const router = express.Router();

router.get('/categories', async (req, res) => {
    const categories = await db.category.findMany();
    res.json(categories);
});

router.post('/categories/:name', async (req, res) => {
    const result = await db.category.create(
        {data: {name: req.params.name}}
    );
    res.status(200).json(result);
});

router.delete('/categories/:name', async (req, res) => {
    await db.category.delete({
        where: {
            name: req.params.name
        }
    });
    res.status(200);
});
export default router;