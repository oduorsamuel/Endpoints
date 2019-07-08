const express = require('express')
const router = express.Router();
const bodyparser = require('body-parser')
router.use(bodyparser.urlencoded({ extended: false }))
router.use(bodyparser.json());
const lessonController=require('../controllers/lessonController');

router.post('/',lessonController.post_lesson)
router.get('/', lessonController.get_all_lessons)
router.get('/:id',lessonController.get_by_id)
router.delete('/:id',lessonController.delete_by_id)
router.delete('/',lessonController.delete_all)
router.patch('/:id',lessonController.update);
module.exports = router