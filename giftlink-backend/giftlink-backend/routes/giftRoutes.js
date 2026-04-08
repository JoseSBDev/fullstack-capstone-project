// giftRoutes.js
const express = require('express');
const router = express.Router();   // <-- esto faltaba

const { connectToDatabase } = require('../models/db'); // tu función de conexión

// GET todos los regalos
router.get("/", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("gifts");
    const gifts = await collection.find({}).toArray();
    res.json(gifts);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET regalo por id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const db = await connectToDatabase();
    const collection = db.collection("gifts");
    const gift = await collection.findOne({ id: id });
    if (!gift) return res.status(404).json({ error: "Gift not found" });
    res.json(gift);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;  // <-- exporta el router


// Add a new gift
router.post('/', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const gift = await collection.insertOne(req.body);

        res.status(201).json(gift.ops[0]);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
