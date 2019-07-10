const express = require('express')
const router = express.Router();
const bodyparser = require('body-parser')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './lesson/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toDateString() + file.originalname)
    },
});
const upload = multer(
    {
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 10
        },
    })
const lessonContentController = require('../controllers/lessonContentController')
router.use(bodyparser.urlencoded({ extended: false }))
router.use(bodyparser.json());

router.get('/', lessonContentController.get_all_lessonContent)
router.get('/:id', lessonContentController.get_by_id)
router.post('/', upload.single('PartFile'), lessonContentController.post_lessonContent)
router.patch('/:id', upload.single('PartFile'), lessonContentController.update)
router.delete('/:id',upload.single('PartFile'),  lessonContentController.delete_by_id);


module.exports = router