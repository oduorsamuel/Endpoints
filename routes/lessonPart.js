const express = require('express')
const router = express.Router();
const bodyparser = require('body-parser')
const lessonPartController = require('../controllers/lessonPartController')
router.use(bodyparser.urlencoded({ extended: false }))
router.use(bodyparser.json());

router.get('/', lessonPartController.get_all_LessonParts)
router.get('/:id', lessonPartController.get_by_id)
router.post('/', lessonPartController.post_LessonPart)
router.patch('/:id', lessonPartController.update)
router.delete('/:id', lessonPartController.delete_by_id);



module.exports = router