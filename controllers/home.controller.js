const Image = require("../models/image");

class HomeController {

    async index(req, res) {

        try {

            const images = await Image.find({
                status: "published"
            })
            .populate("category")
            .sort({ createdAt: -1 });

            res.render("home/index", {
                images
            });

        } catch (err) {

            console.error(err);

            res.status(500).send(err.message);

        }

    }

}

module.exports = new HomeController();