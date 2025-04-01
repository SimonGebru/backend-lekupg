const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const filePath = path.join(__dirname, '../data/pets.json');

router.get ('/', (req, res) => {
    const data = fs.readFileSync(filePath, 'utf8');
    const pets = JSON.parse(data);
    res.json(pets);
    });

router.post ('/', (req, res) => {
    const {type , name } = req.body;

    if (!type || !name) {
       return res.status(400).json({error: 'Typ och namn är obligatoriska'});
       }
       const data = fs.readFileSync(filePath, 'utf8');
       const pets = JSON.parse(data);

       const newPet = {
        id: pets.length + 1,
        type,
        name
        };
        pets.push(newPet);
        fs.writeFileSync(filePath, JSON.stringify(pets, null, 2));
        res.status (201).json(newPet);
        }); 

        module.exports = router;
