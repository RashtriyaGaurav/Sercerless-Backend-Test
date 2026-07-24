const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.controller");
const upload = require("../middlewares/upload.middleware");
const Category = require("../models/category");

router.get("/upload", async (req, res) => {
    try {
        const categories = await Category.find({ isActive: true }).sort({ name: 1 });

        res.render("admin/upload", {
            categories
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post(
    "/upload",
    upload.single("image"),
    adminController.uploadImage
);

module.exports = router;