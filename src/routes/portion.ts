import express from "express";
import {db} from "../database";
import { portionDto } from "../dto/portionDto";
const router = express.Router();

router.get('/portions', async (req, res) => {
    const portions = await db.portion.findMany();
    res.json(portions);
});

router.get('/portions/:dish', async (req, res) =>{
    const portions = await db.portion.findMany({
        where:{dishName: req.params.dish}
    });
    res.json(portions);
})

router.post('/portions/:name', express.json() , async (req, res) => {
    const portions: portionDto[] = (req.body as portionDto[]).map(p => {
        p.dishName = req.params.name;
        return p;
    });
    await db.portion.deleteMany({
        where: {
            dishName: req.params.name
        }
    }).catch(err => {
        return res.status(400).send(err);
    });
    const result = await db.portion.createMany({
        data: portions
    }).catch(err => {
        return res.status(400).send(err);
    });
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