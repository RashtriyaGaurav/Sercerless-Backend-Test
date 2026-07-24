const imageUploadService = require("../services/imageUpload.service");

class AdminController {

    async uploadImage(req, res) {
        try {

            const image = await imageUploadService.upload(req);

            return res.redirect(`/image/${image.slug}`);

        } catch (err) {

            console.error(err);

            return res.status(500).send(err.message);

        }
    }

}

module.exports = new AdminController();