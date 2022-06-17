import express from "express";
import {cloud, db} from "../database";
import fileUpload from 'express-fileupload';

const router = express.Router();

router.get('/dishes/:category', async (req, res) => {
    const dishes = await db.dish.findMany({
        where: {
            categoryName: req.params.category
        },
        include: {portions: true},
    });
    res.status(200).json(dishes);
});

router.post('/dishes', async (req, res) => {
    if(!req.files || Object.keys(req.files).length === 0 || req.files.image instanceof Array)
        return res.status(400).send('No images were uploaded');
    const picture: fileUpload.UploadedFile = req.files.image;
    const image_url = await cloud.uploadImage(picture.data);
    const {dish, description, category} = req.body;
    const result = await db.dish.create({
        data: {
            name: dish,
            description: description,
            image: image_url,
            category: {
                connect: {
                    name: category
                }
            }
        }
    }).catch(e => {
        return res.status(400).json(e);
    });
    res.status(200).json(result);
});

router.put('/dishes/:name', async (req, res) => {
    const { category, description } = req.body;
    let image_url = undefined;
    if(!(!req.files || Object.keys(req.files).length === 0 || req.files.image instanceof Array)){
        image_url = await cloud.uploadImage(req.files.image.data);
    }
    console.log(image_url);
    const result = await db.dish.update({
        where: {
            name: req.params.name
        }, 
        data: {
            categoryName: category,
            image: image_url,
            description: description
        }
    }).catch(e => {
        res.status(400).json(e);
    });
    res.status(200).json(result);
});

router.delete('/dishes/:name', async (req, res) => {
    const result = await db.dish.delete({
        where: {
            name: req.params.name
        }
    }).catch(e => res.status(400).json(e));
    res.status(200).json(result);
});

router.get('/dish/:name', async (req, res) => {
    const dish = await db.dish.findFirst({
        where: {
            name: req.params.name
        },
        include: {portions: true}
    });
    res.json(dish);
});

export default router;