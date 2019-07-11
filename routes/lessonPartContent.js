const express = require('express')
const router = express.Router();
const bodyparser = require('body-parser')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/lessonContent')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
});
const upload = multer(
    {
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 10
        },
    })
const lesseonPartContentController = require('../controllers/lessonPartContentController')
router.use(bodyparser.urlencoded({ extended: false }))
router.use(bodyparser.json());

router.post('/', upload.single('File'), lesseonPartContentController.post_content)
router.get('/',lesseonPartContentController.get_lesson_content_parts)
router.get('/:id',lesseonPartContentController.get_by_id)
module.exports=router
