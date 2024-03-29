const express = require('express')
const router = express.Router();
const bodyparser = require('body-parser')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
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
const courseController = require('../controllers/courseController')
router.use(bodyparser.urlencoded({ extended: false }))
router.use(bodyparser.json());

router.get('/', courseController.get_all_course)
router.get('/:id', courseController.get_by_id)
router.post('/', upload.single('coursefile'), courseController.post_course)
router.patch('/:id', upload.single('coursefile'), courseController.update)
router.delete('/:id',upload.single('coursefile'),  courseController.delete_by_id)
module.exports = router