const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const filePath = path.join(__dirname, '../data/cars.json');

router.get ('/', (req, res) => {
    const data = fs.readFileSync(filePath, 'utf8');
    const cars = JSON.parse(data);
    res.json(cars);
    });

router.post ('/', (req, res) => {
    const {type,color, brand } = req.body;

    if (!type || !color || !brand) {
        return res.status(400).json({ error: 'Typ, namn och brand är obligatoriska' });
      }
       const data = fs.readFileSync(filePath, 'utf8');
       const cars = JSON.parse(data);

       const newCar = {
        id: cars.length + 1,
        type,
        color,
        brand
        };
        cars.push(newCar);
        fs.writeFileSync(filePath, JSON.stringify(cars, null, 2));

        res.status (201).json(newCar);
        });
        

    module.exports = router;